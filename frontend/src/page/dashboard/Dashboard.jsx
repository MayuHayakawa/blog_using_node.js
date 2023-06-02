import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getMyInfo } from '../../redux/userSlice';
import axios from 'axios';
import LikeArticles from './LikeArticles';
import MyArticles from './MyArticles';
import CardContainer from '../../component/card/CardContainer';

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.data);
  const articles = useSelector(state => state.article.data);

  useEffect(() => {
    if(user != null) {
      axios.defaults.headers.common['authentization'] = `${user.token}`;
      dispatch(getMyInfo(user.user.email));
    }
  }, [dispatch, user]);

  const [ userInfo, setUserInfo ] = useState({});
  useEffect(() => {
    if(user != null) {
      setUserInfo(user.user);
    }
  }, [user]);
  
  return (
    <div>
      <h1>Dashboard</h1>
      { user && (
        <div>
          <p>Username: {userInfo.username}</p>
          { userInfo && userInfo.like && userInfo.like.length > 0 && (
            <div>
              <h1>You likes</h1>
              <LikeArticles all={articles} like={userInfo.like} />
            </div>
          )}
          { userInfo && userInfo.articles && userInfo.articles.length > 0 && (
            <div>
              <h1>Your articles</h1>
              <MyArticles all={articles} my={userInfo.articles} />
            </div>
          )}
          { articles && articles.length > 0 && (
            <div>
              <h1>All articles</h1>
              <CardContainer data={articles} edit={false}/>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Dashboard