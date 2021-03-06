import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import * as ChatActions from '../actions';

export const useChatActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(ChatActions, dispatch);
};
