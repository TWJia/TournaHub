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
  const [user, setUser] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allComments, setAllComments] = useState([]);
  useEffect(() => {
    // Fetch the specific news item using match.params.newsId
    // Find the news item with the matching newsId
    getNewsDetailsById();
    fetchAllComments();
    getComments();
  }, [newsId]);
  useEffect(() => {
    fetchData();
  });

  const fetchData = async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/getCurrentUser");
      console.log("current user ", data);
      setUser(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const writtenComment = (event) => {
    setUserInput(event.target.value);
  };
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
  // const getComments = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `http://localhost:3001/api/news/${newsId}`
  //     );
  //     setComments(data.comments);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const getComments = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/api/news/${newsId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the user token here
          },
        }
      );
      setComments(data.comments);
    } catch (error) {
      console.log(error);
    }
  };

  // const addToComments = async () => {
  //   const body = {
  //     comments: userInput,
  //     user: user._id,
  //   };

  //   try {
  //     const { status, data } = await axios.post(
  //       `http://localhost:3001/api/news/create/${newsId}`,
  //       body
  //     );
  //     console.log(data);
  //     if (status === 200) {
  //       fetchAllComments();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const addToComments = async () => {
    const body = {
      comments: userInput,
      user: user._id,
    };

    try {
      const { status, data } = await axios.post(
        `http://localhost:3001/api/news/create/${newsId}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the user token here
          },
        }
      );
      console.log(data);
      if (status === 200) {
        fetchAllComments();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentSubmit = async (commentText) => {
    if (!user) {
      alert("user is null");
      return;
    }
    const payload = {
      text: commentText,
      user: user?._id,
    };
    console.log("paload", payload);
    try {
      const { data } = await axios.post(
        `http://localhost:3001/api/news/create/${newsId}`,
        payload
      );
      // Update the comments state with the new comment
      setAllComments([...allComments, data.comment]);
    } catch (error) {
      console.log(error);
    }
  };

  // const fetchAllComments = async () => {
  //   try {
  //     const { data, status } = await axios.get(
  //       `http://localhost:3001/api/news/${newsId}`
  //     );
  //     setAllComments(data.comments);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const fetchAllComments = async () => {
    try {
      const { data, status } = await axios.get(
        `http://localhost:3001/api/news/${newsId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the user token here
          },
        }
      );
      setAllComments(data.comments);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("all comments", allComments);

  const handleCommentDelete = async (commentId) => {
    try {
      await axios.delete(`http://localhost:3001/api/news/${commentId}`);
      setAllComments(
        allComments.filter((comment) => comment._id !== commentId)
      );
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
          <h6>{news.category}</h6>
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
          <div>
            <h3>Comments:</h3>

            {allComments.map((comment) => {
              console.log(comment); // Add this line to check the comment structure

              return (
                <p key={comment._id}>
                  <p>{comment.user?.name}</p>
                  <p>{comment.comments}</p>

                  {comment.user?.id === user?._id && (
                    <button onClick={() => handleCommentDelete(comment._id)}>
                      Delete Comment
                    </button>
                  )}
                </p>
              );
            })}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const commentText = e.target.elements.commentText.value;
                handleCommentSubmit(commentText);
                e.target.elements.commentText.value = "";
              }}
            >
              <input
                type="text"
                name="commentText"
                placeholder="Add a comment"
                value={userInput}
                onChange={writtenComment}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default NewsDetails;
