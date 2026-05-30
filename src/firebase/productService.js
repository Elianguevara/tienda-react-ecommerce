import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';

const PRODUCT_COLLECTION = 'productos';
const LOCAL_PRODUCTS_KEY = 'productos_local';
const LOCAL_DELETED_KEY = 'productos_deleted';

const getLocalProductsState = async () => {
  const localProducts = JSON.parse(localStorage.getItem(LOCAL_PRODUCTS_KEY) || '[]');
  const deletedIds = JSON.parse(localStorage.getItem(LOCAL_DELETED_KEY) || '[]');

  const response = await fetch('/productos.json');
  const defaultProducts = await response.json();

  const productMap = new Map();
  defaultProducts.forEach((product) => productMap.set(product.id, product));
  localProducts.forEach((product) => productMap.set(product.id, product));

  deletedIds.forEach((id) => productMap.delete(id));

  return Array.from(productMap.values());
};

const saveLocalProducts = (products) => {
  localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(products));
};

const getDeletedIds = () => JSON.parse(localStorage.getItem(LOCAL_DELETED_KEY) || '[]');
const saveDeletedIds = (ids) => localStorage.setItem(LOCAL_DELETED_KEY, JSON.stringify(ids));

export const fetchProducts = async () => {
  if (isFirebaseConfigured) {
    const querySnapshot = await getDocs(collection(db, PRODUCT_COLLECTION));
    return querySnapshot.docs.map((docSnapshot) => ({
      id: docSnapshot.id,
      ...docSnapshot.data(),
    }));
  }

  return getLocalProductsState();
};

export const fetchProductById = async (id) => {
  if (isFirebaseConfigured) {
    const docRef = doc(db, PRODUCT_COLLECTION, id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) {
      return null;
    }
    return { id: snapshot.id, ...snapshot.data() };
  }

  const products = await getLocalProductsState();
  return products.find((product) => product.id === id) || null;
};

export const createProduct = async (product) => {
  if (isFirebaseConfigured) {
    const docRef = await addDoc(collection(db, PRODUCT_COLLECTION), {
      nombre: product.nombre,
      categoria: product.categoria,
      precio: product.precio,
      stock: product.stock,
      imagen: product.imagen,
      descripcion: product.descripcion,
    });
    return { id: docRef.id, ...product };
  }

  const localProducts = JSON.parse(localStorage.getItem(LOCAL_PRODUCTS_KEY) || '[]');
  const updatedProducts = [product, ...localProducts];
  saveLocalProducts(updatedProducts);
  return product;
};

export const updateProduct = async (product) => {
  if (isFirebaseConfigured) {
    const productRef = doc(db, PRODUCT_COLLECTION, product.id);
    await updateDoc(productRef, {
      nombre: product.nombre,
      categoria: product.categoria,
      precio: product.precio,
      stock: product.stock,
      imagen: product.imagen,
      descripcion: product.descripcion,
    });
    return product;
  }

  const localProducts = JSON.parse(localStorage.getItem(LOCAL_PRODUCTS_KEY) || '[]');
  const mergedProducts = localProducts.filter((item) => item.id !== product.id);
  mergedProducts.unshift(product);
  saveLocalProducts(mergedProducts);
  return product;
};

export const deleteProduct = async (id) => {
  if (isFirebaseConfigured) {
    await deleteDoc(doc(db, PRODUCT_COLLECTION, id));
    return;
  }

  const localProducts = JSON.parse(localStorage.getItem(LOCAL_PRODUCTS_KEY) || '[]');
  const filteredLocal = localProducts.filter((item) => item.id !== id);
  saveLocalProducts(filteredLocal);

  const deletedIds = getDeletedIds();
  if (!deletedIds.includes(id)) {
    deletedIds.push(id);
    saveDeletedIds(deletedIds);
  }
};