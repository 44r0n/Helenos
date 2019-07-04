import { Repository } from "typeorm";
import User from "../entity/User";
import { Request, Response, NextFunction } from "express";
import moment from "moment";
import jwt from "jwt-simple";
import Token from "../entity/Token";

export class UserController {

    private readonly repository: Repository<User>;

    public constructor(userRepository: Repository<User>) {
        this.repository = userRepository;
    }

    public async Authenticate(req: Request, res: Response, next: NextFunction) {
        const token = req.header("Authorization");
        if (token === undefined) {
            res.status(401).json({ message: "No token provided."});
            return;
        }

        try {
            const tokenSplit = token.split(" ");
            if (tokenSplit.length !== 2) {
                res.status(401).json({ message: "Bad token format." });
                return;
            }

            if (tokenSplit[0] !== "Bearer") {
                res.status(401).json({ message: "Bad token type."});
                return;
            }

            const tokenobj: Token = jwt.decode(tokenSplit[1], process.env.JWT_SECRET);
            const foundUser = await this.repository.findOne({ Id: tokenobj.User });

            if (foundUser === null || foundUser === undefined) {
                res.json(404).json({ message: 'User in the token not found.'});
                return;
            }

            req.user = foundUser;
            next();
        } catch(err) {
            res.status(500).json({ message: `Internal server error: ${err}`});
            return;
        }
    }

    public async Register(req: Request, res: Response) {
        try {
            const errors: string[] = this.checkUserRequest(req.body);
            if (errors.length !== 0) {
                res.status(400).json({ message: errors.toString()});
                return;
            }

            if (await this.repository.findOne({ UserName: req.body.UserName }) !== undefined){
                res.status(400).json({ message: 'User name already in use'});
                return;
            }

            const user = this.repository.create(req.body);
            await this.repository.save(user);
            
            res.status(201).json({user: user.Id});
        } catch (error) {
            console.error(`Error registering user: ${error}`);
            res.status(500).json(error);
        }
    }

    public async Login(req: Request, res: Response) {
        try {
            const errors: string[] = this.checkUserRequest(req.body);
            if (errors.length !== 0) {
                res.status(400).json({ message: errors.toString()});
                return;
            }

            const foundUser = await this.repository.findOne({ UserName: req.body.UserName });
            if(foundUser === null || foundUser === undefined) {
                return false;
            }

            const success = await foundUser.ComparePassword(req.body.Password);
            if (success === false) {
                return res.status(401).json({ "message": "Invalid credentials" });
            }

            return res.status(200).json(this.genToken(foundUser));
        } catch (error) {
            console.error(`Error loging in: ${error}`);
            return res.status(500);
        }
	}

    private checkUserRequest = (body: any): string[] => {
        const errors: string[] = [];
        if (body.UserName === undefined) {
            errors.push('UserName cannot be empty');
        }

        if(body.Password === undefined) {
            errors.push('Password cannot be emty');
        }

        return errors;
    }

    private genToken = (user: User): Token => {
        const validDays: number =  Number(process.env.EXPIRE_TOKEN_TIME) || 7;
        const expires = moment().utc().add({ days: validDays }).unix();
        const token = jwt.encode({
            exp: expires,
            User: user.Id,
        }, process.env.JWT_SECRET);

        return {
            Token: "Bearer " + token,
            Expires: moment.unix(expires).format(),
            User: user.Id
        };
    }
}