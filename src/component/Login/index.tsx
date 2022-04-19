import React from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/reducer/app";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as api from "../../api";

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    onSubmit: async (values) => {
      const response = await api.logIn(values.email, values.password);
      const token = response.data.token;
      if (token) {
        dispatch(setToken(token));
        localStorage.setItem("token", token);
      }
      formik.resetForm();
      navigate("/");
    },
  });
  return (
    <div className="container">
      <div className="logIn">login</div>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <input
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="password"
          />
          <input
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="email"
          />
          <button type="submit">submit</button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
