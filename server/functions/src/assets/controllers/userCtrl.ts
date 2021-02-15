import { Request, Response } from "express";
import * as admin from "firebase-admin";

import { User } from "../models/user";

const _db = admin.firestore();
const _collection = _db.collection("users");

export async function all(req: Request, res: Response) {
  try {
    const userQuerySnapshot = await _collection.get();
    let users: User[] = [];
    userQuerySnapshot.forEach((doc) => {
      const { birthday, displayName, email, password, token } = doc.data();
      users.push({
        id: doc.id,
        birthday: birthday,
        displayName: displayName,
        email: email,
        password: password,
        token: token,
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

export async function update(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { displayName, password, email, token, birthday } = req.body;
    let user = await _collection.doc(id).set(
      {
        birthday: birthday,
        displayName: displayName,
        email: email,
        password: password,
        token: token,
      },
      { merge: true }
    );

    return res.status(204).send(user);
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

export async function getUserByEmail(req: Request, res: Response) {
  try {
    const { email } = req.params;
    const id = (await admin.auth().getUserByEmail(email)).uid;
    const user = (await (await _collection.doc(id).get()).data()) as User;
    return res.status(200).send(user);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function remove(req: Request, res: Response) {
  const { id } = req.params;
  if ((await _collection.doc(id).get()).exists) {
    return await _collection
      .doc(id)
      .delete()
      .finally(() => res.status(204).send(true));
  } else {
    return res.status(500).send(false);
  }
}

function handleError(res: Response, err: any) {
  return res.status(500).send({ message: `${err.code} - ${err.message}` });
}

// Inscription

export async function signUp(req: Request, res: Response) {
  const { email, password } = req.body;
  admin
    .auth()
    .createUser({
      email: email,
      emailVerified: false,
      password: password,
    })
    .then((user) => {
      _collection.doc(user.uid).set({
        email: user.email,
        id: user.uid,
      });
      return res.status(200).send(user);
    })
    .catch((err) => {
      return handleError(res, err);
    });
}
