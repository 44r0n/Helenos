import { Router, Request, Response } from "express";

const router = Router();

router.route("/")
    .all((req: Request, res: Response) => {
        res.status(200).json({ message: `You reached the protected zone! ${req.user.UserName}` });
    },);

export default router;