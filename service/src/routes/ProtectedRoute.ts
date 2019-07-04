import { Router, Response } from "express";
import IRequest from "../utils/IRequest";

const router = Router();

router.route("/")
    .all((req: IRequest, res: Response) => {
        res.status(200).json({ message: `You reached the protected zone! ${req.user!.UserName}` });
    });

export default router;