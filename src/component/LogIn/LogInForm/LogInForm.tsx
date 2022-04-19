import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as Yup from "yup";
// import { useDispatch } from "react-redux";
// import { addPosts } from "../actions/posts.actions";

const LogInForm = () => {
  //   const dispatch = useDispatch();

  //   onClick={formik.handleSubmit}

  const formik = useFormik({
    initialValues: {
      name: "",
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
      name: Yup.string().required("this input is required"),
      password: Yup.string().required("this input is required"),
      email: Yup.string().required("this input is required"),
    }),
  });

  return (
    <div className="sign">
       <p className="signUp-p">Sign Up</p>
      <TextField
      sx={{marginBottom: "2rem"}}
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
        SIGN UP
      </Button>
      <div className="already">Already have an account ?  <span className="sign-in"> Sign in</span></div>
    </div>
  );
};

export default LogInForm;
