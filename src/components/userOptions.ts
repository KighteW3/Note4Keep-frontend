import { URLbackend } from "../assets/URLs";

interface AuthStructure {
  response: string,
  token: string,
}


export interface UserOptions {
  filter_by: string,
  filter_order: string,
  picture: string,
  theme: string,
  user: string
}

export const userOptionsTemplate: UserOptions = {
  filter_by: "default",
  filter_order: "default",
  picture: "default.jpg",
  theme: "default",
  user: "default",
};

export default function getUserOptions(authRaw: string): Promise<UserOptions> {
  const URL = `${URLbackend}/api/users/get-user-options`;

  return new Promise((resolve, reject) => {
    if (!authRaw) {
      reject("No auth token");
    }

    let token: AuthStructure = {
      response: "response",
      token: "token"
    };

    try {
      token = JSON.parse(authRaw);
    } catch (e) {
      console.error(`Error: ${e}`);
      reject("Invalid token");
    }

    (async () => {
      const data = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `Bearer ${token.token}`,
        }
      };

      try {
        const res = await fetch(URL, data);
        const result = await res.json();
        resolve(result);
      } catch (e) {
        console.error(e);
        reject(`Error: ${e}`);
      }
    })();
  });
}
