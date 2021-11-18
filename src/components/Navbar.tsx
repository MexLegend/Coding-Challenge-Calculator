import { AppBar, Box, Container, Grid, Toolbar } from '@mui/material';

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

import { AppState } from "../interfaces/appIniterfaces";
import { uiMenuStartLoading } from "../redux/actions/uiAction";

export const Navbar = () => {

    const dispatch = useDispatch();
    const { menu } = useSelector(({ UI }: AppState) => UI);

    useEffect(() => {
        dispatch(uiMenuStartLoading());
    }, [dispatch]);

    return (
        <AppBar elevation={0} position="static" className="navbar" >
            <Container maxWidth="lg">
                <Toolbar style={{ alignItems: "stretch" }}>
                    <Box sx={{ flexGrow: 1 }} alignItems="center" display="flex">
                        <Link
                            className="navbar-brand"
                            to="#"
                        >
                            <img src="https://cdn.zeplin.io/5a0a3ea82890fd775b3f74ee/assets/0DEBC173-F227-4D2E-A378-BA42E52C3CFA.svg" alt="Bellotero Logo" />
                        </Link>
                    </Box>
                    <Grid display="flex" flexDirection="row" justifyContent="end" alignItems="stretch">
                        {
                            menu && menu.items.map(({ route, text }, index) => (
                                <NavLink
                                    className={({ isActive }) => `nav-item nav-link ${isActive && 'active'}`}
                                    // exact
                                    key={index}
                                    to={`/${route}`}
                                >
                                    <span>  {text}</span>
                                </NavLink>
                            ))
                        }
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar >
    )
}