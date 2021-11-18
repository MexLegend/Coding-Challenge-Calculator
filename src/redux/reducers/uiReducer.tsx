import { MenuItems, UiState } from "../../interfaces/appIniterfaces";
import { Types } from "../types";

type UiAction = 
    | { type: Types.UI_MENU_LOADED, payload: { menu: MenuItems } }

const initialState: UiState = {
    menu: {
        items: []
    }
}

export const UiReducer = ( state: UiState = initialState, action: UiAction ): UiState => {

    switch ( action.type ) {
        
        case "UI_MENU_LOADED":
            return {
                ...state,
                menu: action.payload.menu
            }

        default:
            return state;
    }
}