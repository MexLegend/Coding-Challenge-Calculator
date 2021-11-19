import { CalculatorInfo, CalculatorState } from "../../interfaces/appIniterfaces";
import { Types } from "../types";

type CalculatorAction =
    | { type: Types.CALCULATOR_ANNUAL_SAVINGS, payload: number }
    | { type: Types.CALCULATOR_COST_FOOD_SAVINGS, payload: number }
    | { type: Types.CALCULATOR_FULL_TIME_EMPLOYES, payload: number }
    | { type: Types.CALCULATOR_INFO_LOADED, payload: { calculator: CalculatorInfo } }
    | { type: Types.CALCULATOR_MONTHLY_INGREDIENT_SPENDING, payload: number }

const initialState: CalculatorState = {
    annualSavingsValue: 1340,
    calculator: {
        description: '',
        title: ''
    },
    costFoodSavingsValue: 3,
    fullTimeEmployes: 1,
    loading: true,
    monthlyIngredientSpending: 10
}

export const CalculatorReducer = (state: CalculatorState = initialState, action: CalculatorAction): CalculatorState => {

    switch (action.type) {

        case "CALCULATOR_ANNUAL_SAVINGS":
            return {
                ...state,
                annualSavingsValue: action.payload
            }

        case "CALCULATOR_COST_FOOD_SAVINGS":
            return {
                ...state,
                costFoodSavingsValue: action.payload
            }
        
        case "CALCULATOR_FULL_TIME_EMPLOYES":
            return {
                ...state,
                fullTimeEmployes: action.payload
            }

        case "CALCULATOR_INFO_LOADED":
            return {
                ...state,
                calculator: action.payload.calculator,
                loading: false
            }
        
        case "CALCULATOR_MONTHLY_INGREDIENT_SPENDING":
            return {
                ...state,
                monthlyIngredientSpending: action.payload
            }

        default:
            return state;
    }
}