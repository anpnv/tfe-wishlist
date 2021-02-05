import { Request, Response } from "express";
import * as admin from "firebase-admin";
import { User } from "../models/user";

const _db = admin.firestore();
const _collection = _db.collection("users");

export async function getAll(req: Request, res: Response) {
  try {
    const userQuerySnapshot = await _collection.get();
    let users: User[] = [];
    userQuerySnapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        birthday: doc.data().birthday,
        displayName: doc.data().displayName,
        email: doc.data().email,
        password: doc.data().password,
        token: doc.data().token,
      });
    });

    return res.status(200).send( users );
  } catch (err) {
    return res.status(500);
  }
}
