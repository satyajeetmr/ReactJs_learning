import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import Listing from "./Listing";

const CrudForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formErrors, setFormErrors] = useState({});
  // const [showError, setShowError] = useState(false);
  const [fillFormData, setFillFormData] = useState({
    userName: "",
    userEmail: "",
    userPhone: "",
    userAddress: "",
  });

  const handleChange = (e) => {
    // console.log(e.target.name);
    let { name, value } = e.target;
    if (name === "userPhone") {
      const numericValue = e.target.value.replace(/[^0-9]/g, "");
      value = numericValue;
    }
    setFillFormData({ ...fillFormData, [name]: value });
  };
  // const handleCheck = (e) => {
  //   const { name, value } = e.target;
  //   // console.log("errMsg--", name);

  //   Object.keys(validation(fillFormData)).map((key) => {
  //     const error = validation(fillFormData);
  //     // console.log("keyname", key);
  //     if (key === name && !value) {
  //       // console.log("keyname++", error);
  //       setFormErrors({ ...formErrors, [key]: error[name] });
  //     } else if (name && value) {
  //       // console.log("datafill", formErrors);
  //       // let newf = formErrors;
  //       // delete newf[name];
  //       // console.log("datafill dele", newf);
  //       // setFormErrors((oldval) => newf);
  //     }
  //   });
  // };
  // console.log("formErrors", formErrors);
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validation(fillFormData));
    if (Object.values(validation(fillFormData)).length === 0) {
      id
        ? axios
            .put(
              `https://669929182069c438cd717cfd.mockapi.io/api/crud/v1/loginData/${id}`,
              fillFormData,
              { "Content-Type": "*" }
            )
            .then(function (response) {
              navigate("/crud-form/list");
            })
        : axios
            .post(
              "https://669929182069c438cd717cfd.mockapi.io/api/crud/v1/loginData",
              fillFormData,
              { "Content-Type": "*" }
            )
            .then(function (response) {
              navigate("/crud-form/list");
            });

      setFillFormData({
        userName: "",
        userPhone: "",
        userEmail: "",
        userAddress: "",
      });
    }
  };
  async function handelEdit() {
    axios
      .get(
        `https://669929182069c438cd717cfd.mockapi.io/api/crud/v1/loginData/${id}`
      )
      .then(function (response) {
        setFillFormData({
          userName: response.data.userName,
          userPhone: response.data.userPhone,
          userEmail: response.data.userEmail,
          userAddress: response.data.userAddress,
        });
      });
  }

  useEffect(() => {
    id && handelEdit();
  }, []);

  const validation = (values) => {
    const errors = {};
    // console.log('errval', errors);
    const emailRegex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!values.userName) {
      errors.userName = "Username is required";
    }
    if (!values.userEmail) {
      errors.userEmail = "Email is required";
    } else if (!emailRegex.test(values.userEmail)) {
      errors.userEmail = "Email is not valid";
    }
    if (!values.userPhone) {
      errors.userPhone = "Phone number is required";
    } else if (!values.userPhone.match("^[0-9]{10}$")) {
      errors.userPhone = "Phone number is not valid";
    }
    if (!values.userAddress) {
      errors.userAddress = "Address is required";
    }
    return errors;
  };
  return (
    <>
      <div className="container pt-5 pb-5">
        <form>
          <div className="row">
            <div className="col-sm-6 form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control p-2"
                placeholder="Name"
                name="userName"
                value={fillFormData?.userName}
                // onBlur={handleCheck}
                onChange={handleChange}
                // onChange={(event) =>
                //   setFillFormData((prev) => ({
                //     ...prev,
                //     [event.target.name]: event.target.value,
                //   }))
                // }
              />
              {formErrors.userName && (
                <span className="text-danger">{formErrors.userName}</span>
              )}
            </div>
            <div className="col-sm-6 form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control p-2"
                placeholder="Email"
                name="userEmail"
                value={fillFormData?.userEmail}
                // onBlur={handleCheck}
                onChange={handleChange}
                // onChange={(event) =>
                //   setFillFormData((prev) => ({
                //     ...prev,
                //     [event.target.name]: event.target.value,
                //   }))
                // }
              />
              {formErrors.userEmail && (
                <span className="text-danger">{formErrors.userEmail}</span>
              )}
            </div>
            <div className="col-sm-6 form-group">
              <label>Phone</label>
              <input
                type="tel"
                className="form-control p-2"
                placeholder="Phone"
                name="userPhone"
                pattern="/[^0-9]/g"
                maxLength={10}
                value={fillFormData?.userPhone}
                // onBlur={handleCheck}
                onChange={handleChange}
                // onChange={(event) => {
                //   // Allow only numbers
                //   const numericValue =  event.target.value.replace(/[^0-9]/g, "");
                //   // console.log('numericValue', numericValue);
                //   setFillFormData((prev) => ({
                //     ...prev,
                //     [event.target.name]: numericValue,
                //   }));
                // }}
              />
              {formErrors.userPhone && (
                <span className="text-danger">{formErrors.userPhone}</span>
              )}
            </div>
            <div className="col-sm-6 form-group">
              <label>Address</label>
              <input
                type="text"
                className="form-control p-2"
                placeholder="Address"
                name="userAddress"
                value={fillFormData?.userAddress}
                // onBlur={handleCheck}
                onChange={handleChange}
                // onChange={(event) =>
                //   setFillFormData((prev) => ({
                //     ...prev,
                //     [event.target.name]: event.target.value,
                //   }))
                // }
              />
              {formErrors.userAddress && (
                <span className="text-danger">{formErrors.userAddress}</span>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            {id ? "Update" : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default CrudForm;
