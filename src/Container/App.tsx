import { useDispatch } from "react-redux";
import { Header, Footer } from "../Components/Layout";
import {
  Home,
  Login,
  MenuItemDetails,
  NotFound,
  Register,
  ShoppingCart,
} from "../Pages";
import { Routes, Route } from "react-router-dom";
import { useGetShoppingCartQuery } from "../Api/ShoppingCartApi";
import { useEffect } from "react";
import { setCartItems } from "../Storage/Redux/Slice/ShoppingCartSlice";
import { UserModel } from "../Interfaces";
import { jwtDecode } from "jwt-decode";
import { setLoggedInUser } from "../Storage/Redux/Slice/AuthentiacationSlice";
function App() {
  const dispatch = useDispatch();

  const { data, isLoading } = useGetShoppingCartQuery(
    "09920cdc-9d7a-4346-95d1-800c6cdf7028"
  );

  useEffect(() => {
    const localToken = localStorage.getItem("Token");
    if (localToken) {
      const { sub, unique_name, email, role }: UserModel =
        jwtDecode(localToken);
      dispatch(setLoggedInUser({ sub, unique_name, email, role }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isLoading) dispatch(setCartItems(data.result.cartItems));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]); // in here it should be data not isLoading so when we add or delete from the cart the get query also updated

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
          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
