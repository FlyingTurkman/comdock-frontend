
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { fetcher } from "./helpScripts";
import Router from "next/router";

export const setToken = (data) => {
    if (typeof window === 'undefined') {
      return;
    }
    Cookies.set('id', data.user.id);
    Cookies.set('username', data.user.username);
    Cookies.set('jwt', data.jwt);
  
    if (Cookies.get('username')) {
      Router.reload();
    }
  };
  
export const unsetToken = () => {
    if (typeof window === 'undefined') {
        return;
    }
    Cookies.remove('id');
    Cookies.remove('jwt');
    Cookies.remove('username');

    Router.reload();
};

export const getUserFromLocalCookie = () => {
    const jwt = getTokenFromLocalCookie();
    if (jwt) {
      return fetcher(
        `users/me`,
        ``,
        {headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
        })
        .then((data) => {
          return {
            user: data.username,
            name: data.name
          };
        })
        .catch((error) => console.error(error));
    } else {
      return;
    }
};

export const getTokenFromLocalCookie = () => {
    return Cookies.get('jwt');
};

let userState;

export const useFetchUser = () => {
    const [data, setUser] = useState({
      user: userState || null,
      loading: userState === undefined,
      name: userState ? userState.name : null
    });
  
    useEffect(() => {
      if (userState !== undefined) {
        return;
      }
  
      let isMounted = true;
      const resolveUser = async () => {
        const userData = await getUserFromLocalCookie();
        if (isMounted) {
          setUser({ 
            user: userData?.user, 
            name: userData?.name, 
            loading: false
          });
        }
      };
      resolveUser();
  
      return () => {
        isMounted = false;
      };
    }, []);
  
    return data;
  };