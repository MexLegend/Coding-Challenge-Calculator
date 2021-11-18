import { Button, Box, Container, Grid, Paper, Typography } from "@mui/material";
import Carousel from 'react-material-ui-carousel'
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { styled } from '@mui/material/styles'

import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";

import { AppState, Review } from '../../interfaces/appIniterfaces';
import { testimonialSliderStartLoading } from "../../redux/actions/testimonialAction";

export const TestimonialPage = () => {

    const dispatch = useDispatch();
    const { slider } = useSelector(({ TESTIMONIAL }: AppState) => TESTIMONIAL);

    useEffect(() => {
        dispatch(testimonialSliderStartLoading());
    }, [dispatch]);

    const carousel = () => {
        return <Carousel
            autoPlay={false}
            animation="slide"
            className="carousel"
            duration={600}
            navButtonsAlwaysInvisible
            indicators={false}
        >
            {
                slider.reviews && slider.reviews.map((review, index) => <CarouselItem key={index} {...review} />)
            }
        </Carousel>
    }

    function CarouselItem({ comment, name, position }: Review) {
        return (
            <Grid className="carousel-item" container spacing={2}>
                <Grid item xs={4} display="flex" direction="column">
                    <span className="review-name">{name}</span>
                    <span className="review-position">{position}</span>
                </Grid>
                <Grid item xs={8}>
                    <Typography className="review-comment" component="p">
                        "{comment}"
                    </Typography>
                </Grid>
            </Grid>
        )
    }

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
                        <Box className="carousel-slides-number"><span>1/{slider.reviews.length}</span></Box>
                        <Button className="carousel-control-btn" disableElevation endIcon={<ArrowBack />} variant="contained">
                        </Button>
                        <Button className="carousel-control-btn" disableElevation endIcon={<ArrowForward />} variant="contained" >
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>

    )
}
