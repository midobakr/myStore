import Cookies from "cookies";
const keys = ["opscjedcoij", ";oeroerer;"];
export default async function handler(req, res) {
  const cookies = new Cookies(req, res, { keys });
  let whishList = cookies.get("whishList", { signed: true });
  console.log("whis", whishList);
  if (req.method === "POST") {
    if (!whishList) {
      whishList = "";
    }
    if (whishList?.search(req.body.id) >= 0) {
      whishList = whishList.replace(`${req.body.id}@`, "");
    } else {
      whishList += `${req.body.id}@`;
    }
    cookies.set("whishList", whishList, {
      signed: true,
      maxAge: 100 * 24 * 60 * 60 * 1000,
    });
    // let id = await req.body.json();
    // console.log("if=>", whishList);
    res.status(200).json(whishList?.split("@"));
  }
  if (req.method === "GET") {
    if (!whishList) {
      res.status(200).json([]);
    } else {
      res.status(200).json(whishList?.split("@"));
    }
  }
}
