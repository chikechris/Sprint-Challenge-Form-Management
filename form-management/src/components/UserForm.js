import React from "react";
import { withFormik, Form, Field } from "formik";
import axios from "axios";
import * as Yup from "yup";

class UserForm extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="form">
        <h3>User Form</h3>
        <Form>
          <label htmlFor="username">Username: </label>
          <Field type="text" name="username" placeholder="Enter Username" />
          {this.props.touched.username && this.props.errors.username && (
            <p>{this.props.errors.username}</p>
          )}
          <label htmlFor="password">Password: </label>
          <Field type="password" name="password" placeholder="Enter Password" />
          {this.props.touched.password && this.props.errors.password && (
            <p>{this.props.errors.password}</p>
          )}
          <button>Submit</button>
        </Form>
      </div>
    );
  }
}

export default withFormik({
  mapPropsToValues: () => {
    return {
      username: "",
      password: ""
    };
  },

  handleSubmit: (values, formikBag) => {
    console.log(formikBag);

    const url = "http://localhost:5000/api/register";
    axios
      .post(url, values)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err.response));
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required("Password is required"),
    password: Yup.string()
      .min(6)
      .required("Password is required")
  })
})(UserForm);
