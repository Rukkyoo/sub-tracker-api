import express from "express";
import { PORT } from "./config/env.js";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionsRouter from "./routes/subscription.routes.js";
import connectToDatabase from "./Database/mongodb.js";
import errorMiddleWare from "./middleware/error.middleware.js";
import workflowRouter from "./routes/workflow.routes.js";
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

// Apply the rate limiting middleware to all requests.
app.use(limiter);

//  Middleware should be used before routes
app.use(errorMiddleWare);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//  Routes should always come last
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionsRouter);
app.use("/api/v1/workflows", workflowRouter)

app.get("/", (req, res) => {
  res.send("Welcome to the Express.js server!");
});

app.listen(PORT, async () => {
  console.log(`Subscription tracker API is running on localhost ${PORT}`);
  await connectToDatabase();
});

export default app;
