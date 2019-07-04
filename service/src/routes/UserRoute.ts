import { Request, Response, Router } from "express";
import { createConnection } from "typeorm";
import { UserController } from "../controllers/UserController";
import User from "../entity/User";

const router = Router();

createConnection().then(connection => {
    const userController = new UserController(connection.getRepository(User));

    router.route("/register")
        .post((req: Request, res: Response) => {
            userController.Register(req,res);
        });

    router.route("/login")
        .post((req: Request, res: Response) => {
            userController.Login(req,res);
        });

}).catch(err => console.error(`Could not create connection for users: ${err}`));

export default router;