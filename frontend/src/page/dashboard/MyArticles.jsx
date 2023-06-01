import CardContainer from '../../component/card/CardContainer';

const MyArticles = ( data ) => {
  const alldata = data.all;
  const mydata = data.my;

  const myArray = new Array;
  alldata.map((article) => {
    mydata.map((my) => {
      if(article.articleid === my) {
        myArray.push(article);
      }
    })
  });

  return (
    <CardContainer data={myArray} edit={true}/>
  )
}

export default MyArticles