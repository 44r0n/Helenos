import { Request } from "express";
import User from "../entity/User";

interface IRequest extends Request {
    user?: User;
}

export default IRequest;