import React from "react";
import { useDeleteMenuItemMutation, useGetAllMenuItemsQuery } from "../../Api/MenuItemApi";
import { MainLoader } from "../../Components/Common";
import { MenuItemModel } from "../../Interfaces";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function MenuItemList() {
  const [delteMenuItem] = useDeleteMenuItemMutation()
  const { data, isLoading } = useGetAllMenuItemsQuery(null);
  const navigate = useNavigate()

  const handleDeleteMenuItem  = (id : number) =>{
    
    toast.promise(
      delteMenuItem(id),
      {
        pending: 'Processing Resquest ... ',
        success: 'Item deleted Successfully  ',
        error: 'Error has been occured '
      }
  )
  }

  return (
    <>
      {isLoading && <MainLoader></MainLoader>}
      {!isLoading && (
        <div className="container p-5">
          <div className=" d-flex justify-content-between align-items-center mb-2">
            <h1 className="text-success">Orders List</h1>
            <button className="btn btn-success p-2 rounded-2" onClick={() => navigate("/MenuItem/UpsertItem")}>Add New</button>
          </div>
          <div className=" table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th style={{whiteSpace:"nowrap"}}>Specil Tag</th>
                  <th>Price</th>
                  <th style={{whiteSpace:"nowrap"}}>Actions</th>
                </tr>
              </thead>
              <tbody className=" table-group-divider">
                {data.result.map((menuItem: MenuItemModel, index: number) => {
                  return (
                    <tr key={index}>
                      <td>
                        <div>
                          <img
                            style={{ width: "100px" }}
                            src={menuItem.image}
                            alt="not fetched"
                          />
                        </div>
                      </td>
                      <td>{menuItem.id}</td>
                      <td>{menuItem.name}</td>
                      <td>{menuItem.category}</td>
                      <td style={{whiteSpace:"nowrap"}}>{menuItem.specialTag}</td>
                      <td>{menuItem.price}</td>
                      <td style={{whiteSpace:"nowrap"}}>
                        <span>
                          <button className="btn btn-success d-inline-block" onClick={() => navigate(`/MenuItem/UpsertItem/${menuItem.id}`)}>
                            <i className="bi bi-pencil-fill"></i>
                          </button>
                        </span>
                        <span>
                          <button className="btn btn-danger mx-2" onClick={() => handleDeleteMenuItem(menuItem.id)}>
                            <i className="bi bi-trash-fill"></i>
                          </button>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default MenuItemList;
