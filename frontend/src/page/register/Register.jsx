import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../redux/authSlice';
import styled from 'styled-components';

const RegisterContainer = styled.div`
  margin: 5rem auto;
  padding: 2rem;
  width: 30rem;
  height: 35rem;
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

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);

  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    console.log(user);
  }, [dispatch, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(userInfo));
    navigate("/login");
  }

  return (
    <RegisterContainer>
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div>
          <label>Username</label>
          <input 
            onChange={handleChange}
            type='text'
            id='username'
            name='username'
            placeholder='input your name'
          />
        </div>
        <div>
          <label>Email</label>
          <input 
            onChange={handleChange}
            type='text'
            id='email'
            name='email'
            placeholder='input your email'
          />
        </div>
        <div>
          <label>Password</label>
          <input 
            onChange={handleChange}
            type='password'
            id='password'
            name='password'
          />
        </div>
        <div>
          <button>Register</button>
        </div>
      </form>
    </RegisterContainer>
  );
};

export default Register