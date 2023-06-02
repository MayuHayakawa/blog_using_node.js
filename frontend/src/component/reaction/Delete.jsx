import axios from "axios";
// import { useSelector } from 'react-redux';
// import { useState, useEffect } from 'react';

const deleteArticle = ("article/delete", async({ articleid }) => {
// const deleteArticle = ("article/delete", async({ userid, articleid }) => {
  try {
    const res = await axios.delete(import.meta.env.VITE_BASE_URL + "/api/article/delete", { articleid });
    // const res = await axios.delete(import.meta.env.VITE_BASE_URL + "/api/article/delete", { userid, articleid });
    return res.data;
  } catch(error) {
    console.log(error);
  }
});

const Delete = (data) => {
  // const user = useSelector(state => state.auth.data);

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
    deleteArticle(data.data.articleid);
    // deleteArticle(info);
  }

  return (
    <div>
      <button onClick={handleClick}>Delete</button>
    </div>
  )
}

export default Delete