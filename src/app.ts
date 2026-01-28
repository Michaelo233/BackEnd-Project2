import express, { Express } from "express";
import morgan from "morgan";

const app: Express = express();

// Use Morgan for HTTP request logging
app.use(morgan("combined"));

app.use(express.json());

// Export the app
export default app;