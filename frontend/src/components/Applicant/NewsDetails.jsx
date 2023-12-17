import React, { useEffect, useState } from "react";
import NavbarA from "./NavbarA";

// const NewsDetails = ({ match }) => {
//   const [news, setNews] = useState([]);

//   //   useEffect(() => {
//   //     // Fetch the specific news item using match.params.newsId
//   //     const newsId = match.params.newsId;
//   //     // Perform fetch or use the existing data source to get the news details
//   //     const fetchedNews = fetch("src/components/Applicant/fakeNewsData.json");
//   //     setNews(fetchedNews);
//   //   }, [match.params.newsId]);

//   useEffect(() => {
//     const newsId = match.params.newsId;

//     // Fetch the data using fetch
//     fetch("src/components/Applicant/fakeNewsData.json")
//       .then((response) => response.json())
//       .then((data) => {
//         // Filter the data based on the newsId
//         const selectedNews = data.find(
//           (news) => news.newsId === parseInt(newsId)
//         );
//         setNews(selectedNews);
//       })
//       .catch((error) => console.error("Error fetching news:", error));
//   }, [match.params.newsId]);

//   return (
//     <div>
//       {news ? (
//         <div>
//           <NavbarA />
//           <h2>{news.title}</h2>
//           <img className="fixed-size-image" src={news.image} alt={news.title} />
//           <p>{news.description}</p>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };
// export default NewsDetail;

const NewsDetails = ({ match }) => {
  const [news, setNews] = useState(null);

  useEffect(() => {
    // Fetch the specific news item using match.params.newsId
    const newsId = match.params.newsId;
    // Load your news data from the JSON file or API
    fetch("src/components/Applicant/fakeNewsData.json")
      .then((response) => response.json())
      .then((data) => {
        // Find the news item with the matching newsId
        const selectedNews = data.find((item) => item.newsId === newsId);
        setNews(selectedNews);
      })
      .catch((error) => console.error("Error fetching news:", error));
  }, [match.params.newsId]);

  return (
    <div>
      <NavbarA />
      {news ? (
        <div>
          <h2>{news.title}</h2>
          <img src={news.image} alt={news.title} />
          <p>{news.description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default NewsDetails;
