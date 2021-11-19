import { Button, Box, Container, Grid, Typography } from "@mui/material";
import Carousel from 'react-material-ui-carousel'
import { ArrowBack, ArrowForward } from '@mui/icons-material';

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";

import { AppState, Review } from '../../interfaces/appIniterfaces';
import { testimonialSliderStartLoading } from "../../redux/actions/testimonialAction";
import { Loading } from "../../components/Loading";

export const TestimonialPage = () => {

    const dispatch = useDispatch();
    const { loading, slider } = useSelector(({ TESTIMONIAL }: AppState) => TESTIMONIAL);

    const [activeSlide, setActiveSlide] = useState(0);

    const next = () => setActiveSlide(slideIndex => slideIndex === slider.reviews.length - 1 ? 0 : slideIndex + 1);

    const prev = () => setActiveSlide(slideIndex => slideIndex === 0 ? slider.reviews.length - 1 : slideIndex - 1);

    useEffect(() => {
        dispatch(testimonialSliderStartLoading());
    }, [dispatch]);

    const carousel = () => {
        return <Carousel
            animation="slide"
            autoPlay={false}
            className="carousel"
            duration={600}
            index={ activeSlide }
            indicators={false}
            navButtonsAlwaysInvisible
        >
            {
                slider.reviews && slider.reviews.map((review, index) => <CarouselItem key={index} {...review} />)
            }
        </Carousel>
    }

    function CarouselItem({ comment, name, position }: Review) {
        return (
            <Grid className="carousel-item" container spacing={2} order={{ xs: 1, sm: 2 }}>
                <Grid item xs={12} sm={5} md={4} lg={4} xl={4} container display="flex" direction="column">
                    <span className="review-name">{name}</span>
                    <span className="review-position">{position}</span>
                </Grid>
                <Grid item xs={12} sm={7} md={8} lg={8} xl={8}>
                    <Typography className="review-comment" component="p">
                        "{comment}"
                    </Typography>
                </Grid>
            </Grid>
        )
    }

    if( loading ) return <Loading text="testimonials" />

    return (
        <Container className="container" maxWidth="lg">
            <Grid
                className="carousel-container">
                <Typography className="section-title" component="h4" variant="h4">
                    {slider.title}
                </Typography>
                <Grid
                    position="relative"
                    container>
                    {carousel()}
                    <Box
                        className="carousel-controls"
                    >
                        <Box className="carousel-slides-number"><span>{activeSlide+1}/{slider.reviews.length}</span></Box>
                        <Button
                            className="carousel-control-btn"
                            disableElevation
                            endIcon={<ArrowBack />}
                            onClick={ prev }
                            variant="contained">
                        </Button>
                        <Button
                            className="carousel-control-btn"
                            disableElevation
                            endIcon={<ArrowForward />}
                            onClick={next}
                            variant="contained" >
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>

    )
}
