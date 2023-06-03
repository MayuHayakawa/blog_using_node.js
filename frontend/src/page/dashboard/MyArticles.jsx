import { useSelector } from 'react-redux';
import CardContainer from '../../component/card/CardContainer';

const MyArticles = () => {
  const user = useSelector(state => state.auth.data);
  const articles = useSelector(state => state.article.data);
  const myArray = new Array;

  if(articles != undefined && articles.length > 0) {
    articles.map((article) => {
      if(article != undefined && user != undefined && user.user != undefined && user.user.like != undefined && article.userid === user.user.userid) {
        myArray.push(article);
      }
    });
  }

  return (
    <CardContainer data={myArray} edit={true}/>
  )
}

export default MyArticles