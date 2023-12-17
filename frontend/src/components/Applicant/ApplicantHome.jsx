import React, { useEffect, useState } from "react";
import "./ApplicantHome.css";
const ApplicantHome = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    // Fetch news data from your API or local JSON file
    fetch("src/components/Applicant/fakeNewsData.json")
      .then((response) => response.json())
      .then((data) => setNewsData(data))
      .catch((error) => console.error("Error fetching news data:", error));
  }, []);

  const handleTitleClick = (newsId) => {
    // Ensure newsId is valid before navigating
    if (newsId) {
      window.location.href = `/home/news/${newsId}`;
    }
  };
  // const handleTitleClick = (newsId) => {
  //   // Navigate to the new page using window.location.href
  //   window.location.href = `/home/${newsId}`;
  // };

  //   return (
  //     <div>
  //       <h2>Latest News</h2>

  //       {newsData.map((news) => (
  //         <h3 key={news.id}>
  //           <img className="fixed-size-image" src={news.image} alt={news.title} />
  //           <a>{news.title}</a>
  //           <p>{news.description}</p>
  //         </h3>
  //       ))}
  //     </div>
  //   );
  // };

  return (
    <div>
      <h2>Latest News</h2>

      {newsData.map((news) => (
        <div key={news.newsId}>
          <h3 onClick={() => handleTitleClick(news.newsId)}>
            <img
              className="fixed-size-image"
              src={news.image}
              alt={news.title}
            />
            {news.title}
          </h3>
          <p>{news.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ApplicantHome;
