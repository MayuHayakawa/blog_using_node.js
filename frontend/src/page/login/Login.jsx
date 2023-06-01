import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/authSlice';

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
    navigate("/dashboard");
  }

  return (
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
  );
};

export default Login