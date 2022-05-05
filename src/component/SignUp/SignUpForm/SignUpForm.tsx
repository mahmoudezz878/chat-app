import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import * as api from "../../../api";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      email: "",
    },
    onSubmit: async (values) => {
      try {
        setError("");
        const userInfo = await api.newUser(values);
        console.log(userInfo);
        formik.resetForm();
        navigate("/login");
      } catch (error: any) {
        setError(error.response.data.message);
        console.log(error.response.data.message);
      }
    },
    validationSchema: Yup.object({
      name: Yup.string().required("this input is required"),
      password: Yup.string().required("this input is required"),
      email: Yup.string().required("this input is required"),
    }),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="sign">
        <p className="signUp-p">Sign Up</p>
        <TextField
          sx={{ marginBottom: "2rem" }}
          error={!!formik.errors.name}
          helperText={formik.errors.name}
          id="name"
          name="name"
          label="Name"
          placeholder="Name"
          variant="standard"
          fullWidth
          onBlur={formik.handleBlur}
          value={formik.values.name}
          onChange={formik.handleChange}
        />
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
          SIGNUP
        </Button>
        <div className="already">
          Already have an account ?{" "}
          <a href="/login" className="sign-in">
            Login
          </a>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
