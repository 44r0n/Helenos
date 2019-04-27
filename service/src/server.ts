import express from "express";
import User from "./entity/User";
import { getConnection, createConnection } from "typeorm";

// const app: express.Application = express();

// app.get('/', (req, res) => {
//     res.send('Hello World!');
//     console.log("GET: '/'")
// });

// app.listen(3000, () => {
//     console.log("Listening on port 3000");
// });

async function testInserUser() {
    const connection = await createConnection();
    const user = new User();
    user.UserName = "Pepe";
    user.Password = "Contra";
    const repository = connection.getRepository(User);
    await repository.save(user);
    console.log('Saved');
}

console.log('Launching');
testInserUser();
console.log('Lanuched');