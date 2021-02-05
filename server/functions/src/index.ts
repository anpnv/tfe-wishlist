import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";

admin.initializeApp(functions.config().firebase);

import * as cors from "cors";
import * as bodyParser from "body-parser";
import { routesConfig } from "./assets/routes/routes-config";



const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: true }));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    next();
});

routesConfig(app);

export const api = functions.region("europe-west1").https.onRequest(app);
