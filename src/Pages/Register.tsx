import React, { useState } from "react";
import { inputHelper, toast_notification } from "../Helper";
import { useRegisterUserMutation } from "../Api/AuthenticationApi";
import { ApiResponse } from "../Interfaces";
import { SD_Roles } from "../Utility/SD";
import { useNavigate } from "react-router-dom";
import { MainLoader } from "../Components/Common";
function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [registerMutation] = useRegisterUserMutation();
  const navigate = useNavigate();
  const initialUserData = {
    name: "",
    email: "",
    phoneNumber: "",
    role: "",
    username: "",
    password: "",
  };
  const [userInput, setUserInput] = useState(initialUserData);

  const handleUserInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const response: ApiResponse = await registerMutation({
      name: userInput.name,
      email: userInput.email,
      phoneNumber: userInput.phoneNumber,
      role: userInput.role,
      username: userInput.username,
      password: userInput.password,
    });
    if (response.data) {
      toast_notification("User Registration Success , Try to login Now to continue");
      navigate("/Login");
    }
    else if (response.error) toast_notification(response.error.data.errors[0], "error");

    setIsLoading(false);
  };
  return (
    <div className="container text-center">
      {isLoading && <MainLoader></MainLoader>}
      <form method="post" onSubmit={handleSubmit}>
        <h1 className="mt-5">Register</h1>
        <div className="mt-5">
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Username"
              required
              name="username"
              value={userInput.username}
              onChange={handleUserInput}
            />
          </div>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              required
              value={userInput.name}
              onChange={handleUserInput}
              name="name"
            />
          </div>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter email"
              required
              value={userInput.email}
              onChange={handleUserInput}
              name="email"
            />
          </div>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Phone Number"
              required
              value={userInput.phoneNumber}
              onChange={handleUserInput}
              name="phoneNumber"
            />
          </div>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              required
              value={userInput.password}
              onChange={handleUserInput}
              name="password"
            />
          </div>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <select
              className="form-control form-select"
              required
              value={userInput.role}
              onChange={handleUserInput}
              name="role"
            >
              <option value="">--Select Role--</option>
              <option value={SD_Roles.Customer}>Customer</option>
              <option value={SD_Roles.Admin}>Admin</option>
            </select>
          </div>
        </div>
        <div className="mt-5">
          <button type="submit" className="btn btn-success" disabled = {isLoading}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
