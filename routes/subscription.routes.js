import { Router } from "express";

const subscriptionsRouter = Router();

subscriptionsRouter.get("/", (req, res) => res.send("Get all subscriptions"));
subscriptionsRouter.get("/:id", (req, res) => res.send("Get specific subscriptions"));
subscriptionsRouter.post("/", (req, res) => res.send("create subscriptions"));
subscriptionsRouter.patch("/:id", (req, res) => res.send("Update subscriptions"));
subscriptionsRouter.delete("/:id", (req, res) => res.send("Delete subscriptions"));
subscriptionsRouter.get("/user/:id", (req, res) => res.send("Get all user subscriptions"));
subscriptionsRouter.put("/:id/cancel", (req, res) => res.send("cancel user subscriptions"));
subscriptionsRouter.put("/upcoming-renewals", (req, res) => res.send("get upcoming renewals"));

export default subscriptionsRouter;