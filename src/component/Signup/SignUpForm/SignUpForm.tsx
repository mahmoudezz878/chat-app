import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as Yup from "yup";
// import { useDispatch } from "react-redux";
// import { addPosts } from "../actions/posts.actions";

const SignUpForm = () => {
  //   const dispatch = useDispatch();

  //   onClick={formik.handleSubmit}

  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    onSubmit: (values) => {
      console.log({ values });
      //   dispatch(
      //     addUser({
      //       name: values.name,
      //       password: values.password,
      //       email: values.email,
      //     })
      //   );
      formik.resetForm();
    },
    validationSchema: Yup.object({
      password: Yup.string().required("this input is required"),
      email: Yup.string().required("this input is required"),
    }),
  });

  return (
    <div className="sign">
       <p className="signUp-p">Login</p>
      <TextField
      sx={{marginBottom: "2rem"}}
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
      sx={{marginBottom: "2rem"}}
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
      <Button className="btn" type="submit" variant="contained">
        LOGIN
      </Button>
      <div className="already">don't have an account ?  <span className="sign-in"> Sign up</span></div>
    </div>
  );
};

export default SignUpForm;
