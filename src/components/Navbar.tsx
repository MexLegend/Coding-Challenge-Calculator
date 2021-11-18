import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

import { AppState } from "../interfaces/appIniterfaces";
import { uiMenuStartLoading } from "../redux/actions/uiAction";

export const Navbar = () => {

    const dispatch = useDispatch();
    const { menu } = useSelector(({ UI }: AppState) => UI);

    useEffect(() => {
        dispatch( uiMenuStartLoading() );
    }, [dispatch]);

    return (
        <nav className="navbar navbar-expand-sm">
            <div className="container">
                <Link 
                    className="navbar-brand" 
                    to="/"
                >
                    <img src="https://cdn.zeplin.io/5a0a3ea82890fd775b3f74ee/assets/0DEBC173-F227-4D2E-A378-BA42E52C3CFA.svg" alt="Bellotero Logo" />
                </Link>

                <div className="navbar-collapse d-flex flex-row-reverse">
                    <div className="navbar-nav">

                        {
                            menu && menu.items.map(({ route, text }, index) => (
                                <NavLink 
                                    className={ ({isActive}) => `nav-item nav-link ${ isActive && 'active' }`}
                                    // exact
                                    key={ index }
                                    to={ `/${ route }` }
                                >
                                    { text }
                                </NavLink>
                            ))
                        }
                    </div>
                </div>
            </div>
            
        </nav>
    )
}