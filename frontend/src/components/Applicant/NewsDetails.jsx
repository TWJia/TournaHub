import React, { useEffect, useState } from "react";
import NavbarA from "./NavbarA";
import { useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NewsDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

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
          <div className="singleCol d-flex justify-content-evenly">
            <a href="https://facebook.com">
              <button className="FBWording">
                <FontAwesomeIcon icon={faFacebook} />
                Share on Facebook
              </button>
            </a>

            <a href="https://intagram.com">
              <button className="igWordings ">
                <FontAwesomeIcon icon={faInstagram} />
                Post a Story
              </button>
            </a>

            <a href="https://twitter.com">
              <button className="twitterWording ">
                <FontAwesomeIcon icon={faTwitter} />
                Send a tweet
              </button>
            </a>
          </div>
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
