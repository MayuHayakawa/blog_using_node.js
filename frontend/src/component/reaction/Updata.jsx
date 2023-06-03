import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updataPost } from "../../redux/articleSlice";
import styled from 'styled-components';

const UpdataContainer = styled.div`
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
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      label {
        font-size: 1.5rem;
      }
      input {
        padding: 0 0.5rem;
        height: 2rem;
        font-size: 1.2rem;
      }
      textarea {
        height: 10rem;
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

const updataArticle = ("article/updata", async({ articleid, title, content }) => {
    try {
      const res = await axios.put(import.meta.env.VITE_BASE_URL + "/api/article/updata", { articleid, title, content });
      return res.data;
    } catch(error) {
      console.log(error);
    }
})

const Updata = (data) => {
  const dispatch = useDispatch();
  const [ newArticle, setNewArticle ] = useState({
    articleid: data.data.articleid,
    title: "",
    content: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewArticle((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updataPost(newArticle));
    updataArticle(newArticle);
    data.setIsUpdata(false);
  }

  return (
    <UpdataContainer>
      <form onSubmit={handleSubmit}>
        <h1>Editing...</h1>
        <div>
          <label>Title</label>
          <input 
            onChange={handleChange}
            type='text'
            id='title'
            name='title'
            placeholder={data.data.title}
          />
        </div>
        <div>
          <label>Content</label>
          <textarea 
            onChange={handleChange}
            type='text'
            id='content'
            name='content'
            placeholder={data.data.content}
          />
        </div>
        <button>Update</button>
      </form>
    </UpdataContainer>
  )
}

export default Updata