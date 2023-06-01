import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

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
  // console.log(user.user.like);
  // console.log(data.data);
  const isLike = user.user.like.includes(data.data);
  
  const [ info, setInfo ] = useState({
    userid: "",
    articleid: ""
  });
  useEffect(() => {
    if(user != null && data != null) {
      setInfo({
        userid: user.user.userid,
        articleid: data.data,
      });
    }
  }, [data, user]);

  function handleChange() {
    toggleLike(info);
  }

  return (
    <div>
      { isLike ?
        <button onClick={handleChange}>remove like</button>
      :
        <button onClick={handleChange}>like</button>
      }
    </div>
  )
}

export default ToggleLike