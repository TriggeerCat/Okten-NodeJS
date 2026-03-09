const express = require("express");
const { userService } = require("./services/user.service");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users", async (req, res) => {
    const users = await userService.getAll();
    res.json(users);
});

app.get("/users/:id", async (req, res) => {
    const user = await userService.getById(+req.params.id);
    res.json(user);
});

app.post("/users", async (req, res) => {
    const user = await userService.create(req.body);
    res.json(user);
});

app.put("/users/:id", async (req, res) => {
    const user = await userService.update(+req.params.id, req.body);
    res.json(user);
});

app.delete("/users/:id", async (req, res) => {
    const user = await userService.delete(+req.params.id);
    res.json(user);
});

app.listen(12250, () => {
    console.log("Merry Christmas!");
});
