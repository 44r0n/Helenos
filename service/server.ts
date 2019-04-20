import express from "express";

const app: express.Application = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
    console.log("GET: '/'")
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
