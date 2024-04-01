import { useState, useEffect } from "react";
import { URLbackend } from "../assets/URLs";

interface resultInfo {
  ok: boolean;
  userInfo: {
    username: string;
    email: string;
  };
}

const useAuth = () => {
  const [authData, setAuthData] = useState<resultInfo>({
    ok: false,
    userInfo: {
      username: "No logged",
      email: "No email"
    },
  });

  useEffect(() => {
    const tokenString = window.localStorage.getItem("SESSION_ID");

    if (tokenString) {
      const token = JSON.parse(tokenString);

      (async () => {
        const URL = `${URLbackend}/api/users/check`;

        const result = await fetch(URL, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${token.token}`
          },
        });

        const data = await result.json();

        if (result.ok) {
          const dataToReturn = {
            ok: true,
            userInfo: {
              username: data.username,
              email: data.email,
            },
          };
          setAuthData(dataToReturn);
        } else {
          const dataToReturn = {
            ok: false,
            userInfo: {
              username: "No logged",
              email: "No email"
            },
          };
          setAuthData(dataToReturn);
        }
      })();
    } else {
      const dataToReturn = {
        ok: false,
        userInfo: {
          username: "No logged",
          email: "No email"
        },
      };

      setAuthData(dataToReturn);
    }
  }, []);

  return authData;
};

export { useAuth };
