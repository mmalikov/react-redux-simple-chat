import {useContext} from "react";
import {FirebaseContext} from "../contexts/firebaseContext";
import {useAuthState} from "react-firebase-hooks/auth";

export const useAuthorizedUser = () => {
    const {auth} = useContext(FirebaseContext);
    const [user] = useAuthState(auth);

    return user;
};