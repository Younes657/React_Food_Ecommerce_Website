import { useDispatch, useSelector } from "react-redux";
import { Header, Footer } from "../Components/Layout";
import {
  Home,
  Login,
  MenuItemDetails,
  NotFound,
  OrderConfirmed,
  UserOrders,
  Payment,
  Register,
  ShoppingCart,
} from "../Pages";
import { Routes, Route } from "react-router-dom";
import { useGetShoppingCartQuery } from "../Api/ShoppingCartApi";
import { useEffect, useState } from "react";
import { setCartItems } from "../Storage/Redux/Slice/ShoppingCartSlice";
import { UserModel } from "../Interfaces";
import { jwtDecode } from "jwt-decode";
import { setLoggedInUser } from "../Storage/Redux/Slice/AuthentiacationSlice";
import AccessDenied from "../Pages/AccessDenied";
import { RootState } from "../Storage/Redux/store";
function App() {
  const dispatch = useDispatch();
  const userData: UserModel = useSelector(
    (state: RootState) => state.authentiacationStore
  );
  const [skip, setSkip] = useState(true);

  useEffect(() => {
    const localToken = localStorage.getItem("Token");
    if (localToken) {
      const { sub, unique_name, email, role }: UserModel =
        jwtDecode(localToken);
      dispatch(setLoggedInUser({ sub, unique_name, email, role }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { data, isLoading } = useGetShoppingCartQuery(userData.sub, {
    skip: skip,
  });

  useEffect(() => {
    if (!isLoading && data) dispatch(setCartItems(data.result?.cartItems));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]); // in here it should be data not isLoading so when we add or delete from the cart the get query also updated

  useEffect(() => {
    if (userData.sub) setSkip(false);
  }, [userData]);

  return (
    <div>
      <Header></Header>
      <div style={{ paddingBottom: "80px" }}>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route
            path="/MenuItemDetails/:menuItemId"
            element={<MenuItemDetails></MenuItemDetails>}
          ></Route>
          <Route
            path="/ShoppingCart"
            element={<ShoppingCart></ShoppingCart>}
          ></Route>
          <Route path="/Login" element={<Login></Login>}></Route>
          <Route path="/Register" element={<Register></Register>}></Route>
          <Route
            path="/AccessDenied"
            element={<AccessDenied></AccessDenied>}
          ></Route>
          <Route path="/Payment" element={<Payment></Payment>}></Route>
          <Route path="Order">
            <Route path="" element={<UserOrders></UserOrders>}></Route>
            <Route
              path="OrderConfirmed/:OrderId"
              element={<OrderConfirmed></OrderConfirmed>}
            ></Route>
          </Route>
          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
