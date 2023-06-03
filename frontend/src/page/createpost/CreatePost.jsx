/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../redux/articleSlice';
import { updataPostList } from '../../redux/authSlice';
import uniqid from "uniqid";
import dt from "date-utils";
import styled from 'styled-components';

const NewPostContainer = styled.div`
  margin: 5rem auto;
  padding: 2rem;
  width: 60%;
  height: 100%;
  display: flex;
  text-align: center;
  border: 1px solid white;
  border-radius: 15px;
  form {
    display: flex;
    width: 100%;
    flex-direction: column;
    /* align-items: center; */
    /* justify-content: space-between; */
    gap: 2rem;
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
        margin: 1rem auto 0 auto;
        width: 90%;
        font-size: 1.5rem;
        height: 2rem;
        padding: 0 0.5rem;
        height: 3rem;
      }
      textarea {
        margin: 1rem auto 0 auto;
        width: 90%;
        font-family: Inter;
        font-size: 1.5rem;
        padding: 1rem;
        height: 30rem;
        overflow: scroll;
      }
      button {
        margin: auto;
        width: 50%;
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

const createArticle = ("article/new", async({ articleid, userid, time, title, content, like, comment }) => {
  try {
    const res = await axios.post(import.meta.env.VITE_BASE_URL + "/api/article/new", { articleid, userid, time, title, content, like, comment });
    return res.data;
  } catch(error) {
    console.log(error);
  }
})

const CreatePost = () => {
  const user = useSelector(state => state.auth.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const now = new Date();
  const time = now.toFormat("YYYY/MM/DD HH24:MI");
  const [newArticle, setNewArticle] = useState({
    articleid: uniqid(),
    userid: user.user.userid,
    time: time,
    title: "",
    content: "",
    liked: [],
    comment: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewArticle((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost(newArticle));
    dispatch(updataPostList(newArticle.articleid));
    createArticle(newArticle);
    navigate("/dashboard");
  }

  return (
    <NewPostContainer>
      <form onSubmit={handleSubmit}>
        <h1>New Post</h1>
        <div>
          <label>Title</label>
          <input
            onChange={handleChange}
            type='text'
            id='title'
            name='title'
            placeholder='Title'
          />
        </div>
        <div>
          <label>Content</label>
          <textarea
            onChange={handleChange}
            type='text'
            id='content'
            name='content'
          />
        </div>
        <div>
          <button>Create new post</button>
        </div>
      </form>
    </NewPostContainer>
  )
}

export default CreatePost