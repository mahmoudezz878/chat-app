import React from 'react'
import { useFormik } from "formik";
import * as api from "../../api"

const Signup = () => {

        const formik = useFormik({
          initialValues: {
            name: "",
            email: "",
            password: "",
          },
          onSubmit: async (values) => {
              const userInfo = await api.newUser(values)
              console.log(userInfo);
              formik.resetForm();
          },
        });
  return (
    <div>
        <form onSubmit={formik.handleSubmit}>
        <input
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          placeholder="First Name"
        />
        <input
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          placeholder="Email"
        />
        <input
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder="password"
        />
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default Signup