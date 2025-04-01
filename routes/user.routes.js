import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => res.send("Get all users"));
userRouter.get("/:id", (req, res) => res.send("Get user details"));
userRouter.post("/", (req, res) => res.send("Create new user"));
userRouter.patch("/:id", (req, res) => res.send("Update user"));
userRouter.delete("/:id", (req, res) => res.send("Delete user"));
userRouter.get("/subscriptions", (req, res) => res.send("User subscriptions"));

export default userRouter;