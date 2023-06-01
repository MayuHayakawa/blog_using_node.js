import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../redux/authSlice';

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
  );
};

export default Register