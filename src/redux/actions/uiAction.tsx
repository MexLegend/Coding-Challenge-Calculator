import { Dispatch } from "redux";

import { URI } from "../../api/api";
import { UiState } from "../../interfaces/appIniterfaces";
import { Types } from "../types"

const uiMenuLoaded = (data: UiState) => ({
    type: Types.UI_MENU_LOADED,
    payload: data
});

const uiMenuStartLoading = () => {
    return async (dispatch: Dispatch) => {
        try {
            const resp = await fetch(`${ URI }/app.json`);
            const data: UiState = await resp.json();
    
            dispatch(uiMenuLoaded(data));
        } catch (error) {
            console.log(error)
        }
    }
}

export {
    uiMenuStartLoading
}