import { useState } from 'react';
import styled from 'styled-components';
import ToggleLike from '../reaction/ToggleLike';
import Updata from '../reaction/Updata';
import Delete from '../reaction/Delete';

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

const CardContainer = ( data ) => {
  const [ isUpdata, setIsUpdata ] = useState(false);

  return (
    <Container>
      { data.data.map((article) => {
        return (
          <Card key={article.articleid}>
            <div>
              <h2>title:{article.title}</h2>
              <p>content:{article.content}</p>
              <ToggleLike data={article.articleid}/>
              { data.edit === true && (
                <>
                <button onClick={() => setIsUpdata(!isUpdata)}>Edit</button>
                <Delete data={article} />
                </>
              )}
            </div>
            { isUpdata === true && ( <Updata data={article} setIsUpdata={setIsUpdata}/>)}
          </Card>
        )
      })}
    </Container>
  )
}

export default CardContainer