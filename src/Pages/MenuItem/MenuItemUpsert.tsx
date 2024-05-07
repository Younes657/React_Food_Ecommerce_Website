import React, { useEffect, useState } from "react";
import { inputHelper, toast_notification } from "../../Helper";
import {
  useCreateMenuItemMutation,
  useGetMenuItemQuery,
  useUpdateMenuItemMutation,
} from "../../Api/MenuItemApi";
import { ApiResponse } from "../../Interfaces";
import { useNavigate, useParams } from "react-router-dom";
import { MainLoader } from "../../Components/Common";
import { SD_Categories } from "../../Utility/SD";

const Categories: SD_Categories[] = [
  SD_Categories.APPETIZER,
  SD_Categories.BEVERAGES,
  SD_Categories.DESSERT,
  SD_Categories.ENTREE,
];
const initialItemData = {
  name: "",
  description: "",
  specialTag: "",
  category: Categories[0],
  price: "",
};
function MenuItemUpsert() {
  const { itemId } = useParams();
  const { data } = useGetMenuItemQuery(itemId);
  const [itemData, setItemData] = useState(initialItemData);
  const [storedImage, setStoredImage] = useState<any>();
  const [displayedImage, setDisplayedImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [createMenuItem] = useCreateMenuItemMutation();
  const [updateMenuItem] = useUpdateMenuItemMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (data && data.result) {
      setItemData({
        name: data.result.name,
        description: data.result.description,
        specialTag: data.result.specialTag,
        category: data.result.category,
        price: data.result.price,
      });
      setDisplayedImage(data.result.image);
    }
  }, [data]);

  const handleItemInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    let tempData = inputHelper(e, itemData);
    setItemData(tempData);
  };

  const handlefileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      console.log(file);
      const imgType = file.type.split("/")[1];
      const validateImg = ["jpeg", "png", "jpg"];
      const checking = validateImg.some((type) => type === imgType);
      if (file.size > 1000 * 1024) {
        toast_notification("file must be less then 1 mb", "error");
        return;
      }
      if (!checking) {
        toast_notification("file must be in png , jpeg , jpg format", "error");
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      setStoredImage(file);
      reader.onload = (e) => {
        console.log(e);
        const imgUrl = e.target?.result as string;
        setDisplayedImage(imgUrl);
      };
    }
  };
  const handleSumbmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!storedImage && !itemId) {
      toast_notification("please Upload an image first !!!!", "error");
      setIsLoading(false);
      return;
    }
    const form = new FormData();
    form.append("name", itemData.name);
    form.append("description", itemData.description);
    form.append("specialTag", itemData.specialTag ?? "");
    form.append("category", itemData.category);
    form.append("price", itemData.price);
    if (storedImage) form.append("imageFile", storedImage);

    let response: ApiResponse;
    if (itemId) {
      //update
      form.append("id", itemId);
      response = await updateMenuItem({ data: form, id: itemId });
      if (response.data) {
        setIsLoading(false);
        navigate("/MenuItem");
        toast_notification("Menu Item Updated Successfuly", "success");
      }
    } else {
      //create
      response = await createMenuItem(form);
      if (response.data) {
        setIsLoading(false);
        navigate("/MenuItem");
        toast_notification("Menu Item created Successfuly", "success");
      }
    }
    console.log(response);
    setIsLoading(false);
  };

  return (
    <div className="container border mt-5 p-5 bg-light">
      {isLoading && <MainLoader></MainLoader>}
      <h3 className="offset-2 px-2 text-success">
        {itemId ? "Edit" : "Add"} Menu Item
      </h3>
      <form
        method="post"
        encType="multipart/form-data"
        onSubmit={handleSumbmit}
      >
        <div className="row mt-3">
          <div className="col-md-7 ">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              required
              name="name"
              value={itemData.name}
              onChange={handleItemInput}
            />
            <textarea
              className="form-control mt-3"
              placeholder="Enter Description"
              name="description"
              rows={10}
              value={itemData.description}
              onChange={handleItemInput}
            ></textarea>
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Enter Special Tag"
              name="specialTag"
              value={itemData.specialTag}
              onChange={handleItemInput}
            />
            <select
              className="form-control mt-3 form-select"
              name="category"
              value={itemData.category}
              onChange={handleItemInput}
            >
              {Categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <input
              type="number"
              className="form-control mt-3"
              required
              placeholder="Enter Price"
              name="price"
              value={itemData.price}
              onChange={handleItemInput}
            />
            <input
              type="file"
              className="form-control mt-3"
              onChange={handlefileUpload}
            />
            <div className="row  mt-5">
              <div className="col-6">
                <button
                  type="submit"
                  className="btn btn-success form-control"
                  disabled={isLoading}
                >
                  {itemId ? "Update" : "Submit"}
                </button>
              </div>
              <div className="col-6">
                <a href="/MenuItem" className="btn btn-secondary form-control">
                  Back to List
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-5 text-center">
            <img
              src={displayedImage}
              style={{ width: "100%", borderRadius: "30px" }}
              alt=""
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default MenuItemUpsert;
