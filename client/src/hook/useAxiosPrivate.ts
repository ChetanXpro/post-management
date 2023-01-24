import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { apiPrivateInstance } from "../Api/api";

const useAxiosPrivate = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("jwt");
    const requestIntercept = apiPrivateInstance.interceptors.request.use(
      (config) => {
       
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = apiPrivateInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error?.response?.status === 403) {
          navigate("/sign_in");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      apiPrivateInstance.interceptors.request.eject(requestIntercept);
      apiPrivateInstance.interceptors.response.eject(responseIntercept);
    };
  }, []);

  return apiPrivateInstance;
};

export default useAxiosPrivate;
