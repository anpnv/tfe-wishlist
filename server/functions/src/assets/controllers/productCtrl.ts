import { Request, Response } from "express";
import * as admin from "firebase-admin";
import { Product } from "../models/product";

const _db = admin.firestore();

const _collection = _db.collection("products");

export async function all(req: Request, res: Response) {
  try {
    const userQuerySnapshot = await _collection.get();
    let products: Product[] = [];
    userQuerySnapshot.forEach((doc) => {
      const { details, name, price, url, photoUrl } = doc.data();
      products.push({
        id: doc.id,
        details: details,
        name: name,
        price: price,
        url: url,
        photoUrl: photoUrl,
      });
    });
    return res.status(200).send(products);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function create(req: Request, res: Response) {
  try {
    const { details, name, price, url, photoUrl } = req.body;
    const newProduct = {
      details: details,
      name: name,
      price: price,
      url: url,
      photoUrl: photoUrl  
    };
    await _collection.add(newProduct).then((doc) => {
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
    const { details, name, price, url, photoUrl } = req.body;
    let product = await _collection.doc(id).set(
      {
        details: details,
        name: name,
        price: price,
        url: url,
        photoUrl: photoUrl
      },
      { merge: true }
    );

    return res.status(204).send(product);
  } catch (err) {
    return handleError(res, err);
  }
}

export async function get(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const product = (await (await _collection.doc(id).get()).data()) as Product;
    return res.status(200).send(product);
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
