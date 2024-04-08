import React from "react";
import { MenuItemModel } from "../../../Interfaces";

interface Props {
  menuItem: MenuItemModel;
  key: number;
}
function MenuItemCart(props: Props) {
  return (
    <div className="col-lg-4 col-md-6 col-12 g-5">
      <div className="card"  style={{ boxShadow: "0 1px 7px 0 rgb(0 0 0 / 50%)" }}>
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
                <i className="bi bi-cart-plus-fill btn btn-outline-danger "></i>
              </div>
            </div>
          </div>
          <img
            className=" card-img w-100 p-4"
            src={props.menuItem.image}
            alt="Not_fetched"
            style={{ borderRadius: "50%" }}
          />
          <div className=" card-contennt text-center">
            <h3 className="card-title text-success">{props.menuItem.name}</h3>
            <p className="badge bg-secondary" style={{ fontSize: "12px" }}>
              category
            </p>
            <p className="card-text" style={{fontSize:"14px"}}>{props.menuItem.description}</p>
            <h5 className="card-subtitle">{props.menuItem.price}$</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuItemCart;
