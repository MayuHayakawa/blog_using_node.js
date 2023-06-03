import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid white;
  border-radius: 15px;
  h4 {
    color: gray;
  }
  div {
    p {
      font-size: 1.2rem;
    }

  }
`

const CommentCard = (data) => {
  const [ comment, setComment ] = useState({});

  useEffect(() => {
    if(data != undefined) {
      setComment(data.data);
    }
  }, [data])

  return (
    <Container>
      <h4>{comment.username}&nbsp;&nbsp;&nbsp;&nbsp;{comment.time}</h4>
      <div>
        <p>{comment.content}</p>
      </div>
    </Container>
  )
}

export default CommentCard