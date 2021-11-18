import { Dispatch } from "redux";

import { URI } from "../../api/api";
import { CalculatorState } from "../../interfaces/appIniterfaces";
import { Types } from "../types"

const annualSavingsValue = (value: number) => ({
    type: Types.CALCULATOR_ANNUAL_SAVINGS,
    payload: value
});

const infoLoaded = (data: CalculatorState) => ({
    type: Types.CALCULATOR_INFO_LOADED,
    payload: data
});

const infoStartLoading = () => {
    return async (dispatch: Dispatch) => {
        try {
            const resp = await fetch(`${ URI }/page2.json`);
            const data: CalculatorState = await resp.json();

            // console.log(data);
            
    
            dispatch(infoLoaded(data));
        } catch (error) {
            console.log(error)
        }
    }
}

const calculateAnnualSavings = (fullTimeEmployes: number, monthlyIngredientSpending: number) => {
    return(dispatch: Dispatch) => {
        dispatch(annualSavingsValue(((fullTimeEmployes * 1337) +  monthlyIngredientSpending)));
    }
}

const calculateCostFoodSavings = (monthlyIngredientSpending: number) => {
    return(dispatch: Dispatch) => {
        dispatch(costFoodSavingsValue(monthlyIngredientSpending * 0.3));
    }
}

const costFoodSavingsValue = (value: number) => ({
    type: Types.CALCULATOR_COST_FOOD_SAVINGS,
    payload: value
});

export {
    calculateAnnualSavings,
    calculateCostFoodSavings,
    infoStartLoading
}