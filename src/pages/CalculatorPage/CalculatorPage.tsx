import { Grid, Paper, Slider } from "@mui/material";
import { styled } from '@mui/material/styles'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";

import { AppState } from "../../interfaces/appIniterfaces";
import { calculateAnnualSavings, calculateCostFoodSavings, infoStartLoading } from "../../redux/actions/calculatorAction";

export const CalculatorPage = () => {

    const dispatch = useDispatch();
    const { annualSavingsValue, calculator, costFoodSavingsValue } = useSelector(({ CALCULATOR }: AppState) => CALCULATOR);

    const onCalculateAnnualSavings = (fullTimeEmployes: number) => {
        dispatch(calculateAnnualSavings(fullTimeEmployes, costFoodSavingsValue));
    }

    const onCalculateCostFoodSavings = (monthlyIngredientSpending: number) => {
        console.log(monthlyIngredientSpending);
        
        dispatch(calculateCostFoodSavings(monthlyIngredientSpending))
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
        <div className="container">
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Item>
                        <span>{calculator.title}</span>
                        <span>{calculator.description}</span>
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
                                <span className="input-group-text">$</span>
                                <input type="text" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" onChange={ (e) => onCalculateCostFoodSavings(Number(e.target.value)) } value={ costFoodSavingsValue } />
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
                                onChange={ (_, value) => onCalculateCostFoodSavings(value as number)}
                                aria-label="Monthly"
                                defaultValue={10}
                                valueLabelDisplay="auto"
                                step={1}
                                min={10}
                                max={100}
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
                            <input type="text" className="form-control" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Slider
                                onChange={ (_, value) => onCalculateAnnualSavings(value as number)}
                                aria-label="Full-time"
                                defaultValue={1}
                                valueLabelDisplay="auto"
                                step={1}
                                min={1}
                                max={10}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            ${ costFoodSavingsValue }
                        </div>
                        <div className="col-md-8">
                            ${ annualSavingsValue }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
