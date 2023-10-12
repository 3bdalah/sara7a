import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { TokenContext } from "../../Context/UserContext.jsx";

const Login = () => {
  let navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  let { setToken } = useContext(TokenContext);

  const handleLogin = async (values) => {
    // Set loading to true when the login request starts
    setLoading(true);

    try {
      const response = await axios.post(
        "https://sara7aiti.onrender.com/api/v1/user/signin",
        values
      );

      // Check the structure of the response
      console.log("response data ", response.data);

      if (response.data.message === "welcome") {
        // Store the user token in localStorage
        localStorage.setItem("userToken", response.data.token);

        // Set the token in the context for authentication
        setToken(response.data.token);

        // Redirect to the profile page upon successful login
        navigate("/profile");
      }
    } catch (error) {
      // Log the error to the console
      console.log(error.response.data.error);

      // Set the API error message to display to the user
      setApiError(error.response.data.error);
    } finally {
      // Set loading to false regardless of success or failure
      setLoading(false);
    }
  };

  // Define the form validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z-0-9]{3,8}$/,
        "Password should start with a capital letter"
      )
      .required("Password is required"),
  });

  // Create a formik instance to manage form state and validation
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission with the provided values
      console.log("values", values);
      handleLogin(values);
    },
  });

  return (
    <>
      <div className="w-50 mx-auto my-5">
        <h3 className="text-center">Login</h3>

        {apiError ? (
          // Display an error message if an API error occurs
          <div className="alert alert-success">{apiError}</div>
        ) : null}

        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />

            {formik.errors.email && formik.touched.email ? (
              // Display email validation error
              <div className="alert alert-danger">{formik.errors.email}</div>
            ) : (
              ""
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />

            {formik.errors.password && formik.touched.password ? (
              // Display password validation error
              <div className="alert alert-danger">{formik.errors.password}</div>
            ) : (
              ""
            )}
          </div>

          <button
            className="btn btn-default-outline d-block mx-auto"
            type="submit"
          >
            {isLoading ? (
              // Display a loading spinner when the request is in progress
              <>
                {" "}
                <i className="far fa-spin"></i> Loading
              </>
            ) : (
              // Display the login button when not loading
              <span>
                <i className="far fa-edit"></i> Login
              </span>
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
