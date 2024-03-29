import { useAtom } from "jotai";
import { isLoggedInAtom, user } from "../atoms/atoms";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useAxiosPrivate from "./useAxiosPrivate";
import jwtDecode from "jwt-decode";

const useAuthentication = () => {
  const [userData, setUserData] = useAtom(user);
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  // setIsLoggedIn(false);
  const path = useLocation().pathname;
  const [data, setData] = useState(null);
  const apiPrivateInstance = useAxiosPrivate();

  const isLogin = !!localStorage.getItem("jwt");
  const token = localStorage.getItem("jwt");

  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchuser = async () => {
      try {
        const request = await apiPrivateInstance.get("/user/getUser");

        setRole(request.data?.role);
        setData(request.data);
        setUserData(request?.data);
      } catch (err: any) {
        const error = err;
        return Promise.reject(error.response);
      }
    };

    fetchuser();

    setIsLoggedIn(true);
  }, [path, isLogin]);

  return { isLogin, isLoggedIn, data, role, userData };
};

export default useAuthentication;
