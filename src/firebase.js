import firebase from 'firebase';
import {
  FireSQL
} from 'firesql';

const firebaseConfig = {
  apiKey: "AIzaSyArIbQuDamurWV2VMqkC5anQ9DkZ3wtlrA",
  authDomain: "cranberry-nurlandadashov.firebaseapp.com",
  projectId: "cranberry-nurlandadashov",
  storageBucket: "cranberry-nurlandadashov.appspot.com",
  messagingSenderId: "535035976796",
  appId: "1:535035976796:web:2fb32dcc2fc8c286b15a99",
  measurementId: "G-QNEHQSEHG2"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebaseApp.storage();

var fireSQL = new FireSQL(db);

const addProduct = (product) => {
  const id = db.collection("products").doc().id;
  db.collection("products").doc(id).set({
    ...product,
    id
  });
}

const get = async (collection, field = "", operator = "", criteria = "") => {
  let snapshot;
  if (field.length === 0) {
    snapshot = await db.collection(collection).get();
  } else {
    snapshot = await db.collection(collection).where(field, operator, criteria).get();
  }

  return snapshot.docs.map(doc => {
    return {
      ...doc.data()
    }
  });
}

const getOrdered = async (collection, field = "", direction = "") => {
  let snapshot = await db.collection(collection).orderBy(field, direction).get();
  
  return snapshot.docs.map(doc => {
    return {
      ...doc.data()
    }
  });
}

const getById = async (collection, id) => {
  const doc = await db.collection(collection).doc(id).get();
  return {
    ...doc.data(),
    id: doc.id
  };
}

const getSorted = async (collection, field, direction) => {
  const snapshot = await db.collection(collection).orderBy(field, direction).get();
  return snapshot.docs.map(doc => doc.data());
}

const updateProduct = (id, product) => {
  return db.collection("products").doc(id).set(product);
}

const uploadPhoto = async (productId, file, fileName, mainPhotoUrl) => {

  await storage.ref(productId).child(fileName).put(file);

  const url = await storage.ref(productId).child(fileName).getDownloadURL();

  if (mainPhotoUrl.length === 0) {
    await db.collection("products").doc(productId).update({
      "photoUrls": firebase.firestore.FieldValue.arrayUnion(url),
      "mainPhotoUrl": url
    });
  } else {
    await db.collection("products").doc(productId).update({
      "photoUrls": firebase.firestore.FieldValue.arrayUnion(url)
    });
  }
}

const deletePhoto = async (productId, url, mainPhotoUrl) => {
  await storage.refFromURL(url).delete();

  if (url === mainPhotoUrl) {
    await db.collection("products").doc(productId).update({
      "photoUrls": firebase.firestore.FieldValue.arrayRemove(url),
      "mainPhotoUrl": ""
    });
  } else {
    await db.collection("products").doc(productId).update({
      "photoUrls": firebase.firestore.FieldValue.arrayRemove(url)
    });
  }
}

const set = async (collection, productId, obj) => {
  await db.collection(collection).doc(productId).update(obj);
}

const deleteDocument = async (collection, id) => {
  if (collection === "products") {
    const doc = await getById(collection, id);
    doc.photoUrls.map((url) => {
      storage.refFromURL(url).delete();
    })
  };
  await db.collection(collection).doc(id).delete();
}

const createUser = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password)
}

const login = async (email, password) => {
  try {
    var userCredential = await auth.signInWithEmailAndPassword(email, password);
    var user = userCredential.user;
    if(user.emailVerified) {
      console.log("verified");
      return user;
    }
    else {
      alert("Please verify your email address");
    }
  }
  catch(error) {
    alert(error.message);
  }
  
  
  return null;
}

const getTimeStamp = () => {
  return firebase.firestore.FieldValue.serverTimestamp();
}

export {
  db,
  auth,
  addProduct,
  get,
  getSorted,
  updateProduct,
  uploadPhoto,
  getById,
  deletePhoto,
  set,
  deleteDocument,
  fireSQL,
  createUser,
  login,
  getTimeStamp,
  getOrdered
};