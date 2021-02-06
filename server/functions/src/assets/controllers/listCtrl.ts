import { Request, Response } from "express";
import * as admin from "firebase-admin";
import { List } from "../models/list";

const _db = admin.firestore();
const _collection = _db.collection("lists");

export async function all(req: Request, res: Response) {
  try {
    const userQuerySnapshot = await _collection.get();
    let lists: List[] = [];
    userQuerySnapshot.forEach((doc) => {
      lists.push({
        id: doc.id,
        isPublic: doc.data().isPublic,
        date: doc.data().date,
        pot: doc.data().pot,
        authorId: doc.data().authorId,
        isEnable: doc.data().isEnable,
        name: doc.data().name,
      });
    });
    return res.status(200).send(lists);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function create(req: Request, res: Response) {
  try {
    const { name, isPublic, date, pot, authorId } = req.body;
    const newList = {
      isPublic: isPublic, 
      date: date,
      pot: pot,
      authorId: authorId,
      isEnable: true,
      name: name,
    };
    await _collection.add(newList).then((doc) => {
      doc.set({ id: doc.id }, { merge: true });
    });
    return res.status(201).send(true);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function participate(req: Request, res: Response) {
  try {
    const { userId, listId } = req.body;
    const newParticipation = {
      userId: userId,
      listId: listId,
    };
    await _db
      .collection("participations")
      .add(newParticipation)
      .then((doc) => {
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
    const { name, isPublic, date, pot, isEnable } = req.body;
    let user = await _collection.doc(id).set(
      {
        isPublic: isPublic,
        date: date,
        pot: pot,
        isEnable: isEnable,
        name: name,
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
    const list = (await (await _collection.doc(id).get()).data()) as List;
    return res.status(200).send(list);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await _collection.doc(id).delete();
    return res.status(204).send(true);
  } catch (err) {
    return handleError(res, err);
  }
}

function handleError(res: Response, err: any) {
  return res.status(500).send({ message: `${err.code} - ${err.message}` });
}
