import { logOutFunc } from "../components/logOut";

export default function Profile() {
  return (
    <>
      <button onClick={logOutFunc}>LogOut</button>
    </>
  );
}
