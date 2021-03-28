import { Application } from "express";
import * as userCtrl from "../controllers/userCtrl";
import * as productCtrl from "../controllers/productCtrl";
import * as listCtrl from "../controllers/listCtrl";

export function routesConfig(app: Application) {
  app.get("/", (req, res) => {
    res.send(200).send(" Hello from firebase");
  });

  // User
  app.get("/user/:uid", userCtrl.get);
  app.get("/user/getByUid/:uid", userCtrl.getUserById);
  app.delete("/user/:id", userCtrl.remove);
  app.put("/user/:id", userCtrl.update);
  app.post("/user/signUp", userCtrl.signUp);
  app.post("/user/signUpProvider", userCtrl.signUpWithProvider);

  // Product
  app.get("/products", productCtrl.all);
  app.get("/product/:id", productCtrl.get);
  app.delete("/product/:id", productCtrl.remove);
  app.post("/product", productCtrl.create);
  app.put("/product/:id", productCtrl.update);

  // List
  app.get("/lists", listCtrl.all);
  app.get("/list/:id", listCtrl.get);
  app.delete("/list/:id", listCtrl.remove);
  app.post("/list", listCtrl.create);
  app.post("/participate", listCtrl.participate);
  app.put("/list/:id", listCtrl.update);
  app.put("/list/addProduct/:id", listCtrl.addProduct);
  app.put("/list/removeProduct/:id", listCtrl.removeProduct);
  

  app.post('participatePot', listCtrl.participateToPot);
}
