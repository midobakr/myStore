import admin, { db } from "../../firebaseAdminConfig";
import authMiddleware from "../../middleware/authMiddleware";
async function handler(req, res) {
  console.log("I am in thr=e function it self", req.userId);
  // console.log("I am in thr=e function it self", req.user.uid);
}

export default authMiddleware(handler);
