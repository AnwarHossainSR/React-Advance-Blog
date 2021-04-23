import React, { Component } from 'react'
import Nav from '../mainComponent/Home/Nav'
import { Link, Redirect } from 'react-router-dom'
import axios from "axios";


export default class Login extends Component {
  constructor(props)
    {
      super()
        this.state = {
            'message': null,
            'errors': null
        };
    }

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: this.email,
      password: this.password
    };

    axios
      .post("login", data)
      .then((response) => {
        if (response.data.message === "success") {
          localStorage.setItem('token',response.data.token)
          //localStorage.setItem('user',JSON.stringify(response.data.user))
          this.history.push("/superadmin/dashboard");
        } else {
          this.setState({ message: response.data.message });
        }
      }).catch((err) => {
        this.setState({ errors: err.data });
      });
  };
  render() {
    if (localStorage.getItem('token')) {
      return <Redirect to="/superadmin/dashboard" />
    }
    return (
      <>
        <Nav />
        <div className="hold-transition login-page">
          <div className="login-box">
            <div className="login-logo">
              <Link to="/auth/login">
                <b>Admin</b>LOGIN
              </Link>
            </div>
            <div className="card">
              <div className="card-body login-card-body">
                <p className="login-box-msg">Sign in to start your session</p>
                <form onSubmit={this.handleSubmit}>
                {this.state.message != null ? (
                  <h4 className="text-center text-success">{this.state.message}</h4>
                ) : (
                  <p className="login-box-msg">Sign In</p>
                )}
                {this.state.errors != null ? (
                  <h4 className="text-center text-danger">{this.errors.message}</h4>
                ) : ''}
                  <div className="input-group mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      onChange={(e) => (this.email = e.target.value)}
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-envelope" />
                      </div>
                    </div>
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      onChange={(e) => (this.password = e.target.value)}
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-lock" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        Login
                      </button>
                    </div>
                  </div>
                </form>
                <p className="mb-1">
                  {/* <Link href="/auth/forgot">I forgot my password</Link> */}
                </p>
                <p className="mb-0">
                  <Link to="/auth/registration" className="text-center">
                    Register a new membership
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
