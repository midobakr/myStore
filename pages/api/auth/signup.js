import { auth, db } from "../../../firebaseAdminConfig";

export default async function handler(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  const token = req.headers.authorization;
  if (token) {
    const user = await auth.verifyIdToken(token);
    try {
      if (user.uid) {
        const savedUser = await db.collection("users").doc(user.uid).set({
          name: username,
          email: email,
        });
      }
      res.status(200).json({ ok: true });
    } catch (e) {
      await auth.deleteUser(user.uid);
      res.status(404).send({ e: "there is an Error" });
      return;
    }
  }
}
