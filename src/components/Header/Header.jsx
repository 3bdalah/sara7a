import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TokenContext } from "../../Context/UserContext.jsx";
import imgs from "../../assets/images/logo300.png";

const Header = () => {
  let { token, setToken } = useContext(TokenContext);
  let navigate = useNavigate();

  // Check for the token in local storage when the component mounts
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      setToken(userToken);
    }
  }, [setToken]);

  function handleLogout() {
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg bg-custom navbar-dark bg-dark">
      <div className=" container ">
        <Link className="navbar-brand" to="/">
          <img src={imgs} width="40" alt="logo-sara7a" />
        </Link>

        <div className=" " id="navbarSupportedContent">
          <ul className="mb-[0rem]  flex text-slate-100  justify-center ">
            {token ? (
              <>
                <li className="nav-item mx-4 ">
                  <Link className="nav-link" to={"/profile"}>
                    Profile
                  </Link>
                </li>
                <li className="nav-item mr-4" onClick={handleLogout}>
                  <Link className="nav-link " to={"/login"}>
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item mx-4 ">
                  <Link className="nav-link" to={"/register"}>
                    Register
                  </Link>
                </li> 
                <li className="nav-item mr-4">
                  <Link className="nav-link " to={"/login"}>
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
