import MenuItemModel from "./MenuItemModel";

export default interface ItemCartModel {
  id?: number;
  menuItemId?: number;
  menuItem?: MenuItemModel;
  quantity?: number;
}