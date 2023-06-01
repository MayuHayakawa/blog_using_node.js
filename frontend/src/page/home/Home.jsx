import styled from 'styled-components';

const Main = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  text-align: center;
  h1 {
    margin: auto;
  }
`

const Home = () => {

  return (
    <Main>
        <h1>MY BLOG</h1>
    </Main>
  )
}

export default Home