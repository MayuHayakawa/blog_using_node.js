import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ToggleLike from '../reaction/ToggleLike';

const Container = styled.div`
  width: 100%;
  margin: 1rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const Card = styled.div`
  width: 50%;
  height: 10rem;
  border: 1px solid white;
`

const updataArticle = ("article/updata", async({ articleid, title, content }) => {
  try {
    const res = await axios.put(import.meta.env.VITE_BASE_URL + "/api/article/updata", { articleid, title, content });
    return res.data;
  } catch(error) {
    console.log(error);
  }
})

const CardContainer = ( data ) => {
  const navigate = useNavigate();
  const [ isUpdata, setIsUpdata ] = useState(false);
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
    setIsUpdata(false);
    navigate("/dashboard");
  }
  return (
    <Container>
      { data.data.map((article) => {
        return (
          <Card key={article.id}>
            <div>
              <h2>title:{article.title}</h2>
              <p>content:{article.content}</p>
              <ToggleLike data={article.articleid}/>
              { data.edit === true && (
                <button onClick={() => setIsUpdata(true)}>Edit</button>
              )}
              <button>Button</button>
            </div>
            { isUpdata === true && (
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Title</label>
                  <input 
                    onChange={handleChange}
                    type='text'
                    id='title'
                    name='title'
                    placeholder={article.title}
                  />
                </div>
                <div>
                  <label>Content</label>
                  <input 
                    onChange={handleChange}
                    type='text'
                    id='content'
                    name='content'
                    placeholder={article.content}
                  />
                </div>
                <button>done</button>
              </form>
            )}
          </Card>
        )
      })}
    </Container>
  )
}

export default CardContainer