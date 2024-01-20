import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router";
import axios from "axios";
import NavbarA from "./NavbarA";
const RatingAndReview = () => {
  const [value, setValue] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [user, setUser] = useState(null);
  const [allReviews, setAllReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    fetchAllReviews();
  }, []);

  const fetchAllReviews = async () => {
    try {
      const { data, status } = await axios.get(
        "http://localhost:3001/api/reviews/all"
      );
      setAllReviews(data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const writtenNote = (event) => {
    setUserInput(event.target.value);
  };
  const fetchData = async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/getCurrentUser");
      setUser(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const addToReviews = async () => {
    const body = {
      text: userInput,
      star: value,
      user: user._id,
    };

    try {
      const { status, data } = await axios.post(
        "http://localhost:3001/api/reviews/create",
        body
      );
      console.log(data);
      if (status === 200) {
        fetchAllReviews();
        setUserInput("");
        setValue(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const { status } = await axios.delete(
        `http://localhost:3001/api/reviews/${reviewId}`
      );
      if (status === 200) {
        fetchAllReviews();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavbarA />
      <div className="topic">
        <h2 className="book_now_text">Rate us!</h2>
        <Box
          sx={{
            "& > legend": { mt: 2 },
          }}
        >
          <Typography component="legend" className="other_info_key">
            Ratings:
          </Typography>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </Box>
        <textarea
          className="loginBox"
          placeholder="Describe your experience"
          onChange={writtenNote}
          value={userInput}
        />
        <button className="mainBtns" onClick={addToReviews}>
          Submit
        </button>
      </div>

      <div>
        {allReviews.map((review) => {
          return (
            <>
              <div>
                <p>{review.user?.name}</p>
                <Rating name="simple-controlled" value={review.star} readOnly />

                <p>{review.text}</p>
                {user?._id === review.user?._id && (
                  <button onClick={() => handleDeleteReview(review._id)}>
                    Delete
                  </button>
                )}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default RatingAndReview;
