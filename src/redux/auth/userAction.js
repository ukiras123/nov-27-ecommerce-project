import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../../firebase-config"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { toast } from "react-toastify"
import { setUser } from "./userSlice"


export const createAdminUser = (userInfo, navigate) => async (dispatch) => {
    try {
        console.log("User info to send to firebase", userInfo)
        // 1. Send data to Auth
        const { user } = await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)

        // 2. Send the data to DB
        const { password, confirmPassword, ...rest } = userInfo;
        await setDoc(doc(db, "users", user.uid), rest)
        toast.success("User SignUp Successful!")
        // Navigate to login
        navigate("/login");
    } catch (e) {
        console.log("error", e)
        if (e.message.includes("auth/email-already-in-use")) {
            navigate("/login");
            toast.error(`You already have an account, please login.`)
        } else {
            toast.error(`Something went wrong. ${e.message}`)
        }

    }
}

export const loginAdminUser = (email, password) => async (dispatch) => {
    try {
        // Check with auth, if email/pass login is valid
        const authSnap = signInWithEmailAndPassword(auth, email, password);
        toast.promise(authSnap, {
            pending: "In Progress..."
        })
        const { user } = await authSnap;
        // If login is success, then query firebase DB to get user info
        // and put that in our redux store
        dispatch(getUserInfo(user.uid))
    } catch (e) {
        console.log("error", e)
        toast.error(`Something went wrong. ${e.message}`)
    }
}

export const resetPassword = (email) => async (dispatch) => {
    try {
        // Check with auth, if email/pass login is valid
        const resPromise = sendPasswordResetEmail(auth, email);
        toast.promise(resPromise, {
            pending: "In Progress..."
        })
        await resPromise;
        toast.success(`Reset Email sent success!`)
    } catch (e) {
        console.log("error", e)
        toast.error(`Something went wrong. ${e.message}`)
    }
}

export const getUserInfo = (uid) => async (dispatch) => {
    try {
        const userSnap = await getDoc(doc(db, "users", uid));
        if (userSnap.exists()) {
            const userData = userSnap.data();
            const userInfo = { ...userData, uid }
            // I will put this in our store
            dispatch(setUser(userInfo))
        }
    } catch (e) {
        console.log("error", e)
        toast.error(`Something went wrong. ${e.message}`)
    }
}