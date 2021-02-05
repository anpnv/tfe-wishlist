import { Application } from "express";
import { getAll } from "../controllers/userCtrl";

export function routesConfig(app: Application) {
  app.get("/users", getAll);
}
