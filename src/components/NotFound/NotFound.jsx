import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="text-center flex justify-center flex-col  items-stretch content-center h-screen">
      <h1 className=" text-slate-800 font-mono">404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <button className="  text-stone-50 bg-slate-900 h-10 w-44 rounded-sm capitalize mx-auto shadow-md">
        <Link to="/" className="no-underline text-slate-100">
          back to home
        </Link>
      </button>
    </div>
  );
};

export default NotFound;
