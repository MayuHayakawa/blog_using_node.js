// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegCommentDots } from 'react-icons/fa';
// import { AiFillEdit } from 'react-icons/ai';
import styled from 'styled-components';
import ToggleLike from '../reaction/ToggleLike';
// import Updata from '../reaction/Updata';
import Delete from '../reaction/Delete';
// import Comment from '../reaction/Comment';

const Container = styled.div`
  width: 100%;
  margin: 1rem auto;
  display: grid;
  place-content: center;
  grid-template-columns: repeat(auto-fit, minmax(350px, 500px));
  gap: 2rem;
`

const Card = styled.div`
  height: 30rem;
  /* padding: 1rem; */
  border: 1px solid white;
  border-radius: 15px;
`

const Title = styled.div`
  width: 100;
  height: 7rem;
  background-color: white;
  color: black;
  border-radius: 15px 15px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  h2 {
    font-size: 2rem;
  }
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
    /* cursor: pointer; */
    .icon {
      width: 3rem;
      height: 3rem;
    }
    div {
      font-size: 2rem;
    }
  }
  /* .edit {
    display: flex;
    align-items: center;
    cursor: pointer;
    .icon {
      width: 3rem;
      height: 3rem;
    }
  } */
  .delete {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`

const CardContainer = ( data ) => {
  const navigate = useNavigate();
  // const [ isUpdata, setIsUpdata ] = useState(false);
  // const [ isComment, setIsComment ] = useState(false);
  console.log(data);

  function handleRoute(id) {
    navigate(`/dashboard/${id}`);
  }

  return (
    <Container>
      { data.data.map((article) => {
        return (
          <Card key={article.articleid}>
            <Title onClick={() => handleRoute(article.articleid)}>
              <h2>{article.title}</h2>
            </Title>
            <Content onClick={() => handleRoute(article.articleid)}>
              <p>{article.content}</p>
            </Content>
            <ButtonContainer>
              <div className='heart'>
                <ToggleLike data={article.articleid} />
                { article.liked != undefined && (
                  <div>{ article.liked.length }</div>
                )}
              </div>
              <div className='comment'>
              {/* <div className='comment' onClick={() => setIsComment(!isComment)}> */}
                <FaRegCommentDots className='icon' /> 
                { article.comment != undefined && article.comment.length > 0 && (
                  <div>{ article.comment.length }</div>
                )}
              </div>
              { data.edit === true && (
                <>
                {/* <div className='edit' onClick={() => setIsUpdata(!isUpdata)}>
                  <AiFillEdit className='icon' />
                </div> */}
                <div className='delete'>
                  <Delete data={article} />
                </div>
                </>
              )}
            </ButtonContainer>
            {/* { isComment === true && ( <Comment data={article} setIsComment={setIsComment} /> ) }
            { isUpdata === true && ( <Updata data={article} setIsUpdata={setIsUpdata} />)} */}
          </Card>
        )
      })}
    </Container>
  )
}

export default CardContainer