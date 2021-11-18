import { Dispatch } from "redux";

import { URI } from "../../api/api";
import { TestimonialState } from "../../interfaces/appIniterfaces";
import { Types } from "../types"

const testimonialSliderLoaded = (data: TestimonialState) => ({
    type: Types.TESTIMONIAL_SLIDER_LOADED,
    payload: data
});

const testimonialSliderStartLoading = () => {
    return async (dispatch: Dispatch) => {
        try {
            const resp = await fetch(`${ URI }/page1.json`);
            const data: TestimonialState = await resp.json();
    
            dispatch(testimonialSliderLoaded(data));
        } catch (error) {
            console.log(error)
        }
    }
}

export {
    testimonialSliderStartLoading
}