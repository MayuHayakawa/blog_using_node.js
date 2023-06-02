import axios from 'axios';
import { useState } from 'react';

const updataArticle = ("article/updata", async({ articleid, title, content }) => {
    try {
      const res = await axios.put(import.meta.env.VITE_BASE_URL + "/api/article/updata", { articleid, title, content });
      return res.data;
    } catch(error) {
      console.log(error);
    }
})

const Updata = (data) => {
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
    updataArticle(newArticle);
    data.setIsUpdata(false);
  }

  return (
    <form onSubmit={handleSubmit}>
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
        <input 
          onChange={handleChange}
          type='text'
          id='content'
          name='content'
          placeholder={data.data.content}
        />
      </div>
      <button>done</button>
    </form>
  )
}

export default Updata