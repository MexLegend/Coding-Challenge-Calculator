import { Slider, TestimonialState } from "../../interfaces/appIniterfaces";
import { Types } from "../types";

type TestimonialAction = 
    | { type: Types.TESTIMONIAL_SLIDER_LOADED, payload: { slider: Slider } }

const initialState: TestimonialState = {
    loading: true,
    slider: {
        reviews: [],
        title: ''
    }
}

export const TestimonialReducer = ( state: TestimonialState = initialState, action: TestimonialAction ): TestimonialState => {

    switch ( action.type ) {
        
        case "TESTIMONIAL_SLIDER_LOADED":
            return {
                ...state,
                loading: false,
                slider: action.payload.slider
            }

        default:
            return state;
    }
}