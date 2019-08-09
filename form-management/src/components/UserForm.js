import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

function UserForm({ errors, touched, isSubmitting, status }) {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if (status) {
      setUserData([...userData, status]);
    }
  }, [userData]);

  return (
    <div>
      <h3>Sign Up</h3>
      <Form>
        <div>
          {touched.username && errors.username && <p>{errors.username}</p>}
          <Field type="username" name="username" placeholder="username" />
        </div>
        <div>
          {touched.password && errors.password && <p>{errors.password}</p>}
          <Field type="password" name="password" placeholder="Password" />
        </div>
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </Form>

      <div>
        {userData.map((user, index) => (
          <div key={index}>
            <h2>User Information</h2>
            <h4>username: {user.username}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

const FormikUserForm = withFormik({
  mapPropsToValues({ username, password }) {
    return {
      username: username || "",
      password: password || ""
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required("Your name is required"),
    password: Yup.string()
      .min(6)
      .required("Password is required")
  }),
  handleSubmit(values, { resetForm, setSubmitting, setStatus }) {
    console.log(values);
    axios
      .post("http://localhost:5000/api/register", values)
      .then(res => {
        console.log(res);
        setStatus(res.data);
        resetForm();
        setSubmitting(false);
      })
      .catch(err => {
        console.log(err);
        setSubmitting(false);
      });
  }
})(UserForm);

export default FormikUserForm;
