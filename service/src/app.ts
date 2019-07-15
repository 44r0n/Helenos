import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
import { getConnection } from "typeorm";
import routes from "./routes";
import { UserController } from "./controllers/UserController";
import User from "./entity/User";

const baseUrl: string = process.env.BASE_URL || "/api/v1";

class App {
	public App: express.Application;

	constructor() {
		this.App = express();
		this.config();
	}

	private config() {
		this.App.use(cors());
		this.App.use(bodyParser.json());
		this.App.use(bodyParser.urlencoded({ extended: false }));
		this.App.use(async (req, res, next) => {
			console.log(`${this.nowToString()} - ${req.method}: ${req.url}`);
			await this.authorizeRequest(req, res, next); // This will call next
		});

		// Uses the configured routes
		this.App.use(baseUrl, routes); 

		// If no route is matched, it must be a 404
		this.App.use((req, res, next) => {
			res.status(404).json({ "error": "Endpoint not found" });
			next();
		});		
	}

	private nowToString(): string {
		const date = new Date();
		const day = date.getDate();
		const monthIndex = date.getMonth();
		const year = date.getFullYear();
		const minutes = date.getMinutes();
		const hours = date.getHours();
		const seconds = date.getSeconds();
		return day+"/"+(monthIndex+1)+"/"+year+" "+ hours+":"+minutes+":"+seconds;
	}

	private async authorizeRequest(req: Request, res: Response, next: NextFunction) {
		const connection = await getConnection();
		const userController = new UserController(connection.getRepository(User));
		if (req.path.includes(baseUrl + "/user/login")) { return next(); }
		if (req.path.includes(baseUrl + "/user/register")) { return next(); }
		return await userController.Authenticate(req, res, next);
	}
}

export default new App().App;