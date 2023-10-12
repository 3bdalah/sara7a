import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div className="container text-center my-5">
        <h4>
          Sarahah allows you to receive constructive feedback from your friends
          and co-workers
        </h4>
        <div className="buttons d-flex justify-content-center align-items-center  flex-column">
          <Link
            to="login"
            className="btn border-black w-44 mt-5 hover:bg-black "
          >
            <i className="fas fa-user" /> Login
          </Link>
          <Link
            to="register"
            className="btn btn-default border-black my-4 w-44"
          >
            <i className="far fa-edit" /> Register
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
