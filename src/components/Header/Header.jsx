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
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={imgs} width="54" alt="logo-sara7a" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          Menu <span className="navbar-toggler-icon"></span>
        </button>

        <div className="" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            {token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to={"/profile"}>
                    Profile
                  </Link>
                </li>
                <li className="nav-item" onClick={handleLogout}>
                  <Link className="nav-link " to={"/login"}>
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to={"/register"}>
                    Register
                  </Link>
                </li>
                <li className="nav-item">
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
