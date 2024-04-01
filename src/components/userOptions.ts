import { URLbackend } from "../assets/URLs";


export default function getUserOptions(authRaw: string): Promise<object> {
  const URL = `${URLbackend}/api/users/get-user-options`;

  return new Promise((resolve, reject) => {
    if (!authRaw) {
      reject("No auth token");
    }

    let token = {
      response: "",
      token: ""
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
