/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import dt from "date-utils";
import { addCommentList } from '../../redux/articleSlice';
import styled from 'styled-components';

const CommentContainer = styled.div`
  margin: 1rem auto;
  padding: 1rem;
  width: 90%;
  border: 1px solid white;
  border-radius: 15px;
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    div {
      width: 100%;
      height: 5rem;
      textarea {
        width: 100% !important;
        height: 100% !important;
        padding: 0.5rem;
        font-size: 1rem;
        font-family: Inter;
        overflow: scroll;
        resize: none;
      }
    }
    button {
      margin: auto;
      width: 50%;
      height: 2rem;
      font-size: 1.2rem;
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
`

const addComment = ("reaction/comment", async({ articleid, userid, username, time, content }) => {
  try {
    const res = await axios.post(import.meta.env.VITE_BASE_URL + "/api/reaction/comment", { articleid, userid, username, time, content });
    return res.data;
  } catch(error) {
    console.log(error);
  }
})

const Comment = (data) => {
  const user = useSelector(state => state.auth.data);
  const dispatch = useDispatch();
  const now = new Date();
  const time = now.toFormat("YYYY/MM/DD HH24:MI");

  const [ info, setInfo ] = useState({
    articleid: data.data.articleid,
    userid: user.user.userid,
    username: user.user.username,
    time: time,
    content: ""
  }, [data, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCommentList(info));
    addComment(info);
    data.setIsComment(false);
  }

  return (
    <CommentContainer>
      <form onSubmit={handleSubmit}>
        <h1>Comment</h1>
        <div>
          <textarea 
            onChange={handleChange}
            type='text'
            id='content'
            name='content'
            placeholder='your comment'
          />
        </div>
        <button>Add comment</button>
      </form>
    </CommentContainer>
  )
}

export default Comment