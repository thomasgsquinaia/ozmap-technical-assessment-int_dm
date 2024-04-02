import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import router from "./routes/router";
class App {
  public app: Application;

  constructor() {
    const app = express();
    this.app = app;
    this.middlewares();
    this.routes();
  }

  public middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  public routes() {
    this.app.use("/", router);
  }

  public init() {
    const PORT: string | number = process.env.PORT || 3001;
    this.app.listen(PORT, () =>
      console.log(`Server is running at http://localhost:${PORT}.`)
    );
  }
}

export { App };