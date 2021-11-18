import { combineReducers } from "redux";

import { CalculatorReducer } from "./calculatorReducer";
import { TestimonialReducer } from './testimonialReducer';
import { UiReducer } from "./uiReducer";

const rootReducer = combineReducers({
    CALCULATOR: CalculatorReducer,
    TESTIMONIAL: TestimonialReducer,
    UI: UiReducer,
});

export default rootReducer;