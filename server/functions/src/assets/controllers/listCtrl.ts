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
        messages: doc.data().name,
        products: doc.data().products,
      });
    });
    return res.status(200).send(lists);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function participateToPot(req: Request, res: Response) {
  try {
    const { id, pot } = req.body;
    _collection.doc(id).set({
      pot: pot
    }, {merge: true})
    return res.status(202).send(true);
  } catch (err) {
    return handleError(res, err);
  }
}



export async function create(req: Request, res: Response) {
  try {
    const { name, date, authorId } = req.body;
    const newList = {
      isPublic: true,
      date: date,
      pot: 0,
      authorId: authorId,
      isEnable: true,
      name: name,
      products: [],
      messages: [],
    };
    await _collection.add(newList).then(async(doc) => {
      await doc.set({ id: doc.id }, { merge: true });
      await doc.get().then(async elem => {
        return await res.status(201).send(elem.data());
      })
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
    const { name, date } = req.body;
    await _collection.doc(id).set(
      {
        date: date,
        name: name,
      },
      { merge: true }
    );
    return res.status(202).send(true);
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
