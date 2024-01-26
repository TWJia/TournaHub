import React, { useState, useEffect } from 'react';
import "./Home.css";
import "./LandingOne.css";
import axios from "axios";
import Rating from "@mui/material/Rating";

export default function LandingOne() {
  const domainName = "http://localhost:3001" 
  const [userCount, setUserCount] = useState(null);
  const [tournamentCount, setTournamentCount] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [sponsorIcons, setSponsorIcons] = useState([]);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get(`${domainName}/count-user`);
        setUserCount(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserCount();
  }, []);
  
  useEffect(() => {
    const fetchTournamentCount = async () => {
      try {
        const response = await axios.get(`${domainName}/count-tournaments`);
        setTournamentCount(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTournamentCount();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${domainName}/api/reviews/fetch-reviews-homepage`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    fetchReviews();
  }, []); 

  useEffect(() => {
    const fetchSponsorIcons = async () => {
      try {
        const response = await axios.get(`${domainName}/fetch-sponsor-icons`);
        setSponsorIcons(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching sponsor icons:', error);
      }
    };
  
    fetchSponsorIcons();
  }, []);


  return (
    <div className="landingone-container">
      <div className="landingone-div"></div>
      <div>
        <h1> Tournahub </h1>
        <h3> Game On, Connect Strong</h3>
      </div>
      <div>
        <u><h4>Why choose us?</h4></u>
        <i><p> Simplicity meets intuitivity. Take the stress out of tournament management </p></i>
      </div>
      <div className="flex-container">
    <div className="animation-container">
    <div className="text-container">
      <u><h5>Simple & Intuitive</h5></u>
      <i><h6>Register, organize, compete. It's just that simple.</h6></i>
    </div>
  </div>

  <div className="animation-container">
    <div className="text-container2">
      <u><h5>Free-to-experience</h5></u>
      <i><h6>Wide variety of functionalities available for free. No hidden charges.</h6></i>
    </div>
  </div>

  <div className="animation-container">
    <div className="text-container3">
      <u><h5>Flexible & Customizable</h5></u>
      <i><h6>Just choose the sport and format you desire.</h6></i>
    </div>
  </div>
</div>

        
      <u><h4>To date we have:</h4></u>
        <div className="flex-container animation-container">
          <div> <h5> {userCount} </h5> <h6> Registered Active Users </h6></div>
          <div> <h5> {tournamentCount}</h5> <h6> Tournaments Organised </h6></div>
        </div>
  
      <u><h4>Reviews:</h4></u>
      <div className="flex-container animation-container">
          {reviews.slice(0, 3).map((review, index) => (
          <div key={index}>
            <h6>{`Testimonial ${index + 1}`}</h6>
            <h6><Rating name="simple-controlled" value={review.star} readOnly/></h6>
            <h6>{review.text}</h6>
          </div>
        ))}
        </div>
        <u><h4>Trusted by our sponsors:</h4></u>
        <div className="flex-container animation-container">
        {sponsorIcons.slice(0, 3).map((sponsorIcon, index) => (
        <div key={index}>
        <img
            width={"150px"}
            src={`${domainName}/sponsoricon/${sponsorIcon.icon}`}
            alt={sponsorIcons.icon}
            onClick={() => window.open(sponsorIcon.urlLink)}
            onError={(e) => {
              // Handle image load error & display error image
              console.error("Error loading image:", e);
              e.target.src = 'https://i.imgur.com/7qHPfQf.png';
            }}
          />
          </div>
          ))}
        </div>     
    </div>
    
  );
}
