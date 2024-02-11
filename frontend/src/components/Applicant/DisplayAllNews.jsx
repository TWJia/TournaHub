import React, { useEffect, useState } from "react";
import "./DisplayAllNews.css";
import axios from "axios";

const ApplicantHome = () => {
  const [newsData, setNewsData] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // axios.defaults.withCredentials = true;

  useEffect(() => {
    fetchData();
    fetchAllNews();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/getCurrentUser", {
        withCredentials: true,
      });
      setUser(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
    if (newsId) {
      window.location.href = `/home/news/${newsId}`;
    }
  };

  return (
    <div style={{ backgroundColor: "black" }}>
      <h3>Recommended News For you</h3>
      <div className="newsContainer">
        {newsData.map(
          (news) =>
            news.category === user.interestedSport && (
              <div className="newsBorder" key={news._id}>
                <a
                  className="newstitle"
                  href={`/home/news/${news._id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleTitleClick(news._id);
                  }}
                >
                  <div className="newsColumns">
                    <img
                      className="fixed-size-image"
                      src={`http://localhost:3001/images/${news.photo}`}
                      alt={news.title}
                      onClick={() => handleTitleClick(news._id)}
                    />
                    <div>
                      <h3>{news.title}</h3>
                      <p>Written by: {news.user?.name}</p>
                    </div>
                  </div>
                </a>
              </div>
            )
        )}
      </div>
      <div className="newline">
        <h3>Other News</h3>
        <div className="newsContainer">
          {newsData.map(
            (news) =>
              news.category !== user.interestedSport &&
              news.category && (
                <div className="newsBorder" key={news._id}>
                  <a
                    className="newstitle"
                    href={`/home/news/${news._id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleTitleClick(news._id);
                    }}
                  >
                    <div className="newsColumns">
                      <img
                        className="fixed-size-image"
                        src={`http://localhost:3001/images/${news.photo}`}
                        alt={news.title}
                        onClick={() => handleTitleClick(news._id)}
                      />
                      <div>
                        <h3>{news.title}</h3>
                        <p>Written by: {news.user?.name}</p>
                      </div>
                    </div>
                  </a>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicantHome;
