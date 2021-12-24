import { readFileSync } from "fs"
import express, { Request, Response, NextFunction, Application } from "express"
import { createServer } from "http"


const app: Application = express();

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log("request for the application server!", req.hostname);
    next();
});

app.all("/", (req: Request, res: Response) => {
    res.json({ "server": "server", "host": req.headers.host });
})

app.all("/proxy", (req: Request, res: Response) => {
    console.log("/proxy api called from the proxy server!");
    console.log("request for the application server!", req.hostname, req.path);
    console.log(req.headers)
    res.json({ "server": "server", "proxied": true, "headers": req.headers })
});


const server = createServer(
    // {
    //     key: readFileSync("key.pem"),
    //     cert: readFileSync("cert.pem")
    // },
    app
);

server.listen("5000", () => { console.log("application server running on localhost:5000") });



console.log("hello typescript from server!");