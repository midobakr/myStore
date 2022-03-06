import Cookies from "cookies";
const keys = ["opscjedcoij", ";oeroerer;"];

export default function toCartList(req, res) {
  const cookies = new Cookies(req, res, { keys });
  let cartList = cookies.get("cartList", { signed: true }) || [];

  if (cartList[0]) {
    cartList = JSON.parse(cartList);
    return cartList;
  }
  return [];
}
