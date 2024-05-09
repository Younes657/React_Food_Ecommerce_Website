import React, { useState } from "react";
import { useEffect } from "react";
import { MenuItemModel } from "../../../Interfaces";
import MenuItemCart from "./MenuItemCart";
import { useGetAllMenuItemsQuery } from "../../../Api/MenuItemApi";
import { useDispatch, useSelector } from "react-redux";
import { setMenuItem } from "../../../Storage/Redux/Slice/MenuItemSlice";
import { MainLoader } from "../../Common";
import { RootState } from "../../../Storage/Redux/store";
import { SD_SortTypes } from "../../../Utility/SD";

const sortOptions: SD_SortTypes[] = [
  SD_SortTypes.NAME_A_Z,
  SD_SortTypes.NAME_Z_A,
  SD_SortTypes.PRICE_LOW_HIGH,
  SD_SortTypes.PRICE_HIGH_LOW,
];
function MenuItemList() {
  const [menuItems, setMenuItems] = useState<MenuItemModel[]>(() => []);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [categroyList, setCategoryList] = useState<string[]>(() => []);
  const [sortOption, setSortOption] = useState<SD_SortTypes>(
    SD_SortTypes.NAME_A_Z
  );
  const dispatch = useDispatch();
  const { data, isLoading } = useGetAllMenuItemsQuery(null);

  const searchValue = useSelector(
    (state: RootState) => state.menuItemStore.searchValue
  );

  useEffect(() => {
    if (data && data.result) {
      setMenuItems(handleFiltration(searchValue, selectedCategory, sortOption));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setMenuItem(data.result));
      setMenuItems(data.result);
      let tempCategoryList = ["All"];
      data.result.forEach((item: MenuItemModel) => {
        if (tempCategoryList.indexOf(item.category) === -1) {
          tempCategoryList.push(item.category);
        }
      });
      setCategoryList(tempCategoryList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]); //we add the dispatch and data.result because of the warning
  //warning : React Hook useEffect has missing dependencies: 'data.result' and 'dispatch'. Either include
  //them or remove the dependency array.
  if (isLoading) {
    return <MainLoader></MainLoader>;
  }

  const handleFiltration = (
    search: string,
    category: string,
    sortType: SD_SortTypes
  ) => {
    let tempMenuItems: MenuItemModel[] =
      category === "All"
        ? [...data.result]
        : data.result.filter(
            (item: MenuItemModel) =>
              item.category.toUpperCase() === category.toUpperCase()
          );
    //search functionality
    if (search) {
      tempMenuItems = tempMenuItems.filter((item: MenuItemModel) => {
        return item.name.toUpperCase().includes(search.toUpperCase());
      });
    }
    //sort functionality
    switch (sortType) {
      case SD_SortTypes.NAME_A_Z:
        tempMenuItems.sort(
          (a: MenuItemModel, b: MenuItemModel) =>
            a.name.toUpperCase().charCodeAt(0) -
            b.name.toUpperCase().charCodeAt(0)
        );
        break;
      case SD_SortTypes.NAME_Z_A:
        tempMenuItems.sort(
          (a: MenuItemModel, b: MenuItemModel) =>
            b.name.toUpperCase().charCodeAt(0) -
            a.name.toUpperCase().charCodeAt(0)
        );

        break;
      case SD_SortTypes.PRICE_LOW_HIGH:
        tempMenuItems.sort(
          (a: MenuItemModel, b: MenuItemModel) => a.price - b.price
        );
        break;
      case SD_SortTypes.PRICE_HIGH_LOW:
        tempMenuItems.sort(
          (a: MenuItemModel, b: MenuItemModel) => b.price - a.price
        );
        break;

      default:
        break;
    }

    return tempMenuItems;
  };
  const handleClickCategory = (i: number) => {
    const buttons = document.querySelectorAll(".custom-buttons");
    buttons.forEach((button, index) => {
      if (index === i) {
        button.classList.add("active");
        setSelectedCategory(categroyList[index]);
        setMenuItems(
          handleFiltration(searchValue, categroyList[index], sortOption)
        );
      } else {
        button.classList.remove("active");
      }
    });
  };

  const handleSortClick = (i: number) => {
    setSortOption(sortOptions[i]);
    setMenuItems(handleFiltration(searchValue, selectedCategory, sortOption));
  };
  // useEffect(() =>{
  //   fetch("https://localhost:7034/api/MenuItem").then((response) =>{
  //     console.log(response)
  //     return response.json()
  //   }).then((data) => {
  //     console.log(data)
  //     setMenuItems(data.result)
  //   })
  // }, [])
  return (
    <div className="container row">
      <div className="my-3">
        <ul className="nav d-flex w-100 justify-content-center align-items-center">
          {categroyList.map((category: string, index: number) => {
            return (
              <li
                className=" nav-item"
                style={{ ...(index === 0 && { marginLeft: "auto" }) }}
                key={index}
              >
                <button
                  className={` nav-link p-0 pb-2 custom-buttons fs-5 ${
                    index === 0 && "active"
                  }`}
                  onClick={() => handleClickCategory(index)}
                >
                  {category}
                </button>
              </li>
            );
          })}
          <li className="nav-item dropdown " style={{ marginLeft: "auto" }}>
            <div
              className="nav-link dropdown-toggle text-dark fs-6 border"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {sortOption}
            </div>
            <ul className=" dropdown-menu">
              {sortOptions.map((option: SD_SortTypes, index: number) => (
                <li
                  key={index}
                  className="dropdown-item"
                  onClick={() => handleSortClick(index)}
                  style={{ cursor: "pointer" }}
                >
                  {option}
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
      {data.result?.length > 0 &&
        menuItems.map((menu: MenuItemModel, index: number) => (
          <MenuItemCart key={index} menuItem={menu} />
        ))}
    </div>
  );
}

export default MenuItemList;
