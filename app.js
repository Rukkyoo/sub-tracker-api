import express from "express"
const app = express()

app.get("/", (req, res) => {
    res.send("Welcome to the Express.js server!")
})

const port = 3000;
app.listen(port, () => {
    console.log(`Subscription tracker API is running on localhost ${port}`);
});

export default app