import { Box, Container, FormControl, Grid, Slider, Typography } from "@mui/material";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";

import { Loading } from "../../components/Loading";
import { AppState } from "../../interfaces/appIniterfaces";
import { calculateAnnualSavings, calculateCostFoodSavings, fullTimeEmployesValue, infoStartLoading, monthlyIngredientSpendingValue } from "../../redux/actions/calculatorAction";

import { DebounceInput } from 'react-debounce-input'

export const CalculatorPage = () => {

    const dispatch = useDispatch();
    const { annualSavingsValue, calculator, costFoodSavingsValue, fullTimeEmployes, loading, monthlyIngredientSpending } = useSelector(({ CALCULATOR }: AppState) => CALCULATOR);

    const onCalculateAnnualSavings = (fullTimeEmployes: number) => {
        dispatch(calculateAnnualSavings(fullTimeEmployes, costFoodSavingsValue));
    }

    const onCalculateCostFoodSavings = (monthlyIngredientSpending: number) => {
        dispatch(calculateCostFoodSavings(monthlyIngredientSpending));
        onCalculateAnnualSavings(fullTimeEmployes);
    }

    const onChangeMonthlyIngredientSpending = ({ value }: EventTarget & (HTMLTextAreaElement | HTMLInputElement)) => {
        const valueNumber = handleMinMax(100, 10, value);
        dispatch(monthlyIngredientSpendingValue(valueNumber));
        dispatch(calculateCostFoodSavings(valueNumber));
        onCalculateAnnualSavings(fullTimeEmployes);
    }

    const onChangeFullTimeEmployes = ({ value }: EventTarget & (HTMLTextAreaElement | HTMLInputElement)) => {
        const valueNumber = handleMinMax(10, 1, value);
        dispatch(fullTimeEmployesValue(valueNumber));
        dispatch(calculateAnnualSavings(valueNumber, costFoodSavingsValue));
    };

    const handleMinMax = (max: number, min: number, value: string) => {
        let numberValue = Number(value);
        if (Number.isNaN(numberValue)) {
            numberValue = min;
        }

        if (numberValue < min) {
            numberValue = min;
        }

        if (numberValue > max) {
            numberValue = max;
        }

        return numberValue;
    }

    useEffect(() => {
        dispatch(infoStartLoading());
    }, [dispatch]);

    if (loading) return <Loading text="calculator" />

    return (
        // Container
        <Container className="calculator container" maxWidth="lg">
            {/* Wrapper Container */}
            <Grid className="wrapper-container calculator-wrapper" container order={{ xs: 1, sm: 1 }}>
                {/* Information Container */}
                <Grid item container xs={12} sm={5} md={4} lg={4} xl={4} >
                    <span> <Typography className="section-title calculator-title" component="span" variant="h4">
                        {calculator.title}
                    </Typography></span>
                    <Typography className="calculator-description" component="p">
                        {calculator.description}
                    </Typography>
                </Grid>

                {/* Spacer Container */}
                <Grid item container xs={0} sm={1} md={2} lg={2} xl={2} >
                </Grid>

                {/* Calculator Container */}
                <Grid item className="calculator-container" container xs={12} sm={6} md={6} lg={6} xl={6}>
                    {/* Main Monthly Ingredient Spending Container */}
                    <Grid className="" container style={{ paddingTop: 4, paddingBottom: 4 }}>
                        {/* Monthly Ingredient Text and Input Container */}
                        <Grid className="calculator-input-container" container item>
                            <Grid item xs={8}>
                                <Box style={{ width: '126px' }}>
                                    <span className="calculator-title">
                                        Monthly ingredient spending
                                    </span>
                                </Box>
                            </Grid>
                            <Grid item container xs={4}>
                                <FormControl className="calculator-formcontrol" fullWidth sx={{ m: 1 }} variant="standard">
                                    <DebounceInput
                                        className="calculator-input"
                                        min={10}
                                        max={100}
                                        onKeyUpCapture={({ target }: any) => onChangeMonthlyIngredientSpending(target)}
                                        onChange={({ target }) => onChangeMonthlyIngredientSpending(target)}
                                        value={monthlyIngredientSpending}
                                        type="number"
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        {/* Monthly Ingredient Range Container */}
                        <Grid container item >
                            <Slider
                                aria-label="Monthly"
                                max={100}
                                min={10}
                                onChange={(_, value) => onCalculateCostFoodSavings(value as number)}
                                step={1}
                                value={monthlyIngredientSpending}
                                valueLabelDisplay="auto"
                            />
                        </Grid>
                    </Grid>

                    {/* Main Full Time Employes Container */}
                    <Grid className="" container style={{ paddingTop: 4, paddingBottom: 4 }}>
                        {/* Full Time Employes Text and Input Container */}
                        <Grid className="calculator-input-container" container item>
                            <Grid item xs={8}>
                                <Box style={{ width: '157px' }}>
                                    <span className="calculator-title">
                                        Full-time employees that
                                        process invoices
                                    </span>
                                </Box>
                            </Grid>
                            <Grid item container xs={4}>
                                <FormControl className="calculator-formcontrol" fullWidth sx={{ m: 1 }} variant="standard">
                                    <DebounceInput
                                        className="calculator-input employes-input"
                                        max={10}
                                        min={1}
                                        onChange={({ target }) => onChangeFullTimeEmployes(target)}
                                        type="number"
                                        value={fullTimeEmployes}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        {/* Full Time Employes Range Container */}
                        <Grid container item >
                            <Slider
                                aria-label="Full-time"
                                max={10}
                                min={1}
                                onChange={(_, value) => onCalculateAnnualSavings(value as number)}
                                step={1}
                                value={fullTimeEmployes}
                                valueLabelDisplay="auto"
                            />
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
            <Grid className="calculator-results" container order={{ xs: 2, sm: 2 }}>
                <Box>
                    <Typography component="h2" variant="h2">
                        <span className="result-adornment">$</span>{costFoodSavingsValue.toFixed(3)}
                    </Typography>
                    <Typography component="p">
                        Estimated cost food savings
                    </Typography>
                </Box>

                <Box>
                    <Typography component="h2" variant="h2">
                        <span className="result-adornment">$</span>{annualSavingsValue.toFixed(3)}
                    </Typography>
                    <Typography component="p">
                        Your estimated annual savings
                    </Typography>
                </Box>

            </Grid>

        </Container >
    )
}
