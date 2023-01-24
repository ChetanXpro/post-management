import { Avatar, IconButton, Tag, Text, useColorMode } from "@chakra-ui/react";

import { useAtom } from "jotai";

import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { user } from "../../../atoms/atoms";

import { HamburgerIcon, Icon, MoonIcon, SunIcon } from "@chakra-ui/icons";

import MenuItems from "./MenuItems";
import AvtarDrop from "./AvtarDrop";

const Header = () => {
  const [active, setActive] = useState(false);
  const [avtarDrop, setAvtarDrop] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const [userData, setUser] = useAtom(user);
  const navigate = useNavigate();
  const showMenu = () => {
    setActive(!active);
  };
  const showAvtarDrop = (e: any) => {
    setAvtarDrop(!avtarDrop);
  };

  return (
    <div
      className={` w-full ${
        colorMode === "dark" ? "bg-gray-900" : "bg-gray-200"
      }   font-mono    h-16  flex justify-between p-4 items-center`}
    >
      <div
        onClick={() => navigate("/")}
        className="text-md flex items-center cursor-pointer  justify-center font-bold text-center uppercase"
      >
        <h1>
          falaina <span className="block text-2xl">Docs</span>
        </h1>
      </div>

      <nav>
        <div className="absolute flex items-center cursor-pointer right-6 md:hidden top-6 scale-150">
          {/* <MenuFoldOutlined
            onClick={showMenu}
            className="scale-150 cursor-pointer"
          /> */}
          <HamburgerIcon
            onClick={showMenu}
            className="scale-150 cursor-pointer"
          />
        </div>

        <ul className="hidden md:flex gap-8 items-center p-6 uppercase ">
          <Link to={"/"} className="">
            <Text>Home</Text>
          </Link>

          {userData.role === "Admin" || "Creator" ? (
            <Link to={"/creator"} className=" ml-4">
              <Text>Creator</Text>
            </Link>
          ) : (
            ""
          )}

          {userData.role === "admin" ? (
            <Link to={"/uploadfiles"} className=" ml-4">
              <Text>Admin</Text>
            </Link>
          ) : (
            ""
          )}

          <div className="flex gap-1 items-center">
            <IconButton
              onClick={toggleColorMode}
              // colorScheme='blue'
              ml={4}
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              aria-label={""}
            />

            <div className="ml-4 mr-2">
              <div className=" flex items-center relative    ">
                <button>
                  <Avatar
                    name={`${userData?.name}`}
                    size={"sm"}
                    onClick={showAvtarDrop}
                    className=" cursor-pointer"
                  />
                </button>
                {avtarDrop && <AvtarDrop setAvtarDrop={setAvtarDrop} />}
              </div>
            </div>
          </div>
        </ul>

        <MenuItems showMenu={showMenu} active={active} />
      </nav>
    </div>
  );
};

export default Header;
