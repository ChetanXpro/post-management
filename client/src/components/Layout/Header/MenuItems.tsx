import { Avatar, IconButton, Text, useColorMode } from "@chakra-ui/react";
import { useAtom } from "jotai";

import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { user } from "../../../atoms/atoms";
import Discord from "../../../assets/discord.png";
import WhiteDiscord from "../../../assets/whitedis.png";
import logo from "../../assets/nobg.png";
import { CloseIcon, Icon, MoonIcon, SunIcon } from "@chakra-ui/icons";

const MenuItems = ({ showMenu, active }: any) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [userData, setUser] = useAtom(user);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("jwt");
    showMenu();
    navigate("signin");
  };
  return (
    <ul
      className={
        active
          ? "flex-col flex z-50 items-center fixed inset-0 left-1/4 uppercase bg-black/40 backdrop-blur-lg gap-8 justify-center p-8 md:hidden"
          : "hidden"
      }
    >
      <CloseIcon onClick={showMenu} />

      <Link className="hover:underline" onClick={showMenu} to={"/"}>
        <Text>Home</Text>
      </Link>

      <Link className="hover:underline" onClick={showMenu} to={"/profile"}>
        <Text>Profile</Text>
      </Link>
      <Link className="hover:underline" onClick={showMenu} to={"/public"}>
        <Text>Public</Text>
      </Link>

      <Link className="hover:underline" onClick={showMenu} to={"/upload"}>
        <Text>Upload</Text>
      </Link>
      <Link className="hover:underline" onClick={logout} to={"/upload"}>
        <Text>Logout</Text>
      </Link>
      <div className="flex gap-1 items-center">
        <div className="cursor-pointer md:ml-10 sm:ml-6 ml-4">
          <a target={"_blank"} href="https://discord.gg/kDJQqxqv">
            {colorMode === "light" ? (
              <img src={Discord} height="40rem" width={"40rem"} alt="discord" />
            ) : (
              <img
                src={WhiteDiscord}
                height="40rem"
                width={"40rem"}
                alt="discord"
              />
            )}
          </a>
        </div>
        <IconButton
          onClick={toggleColorMode}
          // colorScheme='blue'
          ml={4}
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          aria-label={""}
        />

        <div className="ml-4 mr-2">
          <Avatar name={`${userData?.name}`} size={"sm"} />
        </div>
      </div>
    </ul>
  );
};

export default MenuItems;
