import { Application } from "express";
import { all, get, remove, create } from "../controllers/userCtrl";

export function routesConfig(app: Application) {
  app.get("/", (req, res) => {
    res.send(204).send("🔥 firebase 🔥");
  });

  // User

  app.get("/usr", all);
  app.get("/usr/:id", get);
  app.delete("/usr/:id", remove);
  app.post("/usr", create);
}
