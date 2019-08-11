import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

import styled from "styled-components";

const FormStyle = styled.div`
  body {
    width: 100%;
    height: 100%;
    margin-top: 10%;
    transform: translateY(-20%);
    position: absolute;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
  }

  form {
    display: flex;
    max-width: 50%;
    width: 100%;
    height: 100%;
    margin: 0 auto;
  
  
  
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: center;
    padding: 30px;
    border-radius: 5px;
  }
  h3 {
    font-size: 2rem;
    font-family: "Serif ", "Georgia ";
    text-shadow: 0 0 1px #1ab31a; 0 0 2px #1ab31a;
  }
  input {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-right: 4%;
    font-family: 'Serif ', 'Georgia ';
    margin: 5px 0;
    background: transparent;
    border: 0px;
    border-bottom: 2px solid #282c34;
    padding: 10px;
    color: "white";
    width: 100%;
  }

  button {
    background: #282c34;
    text-align: center;
    padding: 5px;
    margin-top: 10px;
    border-radius: 30px;
    color: white;
    cursor: pointer;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
`;

function UserForm({ errors, touched, isSubmitting, status }) {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if (status) {
      setUserData([...userData, status]);
    }
  }, [userData]);

  return (
    <div>
      <FormStyle>
        <h3>Sign Up</h3>
        <Form>
          <div>
            {touched.username && errors.username && <p>{errors.username}</p>}
            <Field type="username" name="username" placeholder="Name" />
          </div>
          <div>
            {touched.password && errors.password && <p>{errors.password}</p>}
            <Field type="password" name="password" placeholder="Password" />
          </div>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      </FormStyle>
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
