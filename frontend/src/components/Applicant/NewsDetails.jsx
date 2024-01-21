import React, { useEffect, useState } from "react";
import NavbarA from "./NavbarA";
import { useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NewsDetails.css";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import {
  //faFacebook,
  //faInstagram,
  //faTwitter,
//} from "@fortawesome/free-brands-svg-icons";
import {ShareSocial} from 'react-share-social' 


const NewsDetails = ({ match }) => {
  const [news, setNews] = useState(null);
  const { newsId } = useParams();
  const [user, setUser] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allComments, setAllComments] = useState([]);
  //url for sharing
  const url = window.location.href;
  //in-line css for react social share component (can't seperate it out without having bugs, fix this if we have time)
  const style = {
    root: {
      maxWidth: '750px', // Adjust the max-width as needed
      margin: '0 auto',
      fontSize: '2rem',
      padding: '1rem',
      background: '#f8f8f8', // Adjust background color
      borderRadius: '8px',
      boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.1)', // Adjust box shadow
      color: '#333', // Set text color to black
    },
    copyContainer: {
      fontSize: '1rem',
      color: 'aliceblue',
      background: 'rgb(77, 77, 182)',
      borderRadius: '12px',
      padding: '10px',
      border: '1px solid rgb(41, 41, 97)',
      transitionDuration: '0.4s',
    },
  };
  // useEffect(() => {
  //   // Fetch the specific news item using match.params.newsId
  //   // Find the news item with the matching newsId
  //   getNewsDetailsById();
  //   fetchAllComments();
  //   getComments();
  // }, [newsId]);
  // useEffect(() => {
  //   fetchData();
  // });

  // const fetchData = async () => {
  //   try {
  //     const { data } = await axios.get("http://localhost:3001/getCurrentUser", {
  //       withCredentials: true,
  //     });
  //     console.log("current user ", data);
  //     setUser(data);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3001/getCurrentUser",
          {
            withCredentials: true,
          }
        );
        console.log("current user ", data);
        setUser(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    const getNewsDetailsAndComments = async () => {
      try {
        const [newsResponse, commentsResponse] = await Promise.all([
          axios.get(`http://localhost:3001/api/news/byid/${newsId}`),
          axios.get(`http://localhost:3001/api/news/${newsId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
        ]);

        setNews(newsResponse.data.message);
        setComments(commentsResponse.data.comments);
        setAllComments(commentsResponse.data.comments);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    getNewsDetailsAndComments();
  }, [newsId]);

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
  //option2----------------
  // const addToComments = async () => {
  //   const body = {
  //     comments: userInput,
  //     user: user._id,
  //   };

  //   try {
  //     const { status, data } = await axios.post(
  //       `http://localhost:3001/api/news/create/${newsId}`,
  //       body,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the user token here
  //         },
  //       }
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
      user: {
        _id: user._id,
        name: user.name,
      },
    };

    try {
      const { status, data } = await axios.post(
        `http://localhost:3001/api/news/create/${newsId}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
      user: {
        _id: user?._id,
        name: user.name,
      },
    };
    console.log("paload", payload);
    try {
      const { data } = await axios.post(
        `http://localhost:3001/api/news/create/${newsId}`,
        payload
      );
      // Update the comments state with the new comment
      setAllComments([...allComments, data.comment]);
      setUserInput("");
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
      await axios.delete(`http://localhost:3001/api/news/comment/${commentId}`);
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
          {/*<div className="singleCol d-flex justify-content-evenly">
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
          </div> */}
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
          <pre class="pre-container">
            {news.content}
          </pre>
          <div align="center">
          <ShareSocial 
            url = {url} 
            socialTypes={['facebook','twitter','whatsapp','telegram' , 'email']}
            style={style}
          />
          </div>
          <div>
            <h3>Comments:</h3>

            {allComments.map((comment) => {
              console.log(comment);

              return (
                <p key={comment._id}>
                  <p>{comment.user?.name}</p>
                  <p>{comment.comments}</p>

                  {comment.user?._id === user?._id && (
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
