import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updataLikeList } from '../../redux/authSlice';
import { updataLikedList } from '../../redux/articleSlice';
import styled from 'styled-components';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

const Icon = styled.div`
  width: 3rem;
  height: 3rem;
  .heart {
    width: 100%;
    height: 100%;
  }
`

const toggleLike = ("reaction/like", async({ userid, articleid }) => {
  try {
    const res = await axios.put(import.meta.env.VITE_BASE_URL + "/api/reaction/like", { userid, articleid });
    return res.data;
  } catch(error) {
    console.log(error);
  }
});

const ToggleLike = (data) => {
  const user = useSelector(state => state.auth.data);
  const articles = useSelector(state => state.article.data);
  const dispatch = useDispatch();

  const [ isLike, setIsLike ] = useState(false);  
  const [ info, setInfo ] = useState({
    userid: "",
    articleid: ""
  });

  useEffect(() => {
    if(user != null && user.user != undefined && user.user.like != undefined && data != null) {
      setIsLike(user.user.like.includes(data.data));
    }
    if(user != null && user.user != undefined && data != null) {
      setInfo({
        userid: user.user.userid,
        articleid: data.data,
      });
    }
  }, [data, user]);

  function handleChange() {
    console.log(articles);
    dispatch(updataLikedList(info));
    dispatch(updataLikeList(info.articleid));
    toggleLike(info);
    setIsLike(!isLike);
  }

  return (
    <>
      { isLike ?
        <Icon onClick={handleChange}>
          <AiFillHeart className='heart' />
        </Icon>
      :
        <Icon onClick={handleChange}>
          <AiOutlineHeart className='heart' />
        </Icon>
      }
    </>
  )
}

export default ToggleLike