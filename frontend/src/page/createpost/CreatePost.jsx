import axios from 'axios';
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const createArticle = ("article/new", async({ userid, title, content }) => {
  try {
    const res = await axios.post(import.meta.env.VITE_BASE_URL + "/api/article/new", { userid, title, content });
    return res.data;
  } catch(error) {
    console.log(error);
  }
})

const CreatePost = () => {
  const user = useSelector(state => state.auth.data);
  const navigate = useNavigate();

  const [newArticle, setNewArticle] = useState({
    userid: user.user.userid,
    title: "",
    content: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewArticle((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createArticle(newArticle);
    navigate("/dashboard");
  }

  return (
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
        <input 
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
  )
}

export default CreatePost