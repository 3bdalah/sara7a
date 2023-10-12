import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
const Register = () => {
  let navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [fullData, setFullyData] = useState([]);
  const [apiError, setApiError] = useState("");
  const handleRegister = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://sara7aiti.onrender.com/api/v1/user",
        values
      );
      console.log(response.data); // Check the structure of the response

      if (response.data.message === "Added") {
        setLoading(false);
        navigate("/login");
      }

      setFullyData(response.data);
      console.log("fully data", fullData);
    } catch (error) {
      console.log(error.response.data.error);
      setApiError(error.response.data.error);
      setLoading(false);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(15, "Name must be less than 15 characters")
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z-0-9]{3,8}$/,
        "Password should start with a capital letter"
      )
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match") // Ensure rePassword matches password
      .required("Password confirmation is required"),
    age: Yup.number()
      .min(10, "Minimum age is 10")
      .max(60, "Maximum age is 60")
      .required("Age is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      age: 0,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("values", values);
      handleRegister(values);
    },
  });

  return (
    <div className="w-50 mx-auto my-5">
      <h3 className="text-center">Register</h3>

      {apiError ? (
        <div className="alert alert-succes">alread register</div>
      ) : null}
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">User Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert  alert-danger">{formik.errors.name}</div>
          ) : (
            ""
          )}
        </div>
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
            <div className="alert  alert-danger">{formik.errors.email}</div>
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
            <div className="alert  alert-danger">{formik.errors.password}</div>
          ) : (
            ""
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">confireme Password</label>
          <input
            type="password"
            className="form-control"
            name="rePassword"
            id="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
          />

          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert  alert-danger">
              {formik.errors.rePassword}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            className="form-control"
            name="age"
            id="age"
            value={formik.values.age}
            onChange={formik.handleChange}
          />

          {formik.errors.age && formik.touched.age ? (
            <div className="alert  alert-danger">{formik.errors.age}</div>
          ) : (
            ""
          )}
        </div>

        <button
          data-toggle="modal"
          data-target="#share"
          className="btn btn-default-outline share"
          type="submit"
        >
          <i className="far fa-spin"></i>
          {isLoading ? (
            <span> loading</span>
          ) : (
            <button type="submit">
              <i className="far fa-edit"></i>Register
            </button>
          )}
        </button>
      </form>
    </div>
  );
};

export default Register;
