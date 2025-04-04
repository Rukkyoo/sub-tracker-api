import express from "express"
import { PORT } from "./config/env.js"
import userRouter from "./routes/user.routes.js"
import authRouter from "./routes/auth.routes.js"
import subscriptionsRouter from "./routes/subscription.routes.js"
import connectToDatabase from "./Database/mongodb.js"
const app = express()

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/subscriptions", subscriptionsRouter)

app.get("/", (req, res) => {
    res.send("Welcome to the Express.js server!")
})


app.listen(PORT, async () => {
    console.log(`Subscription tracker API is running on localhost ${PORT}`);
    await connectToDatabase()
});

export default app

