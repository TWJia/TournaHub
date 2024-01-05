import React, { useEffect, useState } from "react";
import NavbarA from "./NavbarA";
import { useParams } from "react-router-dom";
import newsData from "./fakeNewsData.json";
import axios from "axios";

const NewsDetails = ({ match }) => {
  const [news, setNews] = useState(null);
  const { newsId } = useParams();

  useEffect(() => {
    // Fetch the specific news item using match.params.newsId
    // Load your news data from the JSON file or API
    // Find the news item with the matching newsId
    getNewsDetailsById();
  }, [newsId]);

  const getNewsDetailsById = async () => {
    try {
      const { status, data } = await axios.get(
        `http://localhost:3001/api/news/byid/${newsId}`
      );
      console.log(data);
      setNews(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavbarA />
      {news ? (
        <div>
          <h2>{news.title}</h2>
          <img width={"200px"} src={news.image} alt={news.title} />
          <p>{news.content}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default NewsDetails;
