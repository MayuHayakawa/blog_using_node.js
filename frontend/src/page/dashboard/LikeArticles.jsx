import CardContainer from '../../component/card/CardContainer';

const LikeArticles = ( data ) => {
  const alldata = data.all;
  const likedata = data.like;

  console.log(alldata);
  console.log(likedata);

  const likeArray = new Array;

  alldata.map((article) => {
    likedata.map((like) => {
      if(article.articleid === like){
        likeArray.push(article);
      }
    });
  });

  return (
    <CardContainer data={likeArray} edit={false} />
  )
}

export default LikeArticles;