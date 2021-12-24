import { createProxyServer } from "http-proxy"
import { readFileSync } from "fs"
import express, { Request, Response, NextFunction, Application } from "express"
import { createServer } from "http"


// process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'


const proxy = createProxyServer();
const proxyConfig = {
    target: "http://127.0.0.1:5000",
    forward: "http://127.0.0.1:5050",
    // agent:{},
    ssl: {
        key: readFileSync("key.pem"),
        cert: readFileSync("cert.pem")
    },
    // ws:true,
    xfwd: true,
    // secure: true,
    toProxy: false,
    changeOrigin: true
};

const app: Application = express();

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log("request for the proxy server!", req.hostname);
    next();
});

app.all("/", (req: Request, res: Response) => {
    res.json({ "server": "proxy", "host": req.headers.host });
})

app.all("/proxy", (req: Request, res: Response) => {
    console.log("/proxy api called from the proxy server!");
    proxy.web(req, res, proxyConfig)
});


const server = createServer(
    // {
    //     key: readFileSync("key.pem"),
    //     cert: readFileSync("cert.pem")
    // },
    app
);


server.listen("5050", () => { console.log("proxy server running on localhost:5050") });

console.log("hello typescript from proxy")!