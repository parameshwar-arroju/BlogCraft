import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo1.jpeg";
import './Header.css'
import { useState, useEffect } from "react";

export function Header() {
    const navigate = useNavigate();
    const [IsAuth, setIsAuth] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuth(true);
        }
    }, []);
    function HandleSignOut() {
        localStorage.removeItem('token');
        setIsAuth(false);
        navigate('/');
    }
    return (<>
        <nav className="navbar navbar-expand-lg fixed-top bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#"><img src={logo} alt="logo" className="logo image-fluid" /></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        {IsAuth ?
                            (<><Link className="nav-link" to="/myblogs">MyBlogs</Link>
                                <Link className="nav-link" to="/createblog">Create Blog</Link></>)
                            : <></>}
                    </div>
                </div>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                    <div className="navbar-nav gap-1">
                        {!IsAuth ?
                            (
                                <>
                                <Link key="signup" className="nav-link" to="/signin">SignUp</Link>
                                <Link key="signin" className="nav-link" to="/signin">SignIn</Link>
                                </>
                            )
                            :
                            (<Link key="signout" className="nav-link" onClick={HandleSignOut}>SignOut</Link>)
                        }
                        <Link className="btn  btn-outline-dark" to="https://github.com/parameshwar-arroju/BlogCraft" target="_blank">Github</Link>
                    </div>
                </div>
            </div>
        </nav>
    </>
    );
}