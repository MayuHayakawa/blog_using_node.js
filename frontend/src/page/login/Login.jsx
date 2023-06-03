import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/authSlice';
// import { getMyInfo } from '../../redux/userSlice';
import { getAllArticles } from '../../redux/articleSlice';
import styled from 'styled-components';

const LoginContainer = styled.div`
  margin: 5rem auto;
  padding: 2rem;
  width: 30rem;
  height: 25rem;
  display: flex;
  border: 1px solid white;
  form {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    h1 {
      font-size: 3rem;
    }
    div { 
      width: 100%;
      display: flex;
      flex-direction: column;
      label {
        font-size: 2rem;
      }
      input {
        font-size: 1.5rem;
        height: 2rem;
        padding: 0 0.5rem;
      }
      button {
        width: 100%;
        height: 3rem;
        font-size: 1.5rem;
        border: 1px solid white;
        color: white;
        background-color: transparent;
        cursor: pointer;
        &:hover {
          color: black;
          background-color: white;
        }
      }
    }
  }
`

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ userInfo, setUserInfo ] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userInfo));
    // dispatch(getMyInfo(userInfo.email));
    dispatch(getAllArticles());
    navigate("/dashboard");
  }

  return (
    <LoginContainer>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div>
          <label htmlFor='email'>Email</label>
          <input 
            onChange={handleChange}
            type='text'
            id='email'
            name='email'
            placeholder='input your email'
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input 
            onChange={handleChange}
            type='password'
            id='password'
            name='password'
          />
        </div>
        <div>
          <button>Login</button>
        </div>
      </form>
    </LoginContainer>
  );
};

export default Login