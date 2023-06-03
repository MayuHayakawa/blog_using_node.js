import axios from "axios";
// import { useSelector } from 'react-redux';
// import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removePostList } from '../../redux/authSlice';
import { deletePost } from "../../redux/articleSlice";
import styled from 'styled-components';
import { RiDeleteBin6Line } from 'react-icons/ri';

const Icon = styled.div`
  width: 3rem;
  height: 3rem;
  .delete {
    width: 100%;
    height: 100%;
  }
`

const deleteArticle = ("article/delete", async(articleid) => {
// const deleteArticle = ("article/delete", async({ userid, articleid }) => {
  try {
    const res = await axios.post(import.meta.env.VITE_BASE_URL + "/api/article/delete", { articleid });
    // const res = await axios.delete(import.meta.env.VITE_BASE_URL + "/api/article/delete", { userid, articleid });
    return res.data;
  } catch(error) {
    console.log(error);
  }
});

const Delete = (data) => {
  // const user = useSelector(state => state.auth.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [ info, setInfo ] = useState({
  //   userid: "",
  //   articleid: ""
  // });
  
  // useEffect(() => {
  //   if(user != null && data != null) {
  //     setInfo({
  //       userid: user.user.userid,
  //       articleid: data.data.articleid,
  //     });
  //   }
  // }, [data, user])

  const handleClick = () => {
    dispatch(removePostList(data.data.articleid));
    dispatch(deletePost(data.data.articleid));
    // deleteArticle(info);
    deleteArticle(data.data.articleid);
    navigate("/dashboard");
  }

  return (
    <>
      <Icon onClick={handleClick}>
        <RiDeleteBin6Line className="delete" />
      </Icon>
    </>
  )
}

export default Delete