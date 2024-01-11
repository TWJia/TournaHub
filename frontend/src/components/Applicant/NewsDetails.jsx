import React, { useEffect, useState } from "react";
import NavbarA from "./NavbarA";
import { useParams } from "react-router-dom";
import axios from "axios";

const NewsDetails = ({ match }) => {
  const [news, setNews] = useState(null);
  const { newsId } = useParams();

  useEffect(() => {
    // Fetch the specific news item using match.params.newsId
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
          <img
            width={"200px"}
            src={`http://localhost:3001/images/${news.photo}`}
            alt={news.title}
            onError={(e) => {
              // Handle image load error
              console.error("Error loading image:", e);
            }}
          />
          <p>{news.author}</p>
          <p>{news.postDate}</p>
          <p>{news.content}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default NewsDetails;
