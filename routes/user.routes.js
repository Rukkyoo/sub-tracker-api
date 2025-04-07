import { Router } from "express";
import { getUsers, getUserById } from "../controllers/user.controller.js";
import { authorize } from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", authorize, getUserById);
userRouter.post("/", (req, res) => res.send("Create new user"));
userRouter.patch("/:id", (req, res) => res.send("Update user"));
userRouter.delete("/:id", (req, res) => res.send("Delete user"));
userRouter.get("/subscriptions", (req, res) => res.send("User subscriptions"));

export default userRouter;
