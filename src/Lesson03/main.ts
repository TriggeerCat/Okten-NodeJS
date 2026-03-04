import express, { Response, Request } from "express";
import * as mongoose from "mongoose";
import { userService } from "./services/user.service";
import { User, UserDTO } from "./interfaces/user.interface";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users", async (req: Request, res: Response) => {
    const users: User[] = await userService.getAll();
    res.json(users);
});

app.get("/users/:id", async (req: Request, res: Response) => {
    const user: User | null = await userService.getById(req.params.id);
    res.json(user ? user : {});
});

app.post("/users", async (req: Request, res: Response) => {
    const user: UserDTO = req.body;
    const newUser: User = await userService.create(user);
    res.json(newUser);
});

app.put("/users/:id", async (req: Request, res: Response) => {
    console.log();
});

app.delete("/users/:id", async (req: Request, res: Response) => {
    console.log();
});

const dbConnection = async () => {
    let dbCon = false;

    while (!dbCon) {
        try {
            console.log("Connecting to database");
            await mongoose.connect("mongodb://admin:verysecretpassword@localhost:27017/database?authSource=admin");
            dbCon = true;
            console.log("Connection successful");
        } catch (e) {
            console.log("Connection failed. Trying to reconnect in 3 seconds");
            await new Promise((resolve) => setTimeout(resolve, 3000));
        }
    }
};

const start = async () => {
    try {
        await dbConnection();
        app.listen(12250, () => {
            console.log("Merry Christmas!");
        });
    } catch (e) {
        console.log(e);
    }
};

start().then();
