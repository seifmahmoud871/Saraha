import express from "express"
import dotenv from "dotenv"
import initApp from "./src/app.router.js"
// import sendEmail from "./utils/sendEmail.js";

dotenv.config();
const app = express()
const port = 5000
// sendEmail();
initApp(app,express);
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))