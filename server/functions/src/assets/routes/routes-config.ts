import { Application } from "express";
import * as userCtrl from "../controllers/userCtrl";
import * as productCtrl from "../controllers/productCtrl";
import * as listCtrl from "../controllers/listCtrl";

export function routesConfig(app: Application) {
  app.get("/", (req, res) => {
    res.send(200).send(" Hello from firebase");
  });

  // User
  app.get("/users", userCtrl.all);
  app.get("/user/:id", userCtrl.get);
  app.delete("/user/:id", userCtrl.remove);
  app.post("/user", userCtrl.create);
  app.put("/user/:id", userCtrl.update);
  app.post("/user/signIn", userCtrl.manualSignIn);

  // Product
  app.get("/products", productCtrl.all);
  app.get("/product/:id", productCtrl.get);
  app.delete("/product/:id", productCtrl.remove);
  app.post("/product", productCtrl.create);
  app.put("/product/:id", productCtrl.update);
  app.put("/product/buy/:id", productCtrl.buyProduct);

  // List
  app.get("/lists", listCtrl.all);
  app.get("/list/:id", listCtrl.get);
  app.delete("/list/:id", listCtrl.remove);
  app.post("/list", listCtrl.create);
  app.post("/participate", listCtrl.participate);
  app.put("/list/:id", listCtrl.update);
}
