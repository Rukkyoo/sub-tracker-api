import { Router } from "express";
import { authorize } from "../middleware/auth.middleware.js";
import { createSubscription, getUserSubscriptions } from "../controllers/subscription.controller.js";

const subscriptionsRouter = Router();

subscriptionsRouter.get("/", (req, res) => res.send("Get all subscriptions"));
subscriptionsRouter.get("/:id", authorize, getUserSubscriptions);
subscriptionsRouter.post("/", authorize, createSubscription);
subscriptionsRouter.patch("/:id", (req, res) => res.send("Update subscriptions"));
subscriptionsRouter.delete("/:id", (req, res) => res.send("Delete subscriptions"));
subscriptionsRouter.get("/user/:id", (req, res) => res.send("Get all user subscriptions"));
subscriptionsRouter.put("/:id/cancel", (req, res) => res.send("cancel user subscriptions"));
subscriptionsRouter.put("/upcoming-renewals", (req, res) => res.send("get upcoming renewals"));

export default subscriptionsRouter;
