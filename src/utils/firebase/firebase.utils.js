import { initializeApp } from "firebase/app"; // Came after we create the project in the firebase

//For using the authentication provided by firebase
import {
    getAuth,
    signInWithPopup,
    signInWithRedirect,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";

// For using the firestore/Database provided by firebase
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
} from "firebase/firestore";

// Came after we create the project in the firebase
const firebaseConfig = {
    apiKey: "AIzaSyCgvqgW6PZd3p8SOeCxv7EtKyfgTwMVeFE",
    authDomain: "react-clothing-db-524af.firebaseapp.com",
    projectId: "react-clothing-db-524af",
    storageBucket: "react-clothing-db-524af.appspot.com",
    messagingSenderId: "925109488579",
    appId: "1:925109488579:web:6754f8a0aa213435984b76",
};

// Came after we create the project in the firebase
const app = initializeApp(firebaseConfig);

// For authentication
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth(app);
export const signInWithGooglePopup = () => {
    return signInWithPopup(auth, googleProvider);
};
export const signInWithGoogleRedirect = () => {
    return signInWithRedirect(auth, googleProvider);
};

/*
  In firestore database there is hierarchy
  Collection -> Documents -> Data

  Shoes                               //COLLECTION
  
    AdidasNMD                           //DOCUMENT
      name: "NMD"                         --------
      brand: "Adidas"                             |
      imageURL: "www.imageurl.com"                |-- //DATA
      cost:                                       |
        price: 220                                |
        currency: "USD"                   --------
    
    NikeAirMax                          //DOCUMENT
      name: "Air Max"
      brand: "Nike"
      imageURL: "www.imageurl.com"
      cost:
        price: 150
        currency: "USD"
    
*/

// For database
export const db = getFirestore();

// This is actually used for creating collection and documents in the database for storing the data related to our website
export const addCollectionAndDocuments = async (
    collectionKey,
    objectsToAdd
) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log("done");
};

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, "categories");
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);

    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data();

        acc[title.toLowerCase()] = items;

        return acc;
    }, {});

    return categoryMap;
};

// This part is used for creating a user in the database which are authenticated
export const createUserDocumentFromAuth = async (
    userAuth,
    aditionalInformation
) => {
    // For creating a collection named users
    const userDocRef = doc(db, "users", userAuth.uid);

    // Getting document from the collection by using getDoc
    const userSnapshot = await getDoc(userDocRef);

    //Checking if that document exists or not
    //If document not exists then create the document
    if (!userSnapshot.exists()) {
        //Getting data from the currently authenticated user
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        // Setting Up the document in the collection by using setDoc
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...aditionalInformation,
            });
        } catch (error) {
            console.log(
                "Error occured during creating the user",
                error.message
            );
        }
    }
    // If document exists then return
    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email && !password) {
        return;
    }

    return await createUserWithEmailAndPassword(auth, email, password);
};

// Experimental

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email && !password) {
        return;
    }

    return await signInWithEmailAndPassword(auth, email, password);
    // .then((userCredential) => {
    //   const user = userCredential.user;
    //   console.log(user);
    // })
    // .catch((error) => {
    //   const errorCode = error.code;
    //   const errorMssg = error.message;
    //   console.log(errorCode, errorMssg);
    // })
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListner = (callback) => {
    onAuthStateChanged(auth, callback);
};
