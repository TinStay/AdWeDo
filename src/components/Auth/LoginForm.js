import React, { useContext, useCallback, useState } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { AuthContext } from "./Auth";

// Firebase
import app, { db } from "../../base";
import axios from "../../axios";
import { doSignInWithFacebook } from "../../base";

// Social media icons
import facebookIcon from "../../assets/facebookIcon.png";
import googleIcon from "../../assets/googleIcon.png";
import twitterIcon from "../../assets/twitterIcon.png";

const LoginForm = ({ history, ...props }) => {
  const { currentUser } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const handleSignIn = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;

      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);

        props.handleClose();

        // Redirect to path that user tried to reach
        history.push(history.location.pathname);
      } catch (error) {
        setError(error.message);
      }
    },
    [history]
  );

  const signInWithFacebook = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        await doSignInWithFacebook()
          .then(async (registeredUser) => {
            // const name =  registeredUser.user.displayName.split(/(?=[A-Z])/);
            axios
              .get(`/users/${registeredUser.user.uid}.json`)
              .then((response) => {
                if (response.data === null) {
                  const userData = {
                    firstName: registeredUser.user.displayName.split(" ")[0],
                    lastName: registeredUser.user.displayName.split(" ")[1],
                    email: registeredUser.user.email,
                    country: "",
                    city: "",
                    photoUrl: `${registeredUser.user.photoURL}?width=400&height=400`,
                  };

                  db.ref("users/" + registeredUser.user.uid).set(userData);
                }
              });
          })
          .then(
            // Redirect to path that user tried to reach
            history.push(history.location.pathname)
          );
      } catch (error) {
        setError(error.message);
      }
    },
    [history]
  );

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <Modal className="" show={props.show} onHide={props.handleClose}>
        <div className="modal-body ">
          <Modal.Header className="modal-header text-center">
            <h1 className="modal-header-label font-color">Login</h1>
          </Modal.Header>
          <Modal.Body>
            <div className="auth-form-social-buttons">
              {/* <p className="auth-form-social-label border-bottom text-center font-color">Login via social media</p> */}
              <div className="d-flex justify-content-center">
                {/* <button onClick={signInWithFacebook} className="btn btn-lg btn-facebook">Facebook</button> */}
                <a onClick={signInWithFacebook} href="">
                  <img
                    className="auth-form-social-icon"
                    src={facebookIcon}
                    alt="facebook icon"
                  />
                </a>
                <a onClick={() => {}} href="">
                  <img
                    className="auth-form-social-icon"
                    src={googleIcon}
                    alt="google icon"
                  />
                </a>
                <a onClick={() => {}} href="">
                  <img
                    className="auth-form-social-icon"
                    src={twitterIcon}
                    alt="twitter icon"
                  />
                </a>
                {/* <button className="btn btn-lg btn-google">Google</button> */}
              </div>
            </div>
            <p className="auth-form-social-label border-bottom text-center font-color">
              or
            </p>
            <form className="auth-form" onSubmit={handleSignIn}>
              {error ? <p className="errorMsg">{error}</p> : null}
              <div className="form-group auth-form-field">
                <label for="exampleInputEmail1">Email address</label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </div>

              <div className="form-group auth-form-field">
                <label for="exampleInputPassword1">Password</label>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter your password"
                />
                <small id="emailHelp" className="form-text text-muted small">
                  We'll never share your email or password with anyone.
                </small>
              </div>

              <div class="auth-form-submit text-center">
                <button type="submit" className="btn btn-login ">
                  Login
                </button>
                <a href="" className="small align-bottom ">
                  <p className="d-inline" onClick={props.changeToSignup}>
                    Don't have an account?
                  </p>
                </a>
              </div>
            </form>
          </Modal.Body>
        </div>
      </Modal>
    </div>
  );
};

export default withRouter(LoginForm);
