import React, { useState } from "react";

const FormData = () => {
  const [formValues, setFormValues] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
  });

  // Validation errors state
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Validation logic
  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "userName":
        if (!value) {
          error = "Name is required";
        } else if (value.length < 3) {
          error = "Name must be at least 3 characters long";
        }
        break;
      case "userEmail":
        if (!value) {
          error = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Email is invalid";
        }
        break;
      case "userPassword":
        if (!value) {
          error = "Password is required";
        } else if (value.length < 6) {
          error = "Password must be at least 6 characters long";
        }
        break;
      default:
        break;
    }
    //console.log(error);
    return error;

  };

  // Handle field blur (validation on blur)
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  // Handle form submission (optional)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the entire form on submit
    const validationErrors = {};
    Object.keys(formValues).forEach((key) => {
      const error = validateField(key, formValues[key]);
      if (error) {
        validationErrors[key] = error;
      }
    });

    setErrors(validationErrors);

    // If no errors, proceed with form submission logic
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted:", formValues);
    }
  };

  return (
    <div className="container pt-3 pb-5">
      <form >
        <div className="row">
          <div className="col-sm-6 form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="userName"
              className="form-control p-2"
              value={formValues.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.userName && <span className="text-danger">{errors.userName}</span>}
          </div>

          <div className="col-sm-6 form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="userEmail"
              className="form-control p-2"
              value={formValues.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.userEmail && (
              <span className="text-danger">{errors.userEmail}</span>
            )}
          </div>

          <div className="col-sm-6 form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="userPassword"
              className="form-control p-2"
              value={formValues.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.userPassword && (
              <span className="text-danger">{errors.userPassword}</span>
            )}
          </div>
        </div>

        <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default FormData;
