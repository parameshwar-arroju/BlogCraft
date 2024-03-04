import { useNavigate } from 'react-router-dom';
export function SignOut() {
    const navigate = useNavigate();
    localStorage.removeItem('token');
    function HandelClick (){
        navigate('/');
    }
    return (<>
        <div className="container d-flex align-items-center justify-content-center">
            <div className="">
                <h2>Signed Out</h2>
                <button className="btn btn-outline-dark" onClick={HandelClick}>Go to  Home Page</button>
            </div>
        </div>
    </>);
};