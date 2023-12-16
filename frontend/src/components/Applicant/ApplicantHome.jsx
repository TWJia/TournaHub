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

  return (
    <div>
      <h2>Latest News</h2>

      {newsData.map((news) => (
        <h3 key={news.id}>
          <img className="fixed-size-image" src={news.image} alt={news.title} />
          <a>{news.title}</a>
          <p>{news.description}</p>
        </h3>
      ))}
    </div>
  );
};

export default ApplicantHome;
