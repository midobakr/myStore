import Cookies from "cookies";
const keys = ["opscjedcoij", ";oeroerer;"];

export default function getLikdProductsFromCookies(req, res) {
  const cookies = new Cookies(req, res, { keys });
  let whishList = cookies.get("whishList", { signed: true }) || [];

  if (whishList[0]) {
    whishList = JSON.parse(whishList);
    return whishList;
  }
  console.log("whis", whishList[0]);

  return [];
}
