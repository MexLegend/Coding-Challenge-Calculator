import { Container, FormControl, Grid, Input, InputAdornment, Paper, Slider } from "@mui/material";

import { styled } from '@mui/material/styles'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";

import { AppState } from "../../interfaces/appIniterfaces";
import { calculateAnnualSavings, calculateCostFoodSavings, fullTimeEmployesValue, infoStartLoading, monthlyIngredientSpendingValue } from "../../redux/actions/calculatorAction";

export const CalculatorPage = () => {

    const dispatch = useDispatch();
    const { annualSavingsValue, calculator, costFoodSavingsValue, fullTimeEmployes, monthlyIngredientSpending } = useSelector(({ CALCULATOR }: AppState) => CALCULATOR);

    const onCalculateAnnualSavings = (fullTimeEmployes: number) => {
        dispatch(calculateAnnualSavings(fullTimeEmployes, costFoodSavingsValue));
    }

    const onCalculateCostFoodSavings = (monthlyIngredientSpending: number) => {
        dispatch(calculateCostFoodSavings(monthlyIngredientSpending));
        onCalculateAnnualSavings(fullTimeEmployes);
    }

    const onChangeMonthlyIngredientSpending = ({ value }: EventTarget & (HTMLTextAreaElement | HTMLInputElement)) => {
        console.log('Math.abs(Number(value))', Math.abs(Number(value)));
        
        const valueNumber = Math.abs(Number(value)) < 10 ? 10 : Math.abs(Number(value));
        dispatch(monthlyIngredientSpendingValue(valueNumber));
        dispatch(calculateCostFoodSavings(valueNumber));
        onCalculateAnnualSavings(fullTimeEmployes);
    }

    const onChangeFullTimeEmployes = ({ value }: EventTarget & (HTMLTextAreaElement | HTMLInputElement)) => {
        const valueNumber = Math.abs(Number(value)) === 0 ? 1 : Math.abs(Number(value));
        dispatch(fullTimeEmployesValue(valueNumber));
        dispatch(calculateAnnualSavings(valueNumber, costFoodSavingsValue));
    }

    useEffect(() => {
        dispatch(infoStartLoading());
    }, [dispatch]);

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        boxShadow: 'none'
    }));

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Item>
                        <span>{ calculator.title }</span>
                        <span>{ calculator.description }</span>
                    </Item>
                </Grid>
                <Grid container>
                    <Grid item xs={8}>
                        <Item>
                            <span>
                                Monthly
                                ingredient spending
                            </span>
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
                            <div className="input-group">

                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <Input
                                    id="standard-adornment-amount"
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    onChange={ ({ target }) => onChangeMonthlyIngredientSpending(target) }
                                    startAdornment={ <InputAdornment position="start">$</InputAdornment> }
                                    value={ monthlyIngredientSpending }
                                />
                            </FormControl>
                            </div>
                        </Item>
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={12}>
                        <Item>
                        </Item>
                    </Grid>
                </Grid>
            </Grid>
                        <Slider
                                aria-label="Monthly"
                                max={100}
                                min={10}
                                onChange={ (_, value) => onCalculateCostFoodSavings(value as number) }
                                step={1}
                                value={ monthlyIngredientSpending }
                                valueLabelDisplay="auto"
                            />
            <div className="row">
                <div className="col-md-6">
                </div>
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-8">
                        </div>
                        <div className="col-md-4">
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-10">
                            <span>
                                Full-time employees that
                                process invoices
                            </span>
                        </div>
                        <div className="col-md-2">
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                                <Input
                                    id="standard-adornment-amount"
                                    onChange={ ({ target }) => onChangeFullTimeEmployes(target) }
                                    value={ fullTimeEmployes }
                                />
                            </FormControl>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Slider
                                aria-label="Full-time"
                                max={10}
                                min={1}
                                onChange={ (_, value) => onCalculateAnnualSavings(value as number)}
                                step={1}
                                value={ fullTimeEmployes }
                                valueLabelDisplay="auto"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            ${ costFoodSavingsValue.toFixed(3) }
                        </div>
                        <div className="col-md-8">
                            ${ annualSavingsValue.toFixed(3) }
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}
