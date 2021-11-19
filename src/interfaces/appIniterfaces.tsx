export interface AppState {
    CALCULATOR: CalculatorState;
    TESTIMONIAL: TestimonialState;
    UI: UiState;
}

export interface CalculatorInfo {
    description: string;
    title: string;
}

export interface CalculatorState {
    annualSavingsValue: number;
    calculator: CalculatorInfo;
    costFoodSavingsValue: number;
    fullTimeEmployes: number;
    loading: boolean;
    monthlyIngredientSpending: number;
}

export interface MenuItem {
    text: string;
    route: string;
}

export interface MenuItems {
    items: MenuItem[]
}

export interface Review {
    comment: string;
    name: string;
    position:string;
}

export interface Slider {
    reviews: Review[];
    title: string;
}

export interface TestimonialState {
    loading: boolean;
    slider: Slider;
}

export interface UiState {
    menu: MenuItems;
}
