import {Dispatch} from "redux";
import {UsersAction, UsersActionType} from "../types/store";
import {firebaseContextValue} from "../../../contexts/firebase-context";
import {User} from "../../types/user";
import * as h from 'history';
import {paths} from "../../../routes";

export const registerUser = (email: string, password: string, history: h.History) => {
    return async (dispatch: Dispatch<UsersAction>) => {
        try {
            dispatch({type: UsersActionType.REGISTER_USER});
            const {user} = await firebaseContextValue.auth.createUserWithEmailAndPassword(email, password);
            const userPayload: User = {
                id: user?.uid as string,
                name: user?.displayName as string,
                email: user?.email as string,
                avatarUrl: user?.photoURL as string
            }

            await dispatch({type: UsersActionType.REGISTER_USER_SUCCESSFUL, payload: userPayload});
            history.push(paths.chat);
        } catch (e) {
            dispatch({type: UsersActionType.REGISTER_USER_ERROR, payload: e.message,});
        }
    }
};

export const loginUser = (email: string, password: string, history: h.History) => {
    return async (dispatch: Dispatch<UsersAction>) => {
        try {
            dispatch({type: UsersActionType.LOGIN_USER});
            const {user} = await firebaseContextValue.auth.signInWithEmailAndPassword(email, password);
            const userPayload: User = {
                id: user?.uid as string,
                name: user?.displayName as string,
                email: user?.email as string,
                avatarUrl: user?.photoURL as string
            }

            await dispatch({type: UsersActionType.LOGIN_USER_SUCCESSFUL, payload: userPayload});
            history.push(paths.chat);
        } catch (e) {
            dispatch({type: UsersActionType.LOGIN_USER_ERROR, payload: e.message,});
        }
    }
};