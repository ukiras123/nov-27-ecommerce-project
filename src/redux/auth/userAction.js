import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../../firebase-config"
import { doc, setDoc } from "firebase/firestore"
import { toast } from "react-toastify"


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