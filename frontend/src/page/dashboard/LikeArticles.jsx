import { useSelector } from 'react-redux';
import CardContainer from '../../component/card/CardContainer';

const LikeArticles = () => {
  const user = useSelector(state => state.auth.data);
  const articles = useSelector(state => state.article.data);
  const likeArray = new Array;

  if(articles != undefined && articles.length > 0) {
    articles.map((article) => {
      if(user != undefined && user.user != undefined && user.user.like != undefined) {
        user.user.like.map((item) => {
          if(article.articleid === item) {
            likeArray.push(article);
          }
        });
      }
    });
  }

  return (
    <CardContainer data={likeArray} edit={false} />
  )
}

export default LikeArticles;