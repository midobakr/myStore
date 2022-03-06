import { async } from "@firebase/util";
import { auth, db } from "../firebaseAdminConfig";

const authMiddleware = (handler) => async (req, res) => {
  try {
    const token = req.headers.authorization;
    console.log("I am in the middleware");
    if (!token) {
      return handler(req, res);
    }
    const user = await auth.verifyIdToken(token);
    if (user?.uid) {
      req.userId = user.uid;
    } else {
      req.userId = false;
    }
    return handler(req, res);
  } catch (e) {
    console.log(e);
    return handler(req, res);
  }
};

export default authMiddleware;
