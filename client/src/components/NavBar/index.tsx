import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/utfpr-logo.png";
import AuthService from "../../service/AuthService";

export function NavBar() {

    const onClickLogout = () => {
        AuthService.logout();
        window.location.reload();
    };

    return (
        <div className="shadow-sm mb-2">
            <div className="container-fluid">
                <nav className="navbar navbar-light navbar-expand">
                    <Link to="/" className="navbar-brand">
                        <img src={logo} width="50" alt="UTFPR" />
                    </Link>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink
                                to="/"
                                className={(navData) =>
                                    navData.isActive ? "nav-link active" : "nav-link"
                                }
                            >
                                Home
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                to="/registers"
                                className={(navData) =>
                                    navData.isActive ? "nav-link active" : "nav-link"
                                }
                            >
                                Registro de contas
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                to="/movements"
                                className={(navData) =>
                                    navData.isActive ? "nav-link active" : "nav-link"
                                }
                            >
                                Movimentações
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <button className="btn btn-light" onClick={onClickLogout}>
                                Sair
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}