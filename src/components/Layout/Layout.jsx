import { Outlet } from "react-router-dom";
import Header from "./../Header/Header";
import Footer from "./../Footer/Footer";
const Layout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Header />
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
