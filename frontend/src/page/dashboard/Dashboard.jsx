import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { getMyInfo } from '../../redux/userSlice';
// import axios from 'axios';
import styled from 'styled-components';
import LikeArticles from './LikeArticles';
import MyArticles from './MyArticles';
import CardContainer from '../../component/card/CardContainer';

const DashboardContainer = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  h1 {
    font-size: 5rem;
  }
  .subTitle {
    margin-top: 5rem;
    font-size: 3rem;
  }
`

const Dashboard = () => {
  // const dispatch = useDispatch();
  const user = useSelector(state => state.auth.data);
  const articles = useSelector(state => state.article.data);

  // useEffect(() => {
  //   if(user != null) {
  //     axios.defaults.headers.common['authentization'] = `${user.token}`;
  //     dispatch(getMyInfo(user.user.email));
  //   }
  // }, [dispatch, user]);

  const [ userInfo, setUserInfo ] = useState({});
  useEffect(() => {
    if(user != null) {
      setUserInfo(user.user);
    }
  }, [user]);
  
  return (
    <DashboardContainer>
      { user && (
        <>
          <h1>{userInfo.username}&apos;s Dashboard</h1>
          <div>
            { userInfo.like != undefined && userInfo.like.length > 0 && (
              <div>
                <h2 className='subTitle'>Your favorite articles</h2>
                <LikeArticles />
              </div>
            )}
            { userInfo.articles != undefined && userInfo.articles.length > 0 && (
              <div>
                <h2 className='subTitle'>Your articles</h2>
                <MyArticles />
              </div>
            )}
            { articles != undefined && articles.length > 0 && (
              <div>
                <h2 className='subTitle'>All articles</h2>
                <CardContainer data={articles} edit={false} test={'all'}/>
              </div>
            )}
          </div>
        </>
      )}
    </DashboardContainer>
  )
}

export default Dashboard