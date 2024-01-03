import { hostB, hostF, portB, portF } from "./host";

const runningOn = import.meta.env.VITE_RUNNING;

let frontendDirect = "";
let backendDirect = "";

if (runningOn) {
  if (runningOn === "server") {
    frontendDirect = `https://${hostF}`;
    backendDirect = `https://${hostB}`;
  } else if (runningOn === "local") {
    frontendDirect = `http://${hostF}:${portF}`;
    backendDirect = `http://${hostB}:${portB}`;
  }
}

export const URLFrontend = frontendDirect;

export const URLbackend = backendDirect;
