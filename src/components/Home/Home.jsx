import { Link } from "react-router-dom";
import { TokenContext } from "../../Context/UserContext.jsx";
import { useContext } from "react";

const Home = () => {
  const { token } = useContext(TokenContext);

  return (
    <div className="container text-center my-5">
      {!token ? (
        <>
          <h4>
            Sarahah allows you to receive constructive feedback from your friends and co-workers
          </h4>
          <div className="buttons d-flex justify-content-center align-items-center flex-column">
            <Link to="login" className="btn border-black w-44 mt-5 hover:bg-black">
              <i className="fas fa-user" /> Login
            </Link>
            <Link to="register" className="btn btn-default border-black my-4 w-44">
              <i className="far fa-edit" /> Register
            </Link>
          </div>
        </>
      ) : (
        <h3 className="m-auto text-stone-500 font-mono">Welcome Back</h3>
      )}
    </div>
  );
};

export default Home ;
