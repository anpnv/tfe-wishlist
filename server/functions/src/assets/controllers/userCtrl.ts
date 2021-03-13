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
      const { birthday, displayName, email, token } = doc.data();
      users.push({
        uid: doc.id,
        birthday: birthday,
        displayName: displayName,
        email: email,
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
    const { birthday, displayName, email, token } = req.body;
    const newUser = {
      birthday: birthday,
      displayName: displayName,
      email: email,
      token: token,
    };
    await _collection.add(newUser).then((doc) => {
      doc.set({ uid: doc.id }, { merge: true });
    });

    return res.status(201).send(true);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function update(req: Request, res: Response) {
  try {
    const { uid } = req.params;
    const { displayName, email, token, birthday } = req.body;
    let user = await _collection.doc(uid).set(
      {
        birthday: birthday,
        displayName: displayName,
        email: email,
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
    const { uid } = req.params;
    const user = (await (await _collection.doc(uid).get()).data()) as User;
    return res.status(200).send(user);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function getUserByEmail(req: Request, res: Response) {
  try {
    const { email } = req.params;
    const uid = (await admin.auth().getUserByEmail(email)).uid;
    const user = (await (await _collection.doc(uid).get()).data()) as User;
    return res.status(200).send(user);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function remove(req: Request, res: Response) {
  const { uid } = req.params;
  if ((await _collection.doc(uid).get()).exists) {
    return await _collection
      .doc(uid)
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
  const { email, password, displayName } = req.body;
  admin
    .auth()
    .createUser({
      email: email,
      emailVerified: false,
      displayName: displayName,
      password: password,
    })
    .then((user) => {
      _collection.doc(user.uid).set({
        email: user.email,
        uid: user.uid,
        displayName: user.displayName,
      });
      return res.status(201).send(user);
    })
    .catch((err) => {
      return handleError(res, err);
    });
}

export async function signUpWithProvider(req: Request, res: Response) {
  try {
    const { email, displayName, uid } = req.body;
    await _collection
      .doc(uid)
      .get()
      .then(async (doc) => {
        if (!doc.exists) {
          const user = _collection.doc(uid).set({
            email: email,
            uid: uid,
            displayName: displayName,
            token: "",
            birthday: "",
          });
          return res.status(201).send(user);
        } else {
          return  res.status(200).send(doc);
        }
      });

      return res.status(200);
    
  } catch (err) {
    return handleError(res, err);
  }
}
