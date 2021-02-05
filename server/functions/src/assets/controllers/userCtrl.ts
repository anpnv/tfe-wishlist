import { Request, Response } from "express";
import * as admin from "firebase-admin";
import { User } from "../models/user";

const _db = admin.firestore();
_db.settings({ ignoreUndefinedProperties: true });
const _collection = _db.collection("users");

export async function all(req: Request, res: Response) {
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
    return res.status(200).send(users);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function create(req: Request, res: Response) {
  try {
    const { birthday, displayName, email, password, token } = req.body;
    const newUser = {
      birthday: birthday,
      displayName: displayName,
      email: email,
      password: password,
      token: token,
    };
    await _collection.add(newUser).then((doc) => {
      doc.set({ id: doc.id }, { merge: true });
    });

    return res.status(201).send(true);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function get(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = (await (await _collection.doc(id).get()).data()) as User;
    return res.status(200).send(user);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await _collection.doc(id).delete();
    return res.status(204).send({});
  } catch (err) {
    return handleError(res, err);
  }
}

function handleError(res: Response, err: any) {
  return res.status(500).send({ message: `${err.code} - ${err.message}` });
}
