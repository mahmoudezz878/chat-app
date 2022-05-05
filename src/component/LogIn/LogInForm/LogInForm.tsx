import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as api from "../../../api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../../redux/reducer/app";
import { useState } from "react";
import { Typography } from "@mui/material";

const LogInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    onSubmit: async (values) => {
      try {
        setError("");
        const response = await api.logIn(values.email, values.password);
        console.log(response);
        const token = response.data.token;
        formik.resetForm();
        if (token) {
          dispatch(setToken(token));
          localStorage.setItem("token", token);
        }
        navigate("/");
      } catch (error: any) {
        setError(error.response.data.message);
        //console.log(error.response.data.message);
      }
    },
    validationSchema: Yup.object({
      password: Yup.string().required("this input is required"),
      email: Yup.string().required("this input is required"),
    }),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="sign">
        <p className="signUp-p">Login</p>
        <TextField
          sx={{ marginBottom: "2rem" }}
          error={!!formik.errors.email}
          helperText={formik.errors.email}
          id="email"
          name="email"
          label="Email"
          placeholder="Email"
          variant="standard"
          fullWidth
          onBlur={formik.handleBlur}
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <TextField
          sx={{ marginBottom: "2rem" }}
          error={!!formik.errors.password}
          helperText={formik.errors.password}
          id="password"
          type="password"
          name="password"
          label="Password"
          placeholder="Password"
          variant="standard"
          fullWidth
          onBlur={formik.handleBlur}
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
        <Button className="btn" type="submit" variant="contained">
          LOGIN
        </Button>
        <div className="already">
          don't have an account ?{" "}
          <a href="/signup" className="sign-in">
            {" "}
            Sign up
          </a>
        </div>
      </div>
    </form>
  );
};

export default LogInForm;
