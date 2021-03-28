import { Request, Response } from "express";
import * as admin from "firebase-admin";

import { User } from "../models/user";

const _db = admin.firestore();
const _collection = _db.collection("users");

export async function update(req: Request, res: Response) {
  try {
    const { uid } = req.params;
    const { displayName, token, birthday, email, password } = req.body;
    admin
      .auth()
      .updateUser(uid, {
        email: email,
        displayName: displayName,
        password: password,
      })
      .then(() => {
        _collection.doc(uid).set(
          {
            birthday: birthday,
            displayName: displayName,
            token: token,
            email: email,
          },
          { merge: true }
        );
      });

    return res.status(202).send(true);
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

export async function getUserById(req: Request, res: Response) {
  try {
    const { uid } = req.params;
    const user = (await _collection.doc(uid).get()).data();
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
      createPrivateList(user.uid).then((doc) => {
        _collection.doc(user.uid).set({
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
          birthday: "",
          privateList: doc.id,
          publicLists: [],
          token: "",
          participations: [],
        });
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
    var user;
    await _collection
      .doc(uid)
      .get()
      .then(async (doc) => {
        if (!doc.exists) {
          await createPrivateList(uid)
            .then((doc) => {
              _collection.doc(uid).set({
                email: email,
                uid: uid,
                displayName: displayName,
                token: "",
                birthday: "",
                privateList: doc.id,
                publicLists: [],
                participations: [],
              });
            })
            .finally(async () => {
              await admin.auth().updateUser(uid, {
                emailVerified: true,
              });
            });
        }
      })
      .finally(async () => {
        const user1 = (await (await _collection.doc(uid).get()).data()) as User;
        return res.status(200).send(user1);
      });

    return res.status(200).send(user);
  } catch (err) {
    return handleError(res, err);
  }
}

async function createPrivateList(uid: string) {
  return await _db
    .collection("lists")
    .add({
      isPublic: false,
      date: null,
      pot: null,
      authorId: uid,
      isEnable: true,
      name: "Ma liste privée",
      products: [],
      participants: null,
      messages: null,
    })
    .then((doc) => {
      doc.set({ id: doc.id }, { merge: true });
      return doc;
    });
}

function handleError(res: Response, err: any) {
  return res.status(500).send({ message: `${err.code} - ${err.message}` });
}
