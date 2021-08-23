import { combineReducers } from "redux";
import product from "./product";
import alert from "./alert";
import auth from "./auth";
import authCargo from "./authCargo";
import language from "./language";
import authSeller from "./authSeller";
import sellerProfile from "./sellerProfile";
import formLoading from "./formLoading";
import documentCount from "./documentCount";
import payment from "./payment";
import shopLoading from "./shopLoading";
import shipping from "./shipping";
import orders from "./orders";
import productOption from "./productOption";
import cargoProfile from "./cargoProfile";
import destination from "./destination";

export default combineReducers({
  product,
  alert,
  auth,
  authSeller,
  authCargo,
  sellerProfile,
  cargoProfile,
  formLoading,
  documentCount,
  payment,
  shopLoading,
  shipping,
  orders,
  language,
  productOption,
  destination
});
