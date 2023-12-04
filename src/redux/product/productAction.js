import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore"
import { toast } from "react-toastify"
import { db } from "../../firebase-config"
import { setProductList } from "./productSlice"



// CRUD
export const addOrUpdateProductAction = ({ slug, ...rest }) => async dispatch => {
    try {
        // If I have merge: true, this will update if slug exists
        const productPromise = setDoc(doc(db, "product", slug), rest, {
            merge: true
        })
        toast.promise(productPromise, {
            pending: "In Progress..."
        })
        await productPromise;
        toast.success("Successfully Created")
        // Once DB is updated, fetch the latest from DB and set it on our redux store
        dispatch(getAllProductAction())
    } catch (e) {
        console.log(e)
        toast.error(`Something went wrong ${e.message}`)
    }
}

// Grab latest Product from DB and put it in store
export const getAllProductAction = () => async dispatch => {
    try {
        const querySnapShot = await getDocs(collection(db, "product"))
        const productList = [];
        querySnapShot.forEach(doc => {
            const slug = doc.id;
            const data = doc.data();
            productList.push({
                ...data,
                slug
            })
        })
        dispatch(setProductList(productList))
    } catch (e) {
        console.log(e)
        toast.error(`Something went wrong ${e.message}`)
    }
}

export const deleteProductAction = (slug) => async dispatch => {
    try {
        const deletePromise = deleteDoc(doc(db, "product", slug));
        toast.promise(deletePromise, {
            pending: "In Progress"
        })
        await deletePromise;
        dispatch(getAllProductAction())

    } catch (e) {
        console.log(e)
        toast.error(`Something went wrong ${e.message}`)
    }

}