import React from "react";
import "./App.css";
import UserForm from "./components/UserForm";
import axios from "axios";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      users: []
    };
  }

  componentDidMount() {
    this.getUsers();
  }
  getUsers = () => {
    axios.get(`http://localhost:5000/api/restricted/users`).then(res => {
      console.log(res);
      const users = res.data;
      this.setState({ users });
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Form Management App</h2>
        </header>
        <UserForm />
        <h2>User Information</h2>

        {this.state.users.map(user => (
          <span>Username: {user.username}</span>
        ))}
      </div>
    );
  }
}

export default App;
