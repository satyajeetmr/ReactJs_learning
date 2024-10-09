import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";

const initialLoginData = {
  username: "",
  // email: "",
  password: "",
};

const Login = () => {
  const [loginDetail, setLoginDetail] = useState(initialLoginData);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { user, loginUser } = useAuth();

  const handelChange = (e) => {
    const { name, value } = e.target;
    // console.log("name: value [] ", name, {}, value);
    setLoginDetail({ ...loginDetail, [name]: value });
  };
  const handelBlure = (e) => {
    const { name, value } = e.target;
    const error = validation(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const validation = (name, value) => {
    // console.log("val-name", value);
    let error = "";
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    switch (name) {
      case "username":
        if (!value) {
          error = "Please enter username.";
        }
        break;
      case "email":
        if (!value) {
          error = "please enter email id.";
        } else if (!value.match(emailRegex)) {
          error = "Please enter a valid email id.";
        }
        break;
      case "password":
        if (!value) {
          error = "Please enter password.";
        } else if (value.length < 6) {
          error = "Password must be at least 6 charaters long.";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    Object.keys(loginDetail).forEach((key) => {
      const error = validation(key, loginDetail[key]);

      if (error) {
        validationErrors[key] = error;
      }
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // console.log("login data", loginDetail);
      axios
        .post("https://fakestoreapi.com/auth/login", loginDetail, {
          "content-type": "application / json",
        })
        .then(function (res) {
          // console.log("login res: ", res.data);
          localStorage.setItem("loginToken", res.data.token);
          const userInfo = res.data.token;
          loginUser(userInfo);
          // if (res.data.token) {
          //   navigate("/");
          // }
        });
      setLoginDetail(initialLoginData);
    }
  };

  // console.log("err--", errors);

  useEffect(() => {
    // console.log("afterLoignUesr", user);
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      <div className="container pt-5 pb-5">
        <form method="post">
          <div className="col-md-8 col-lg-6 m-auto border rounded p-3">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control p-2"
                placeholder="Please enter user name"
                name="username"
                value={loginDetail?.username}
                onChange={handelChange}
                onBlur={handelBlure}
              />
              {errors?.username && (
                <span className="text-danger">{errors?.username}</span>
              )}
            </div>
            {/* <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control p-2"
                placeholder="Please enter user email"
                name="email"
                value={loginDetail?.email}
                onChange={handelChange}
                onBlur={handelBlure}
              />
              {errors?.email && (
                <span className="text-danger">{errors?.email}</span>
              )}
            </div> */}
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control p-2"
                placeholder="Please enter password"
                name="password"
                value={loginDetail?.password}
                onChange={handelChange}
                onBlur={handelBlure}
              />
              {errors?.password && (
                <span className="text-danger">{errors?.password}</span>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
          <div className="mt-4 text-center">
            Please registor your self on click <Link to="/signup">SignUp</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
