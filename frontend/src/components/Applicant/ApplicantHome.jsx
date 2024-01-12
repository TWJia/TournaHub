import React, { useEffect, useState } from "react";
import "./ApplicantHome.css";
import axios from "axios";
const ApplicantHome = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    // Fetch news data from your API or local JSON file
    fetchAllNews();
  }, []);

  const fetchAllNews = async () => {
    try {
      const { status, data } = await axios.get(
        "http://localhost:3001/api/news/all"
      );

      setNewsData(data.message);
    } catch (error) {
      console.log(error);
    }
  };

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
        <div key={news._id}>
          <h3 onClick={() => handleTitleClick(news._id)}>
            <img
              className="fixed-size-image"
              src={`http://localhost:3001/images/${news.photo}`}
              alt={news.title}
            />
            {news.title}
          </h3>
          <p>{news.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ApplicantHome;
