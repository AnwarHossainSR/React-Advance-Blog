import React, { Component } from 'react'
import Nav from '../mainComponent/Home/Nav'
import { Link, Redirect } from 'react-router-dom'
import Protected from './Protrcted'
import axios from "axios";


 export default class Register extends Component {
  constructor(props)
  {
    super()
      this.state = {
          'message': null,
          'errors':null
      };
  }
  handleSubmits = (e) => {
    e.preventDefault();
    const data = {
      name: this.name,
      email: this.email,
      password: this.password,
      password_confirmation: this.cPassword,
    };
    axios
      .post("register", data)
      .then((response) => {
        this.setState({ message: response.data.message });
      }).catch((err) => {
        this.setState({ errors: err.data });
      });
  };
  
  render() {
    if (localStorage.getItem('token')) {
      return <Redirect to="/" />
  }
    return (
      <>
        {/* <Protected /> */}
        <Nav />
        <div className="hold-transition register-page">
          <div className="register-box">
            <div className="register-logo">
              <Link to="/auth/registration">
                <b>Registration</b>
              </Link>
            </div>
            <div className="card">
              <div className="card-body register-card-body">
                {this.state.message != null ? (
                  <h4 className="text-center text-success">{this.state.message}</h4>
                ) : (
                  <p className="login-box-msg">Register a new membership</p>
                )}
                {this.state.errors != null ? (
                  <h4 className="text-center text-danger">{this.errors.message}</h4>
                ) : ''}
                <form onSubmit={this.handleSubmits}>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Full name"
                      onChange={(e) => (this.name = e.target.value)}
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-user" />
                      </div>
                    </div>
                  </div>
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
                  <div className="input-group mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Retype password"
                      onChange={(e) => (this.cPassword = e.target.value)}
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
                        Register
                      </button>
                    </div>
                  </div>
                </form>
                <div className="mt-3">
                  <Link to="/auth/login" className="text-center">
                    I already have a membership
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

