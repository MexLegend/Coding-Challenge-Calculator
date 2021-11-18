import { CalculatorInfo, CalculatorState } from "../../interfaces/appIniterfaces";
import { Types } from "../types";

type CalculatorAction = 
    | { type: Types.CALCULATOR_ANNUAL_SAVINGS, payload: number }
    | { type: Types.CALCULATOR_COST_FOOD_SAVINGS, payload: number }
    | { type: Types.CALCULATOR_INFO_LOADED, payload: { calculator: CalculatorInfo } }

const initialState: CalculatorState = {
    annualSavingsValue: 0,
    calculator: {
        description: '',
        title: ''
    },
    costFoodSavingsValue: 0
}

export const CalculatorReducer = ( state: CalculatorState = initialState, action: CalculatorAction ): CalculatorState => {

    switch ( action.type ) {
        
        case "CALCULATOR_ANNUAL_SAVINGS":
            return {
                ...state,
                annualSavingsValue: action.payload
            }

        case "CALCULATOR_INFO_LOADED":
            return {
                ...state,
                calculator: action.payload.calculator
            }

        case "CALCULATOR_COST_FOOD_SAVINGS":
            return {
                ...state,
                costFoodSavingsValue: action.payload
            }

        default:
            return state;
    }
}