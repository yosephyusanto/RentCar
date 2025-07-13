import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar";

const Layout = () => {
  return (
    <>
      <NavigationBar />
      <div className="pt-32">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
