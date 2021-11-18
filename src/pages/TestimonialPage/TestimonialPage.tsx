import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";

import { AppState } from '../../interfaces/appIniterfaces';
import { testimonialSliderStartLoading } from "../../redux/actions/testimonialAction";

export const TestimonialPage = () => {

    const dispatch = useDispatch();
    const reviews = useRef<any>();
    const { slider } = useSelector(({ TESTIMONIAL }: AppState) => TESTIMONIAL);
    const [ activeReview, setActiveReview ] = useState(0);

    useEffect(() => {
        dispatch(testimonialSliderStartLoading());
    }, [dispatch]);

    console.log(slider);

    const prevSlide = () : void => {
        if(reviews.current.children.length > 0){
            console.log('Anterior');

            const  widthSlide  = reviews.current.children[0].offsetWidth;
			reviews.current.style.transform = `translateX(-${ widthSlide }px)`;

            setActiveReview((prevIndex) =>
                prevIndex === 0 ? slider.reviews.length - 1 : prevIndex - 1
            );
        }

		
    }

    const nextSlide = () => {
        if(reviews.current.children.length > 0){

            const  widthSlide  = reviews.current.children[0].offsetWidth;
            reviews.current.style.transform = `translateX(-${ widthSlide }px)`;

            setActiveReview((prevIndex) =>
                prevIndex === slider.reviews.length - 1 ? 0 : prevIndex + 1
            );
        }
    };
    

    return (
        <div className="container">
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                <span>{ slider.title }</span>
                <div className="carousel-inner">
                    {
                        slider.reviews && slider.reviews.map(({ comment, name, position }, index) => (
                            <div className="carousel-item active" key={ index }>
                                <span>{ name }</span>
                                <span>{ position }</span>
                                <span>{ comment }</span>
                            </div>
                        ))
                    }
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className="slider-wrap">
                <div className="slider" ref={ reviews }>
                    
                </div>
            </div>
            <div>
                <div>
                    { activeReview + 1 }/{ slider.reviews.length }
                </div>
                {/* <div className="controls">
                    <i onClick={ prevSlide } className="fas fa-arrow-left"></i>
                    <i onClick={ nextSlide } className="fas fa-arrow-right"></i>
                </div> */}
            </div>
        </div>
    )
}
