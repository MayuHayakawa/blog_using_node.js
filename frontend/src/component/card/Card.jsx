import axios from 'axios';
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import CommentCard from '../card/CommentCard';

import { FaRegCommentDots } from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';

import styled from 'styled-components';
import ToggleLike from '../reaction/ToggleLike';
import Updata from '../reaction/Updata';
import Delete from '../reaction/Delete';
import Comment from '../reaction/Comment';

const Container = styled.div`
  margin: 5rem auto;
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* text-align: center; */
  border: 1px solid white;
  border-radius: 15px;
`

const Title = styled.div`
  width: 100%;
  height: 7rem;
  background-color: white;
  color: black;
  border-radius: 15px 15px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Info = styled.div`
  width: 100%;
  height: 5rem;
  padding: 1rem;
  color: gray;
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  width: 100%;
  height: 18rem;
  padding: 1rem;
  overflow: hidden;
  p {
    font-size: 1.5rem;
  }
`

const ButtonContainer = styled.div`
  width: 100%;
  height: 5rem;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  color: white;
  .heart {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    div {
      font-size: 2rem;
    }
  }
  .comment {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .icon {
      width: 3rem;
      height: 3rem;
    }
    div {
      font-size: 2rem;
    }
  }
  .edit {
    display: flex;
    align-items: center;
    cursor: pointer;
    .icon {
      width: 3rem;
      height: 3rem;
    }
  }
  .delete {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

`

const CommentContainer = styled.div`
  width: 100%;
  padding: 1rem;
`

const getArticle = ("article/get", async(articleid) => {
  try {
    const res = await axios.post(import.meta.env.VITE_BASE_URL + "/api/article/get", { articleid });
    return res.data;
  } catch(error) {
    console.log(error);
  }
});

const Card = () => {
  const user = useSelector(state => state.auth.data);
  const articles = useSelector(state => state.article.data);
  
  const { id } = useParams();
  const [ article, setArticle ] = useState({});
  const [ author, setAuthor ] = useState({});
  const [ articleState, setArticleState ] = useState({});
  const [ isUpdata, setIsUpdata ] = useState(false);
  const [ isComment, setIsComment ] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await getArticle(id);
      if(data != undefined) {
        setArticle(data.article);
        setAuthor(data.author);
      }
    }
    fetchData();
  }, [id]);

  useEffect(() => {
    if(article != {}) {
      articles.map((item) => {
        if(item.articleid === article.articleid) {
          setArticleState(item);
        }
      })
    }
  }, [article, articles]);

  const handleCommentClick = () => {
    setIsComment(!isComment);
    setIsUpdata(false);
  };

  const handleEditClick = () => {
    setIsUpdata(!isUpdata);
    setIsComment(false);
  }

  return (
    <Container>
      <Title>
        <h1>{articleState.title}</h1>
      </Title>
      <Info>
        <h3>{author.username}</h3>
        <h4>Posted on {articleState.time}</h4>
      </Info>
      <Content>
        <p>{articleState.content}</p>
      </Content>
      <ButtonContainer>
        <div className='heart'>
          <ToggleLike data={articleState.articleid} />
          { articleState.liked != undefined && (
            <div>{ articleState.liked.length }</div>
          )}
        </div>
        <div className='comment' onClick={handleCommentClick}>
          <FaRegCommentDots className='icon' /> 
          { articleState.comment != undefined && (
             <div>{ articleState.comment.length }</div> 
          )}
        </div>
        { user != null && user.user.userid === author.userid && (
          <>
            <div className='edit' onClick={handleEditClick}>
              <AiFillEdit className='icon' />
            </div>
            <div className='delete'>
              <Delete data={articleState} />
            </div>
          </>
        )}
      </ButtonContainer>
      { isComment === true && ( <Comment data={articleState} setIsComment={setIsComment} /> ) }
      { isUpdata === true && ( <Updata data={articleState} setIsUpdata={setIsUpdata} />)}
      { articleState.comment != undefined && (
        <CommentContainer>
          { articleState.comment.map((item) => {
            return(
              <CommentCard key={item.userid} data={item} />
            )
          })}
        </CommentContainer>
      )}
    </Container>
  )
}

export default Card