import React from "react";
import { useState } from "react";
import { inputHelper } from "../Helper";
import { useLoginUserMutation } from "../Api/AuthenticationApi";
import { ApiResponse, UserModel } from "../Interfaces";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../Storage/Redux/Slice/AuthentiacationSlice";
import { useNavigate } from "react-router-dom";
import { MainLoader } from "../Components/Common";

function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginMutation] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialUserData = {
    email: "",
    username: "",
    password: "",
  };
  const [userInput, setUserInput] = useState(initialUserData);

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const response: ApiResponse = await loginMutation({
      email: userInput.email,
      username: userInput.username,
      password: userInput.password,
    });
    if (response.data) {
      console.log(response.data);
      localStorage.setItem("Token", response.data.result!.token);
      const { sub, unique_name, email, role }: UserModel = jwtDecode(
        response.data.result!.token
      );
      console.log(`${sub} - ${role} - ${unique_name} - ${email}`);
      dispatch(setLoggedInUser({ sub, unique_name, email, role }));
      navigate("/");
    } else if (response.error) {
      console.log(response);
      setError(response.error.data.errors[0]);
    }

    setIsLoading(false);
  };

  return (
    <div className="container text-center">
      {isLoading && <MainLoader></MainLoader>}

      <form method="post" onSubmit={handleSubmit}>
        <h1 className="mt-5">Login</h1>
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
              placeholder="Enter emial"
              required
              name="email"
              value={userInput.email}
              onChange={handleUserInput}
            />
          </div>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              required
              name="password"
              value={userInput.password}
              onChange={handleUserInput}
            />
          </div>
        </div>

        <div className="mt-2">
          {error && <div className="text-danger">{error}</div>}
          <button
            type="submit"
            className="btn btn-success"
            style={{ width: "200px" }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
