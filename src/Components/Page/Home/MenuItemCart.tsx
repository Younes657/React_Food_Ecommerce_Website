import React from "react";
import { MenuItemModel } from "../../../Interfaces";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useUpsertShoppingCartMutation } from "../../../Api/ShoppingCartApi";
import { MiniLoader } from "../../Common";
interface Props {
  menuItem: MenuItemModel;
  key: number;
}
function MenuItemCart(props: Props) {
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [UpsertShoppingCart] = useUpsertShoppingCartMutation();

  const handleAddToShoopingCart = async (menuItemId: number) => {
    setIsAddingToCart(true);

    const response = await UpsertShoppingCart({
      MenuId: menuItemId,
      UpQuaBy: 1,
      UserId: "09920cdc-9d7a-4346-95d1-800c6cdf7028",
    });
    console.log(response);
    console.log(isAddingToCart);
    setIsAddingToCart(false);
  };

  return (
    <div className="col-lg-4 col-md-6 col-12 g-5">
      <div
        className="card"
        style={{ boxShadow: "0 1px 7px 0 rgb(0 0 0 / 50%)" }}
      >
        <div className=" card-body">
          <div
            className="card-header"
            style={{
              padding: "0",
              backgroundColor: "white",
              border: "none",
            }}
          >
            <div className="row">
              <div className="col-8">
                {props.menuItem.specialTag && (
                  <i className="bi bi-star btn btn-success py-1 px-2">
                    &nbsp; {props.menuItem.specialTag}
                  </i>
                )}
              </div>
              <div className=" col-3 offset-1 ">
                {isAddingToCart ? (
                  <MiniLoader></MiniLoader>
                ) : (
                  <i
                    className="bi bi-cart-plus-fill btn btn-outline-danger "
                    onClick={() => handleAddToShoopingCart(props.menuItem.id)}
                  ></i>
                )}
              </div>
            </div>
          </div>
          <Link to={`/MenuItemDetails/${props.menuItem.id}`}>
            <img
              className=" card-img w-100 p-4"
              src={props.menuItem.image}
              alt="Not_fetched"
              style={{ borderRadius: "50%" }}
            />
          </Link>
          <div className=" card-contennt text-center">
            <h3 className="card-title text-success">
              <Link
                to={`/MenuItemDetails/${props.menuItem.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {props.menuItem.name}
              </Link>
            </h3>
            <p className="badge bg-secondary" style={{ fontSize: "12px" }}>
              {props.menuItem.category}
            </p>
            <p className="card-text" style={{ fontSize: "14px" }}>
              {props.menuItem.description}
            </p>
            <h5 className="card-subtitle">{props.menuItem.price}$</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuItemCart;
