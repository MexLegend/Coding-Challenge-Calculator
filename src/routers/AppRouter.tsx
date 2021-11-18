import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import { CalculatorPage } from "../pages/CalculatorPage/CalculatorPage"
import { TestimonialPage } from "../pages/TestimonialPage/TestimonialPage"


export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="page-1" element={ <TestimonialPage /> } />
                <Route path="page-2" element={ <CalculatorPage /> } />
            </Routes>
        </BrowserRouter>
    )
}