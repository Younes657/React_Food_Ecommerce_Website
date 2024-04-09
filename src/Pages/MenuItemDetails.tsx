import React from "react";
import { useGetMenuItemQuery } from "../Api/MenuItemApi";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function MenuItemDetails() {
  const { menuItemId } = useParams();
  const { data, isLoading } = useGetMenuItemQuery(menuItemId);
  const navigate = useNavigate();
  const [Quantity, setQuantity] = useState(1);
  if (isLoading) {
    return <div>Loading ....</div>;
  }
  console.log(data);
  return (
    <div className=" container pt-5" >
      <div className="row align-items-center" >
        <div className=" col-lg-7 col-12 ">
          <h1 className=" text-success">{data?.result?.name}</h1>
          <span className=" badge text-bg-dark pt-2" style={{ height: "40px", fontSize: "20px" }}>{data?.result?.category}</span>
          {data?.result?.specialTag && (
            <span className=" badge text-bg-light pt-2" style={{ height: "40px", fontSize: "20px" }}>
              {" "}
              {data?.result?.specialTag}
            </span>
          )}
          <p className="pt-2" style={{fontSize:"20px"}}>{data?.result?.description}</p>
          <span className="h3">{data?.result.price} $$</span> &nbsp;&nbsp;&nbsp;
          <span
            className="pb-2  p-3"
            style={{ border: "1px solid #333", borderRadius: "30px" }}
          >
            <i
              className="bi bi-dash p-1"
              style={{ fontSize: "25px", cursor: "pointer" }}
              onClick={() => setQuantity((prevState) =>{
                if(prevState !== 1) return prevState-1;
                else return prevState;
              } )}
            ></i>
            <span className="h3 mt-3 px-3">{Quantity}</span>
            <i
              className="bi bi-plus p-1"
              style={{ fontSize: "25px", cursor: "pointer" }}
              onClick={() => setQuantity((prevState)=> prevState + 1 )}
            ></i>
          </span>
          <div className="row pt-4">
            <div className="col-5">
              <button className="btn btn-success form-control">
                Add to Cart
              </button>
            </div>

            <div className="col-5 ">
              <button className="btn btn-secondary form-control" onClick={() => navigate("/")}>
                Back to Home
              </button>
            </div>
          </div>
        </div>
        <div className=" col-lg-4 col-8 offset-2 pt-5 pt-lg-0 offset-lg-1">
          <img
            src={data?.result.image}
            className=" w-100 rounded-circle"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default MenuItemDetails;
