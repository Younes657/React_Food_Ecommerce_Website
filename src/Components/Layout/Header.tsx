import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { RootState } from "../../Storage/Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { ItemCartModel, UserModel } from "../../Interfaces";
import {
  initialState,
  setLoggedInUser,
} from "../../Storage/Redux/Slice/AuthentiacationSlice";
import { SD_Roles } from "../../Utility/SD";
let logo = require("../../Assets/Images/mango.png");
function Header() {
  const ItemCarts: ItemCartModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );
  const userData: UserModel = useSelector(
    (state: RootState) => state.authentiacationStore
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("Token");
    dispatch(setLoggedInUser({ ...initialState }));
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className=" container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img
            style={{ width: "40px", aspectRatio: 1 / 1 }}
            src={logo}
            alt="logo"
          />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className=" collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav w-100">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/ShoppingCart">
                <i className="bi bi-cart-fill"></i>
                {"  "}
                {userData.sub && `(${ItemCarts.length})`}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/Order">
                Orders
              </NavLink>
            </li>
            {userData.role === SD_Roles.Admin ? (
               <li className="nav-item dropdown">
               <a
                 className="nav-link dropdown-toggle"
                 href="/"
                 role="button"
                 data-bs-toggle="dropdown"
                 aria-expanded="false"
               >
                 Admin Panel
               </a>
               <ul className="dropdown-menu">
                 <li>
                   <NavLink className="dropdown-item" to="/Order/AllOrders">
                     All Orders
                   </NavLink>
                 </li>
                 <li>
                 <NavLink className="dropdown-item" to="/MenuItem">
                    Menu Items
                   </NavLink>
                 </li>
                 <li>
                   <a className="dropdown-item" href="/">
                     Something else here
                   </a>
                 </li>
               </ul>
             </li>
            ) : (<></>)}
            <div className=" d-flex" style={{ marginLeft: "auto" }}>
              {userData.sub && (
                <>
                  <li className="nav-item">
                    <button
                      className=" nav-link active "
                      style={{
                        border: "0",
                        background: " transparent",
                        cursor: "pointer",
                      }}
                    >
                      Welcome, {userData.unique_name}
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-success btn-outline-success text-white mx-2 rounded-pill"
                      style={{
                        border: "none",
                        width: "100px",
                        height: "40px",
                      }}
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
              {!userData.sub && (
                <>
                  {" "}
                  <li className="nav-item">
                    <NavLink className="nav-link " to="/Register">
                      Register
                    </NavLink>
                  </li>
                  <li
                    className="nav-item text-white"
                    style={{
                      border: "none",
                      width: "100px",
                      height: "40px",
                    }}
                  >
                    <NavLink
                      className="btn btn-success btn-outline-success mx-2 text-white rounded-pill"
                      to="/Login"
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
