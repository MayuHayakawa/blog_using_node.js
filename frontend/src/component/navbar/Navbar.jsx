import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOutUser } from '../../redux/authSlice';
import { logOutPost } from '../../redux/articleSlice';
import styled from 'styled-components';

const Nav = styled.nav`
    width: 100%;
    height: 7rem;
    background-color: white;
    ul {
        height: 100%;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: space-around;
        list-style: none;
        h1 {
            font-size: 2.5rem;
        }
        li {
            font-size: 1.5rem;
            p {
                color: black;
                cursor: pointer;
            }
        }
    }
    a {
        color: black;
        text-decoration: none;
    }
`

const Navbar = () => {
    const user = useSelector(state => state.auth.data);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = () => {
        dispatch(logOutUser())
        dispatch(logOutPost());
        localStorage.removeItem('myblog_store');
        navigate("/");
    }

  return (
    <Nav>
        <ul>
            <h1>
                <Link to="/">MYBLOG</Link>
            </h1>
            <li>
                <Link to="/">Home</Link>
            </li>
            { user && (
                <>
                    <li>
                        <Link to="/dashboard">My Page</Link>
                    </li>
                    <li>
                        <Link to="/create">Create Post</Link>
                    </li>
                </>
            )}
            <li>
                <Link to="/register">Register</Link>
            </li>
            { user ? (
                <li>
                    <p onClick={handleClick}>Logout</p>
                </li>     
            ):(
                <li>
                    <Link to="/login">Login</Link>
                </li>
            )}
        </ul>
    </Nav>
  )
}

export default Navbar