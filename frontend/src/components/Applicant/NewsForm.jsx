import axios from "axios";
import React, { useEffect, useState } from "react";

const NewsForm = () => {
  const [newsData, setnewsData] = useState({
    category: "",
    title: "",
    content: "",

    image: "",
  });

  const handleInputChange = (e) => {
    setnewsData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleSubmit = async () => {
    try {
      const { status } = await axios.post(
        "http://localhost:3001/api/news/create",
        newsData
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>new form </h1>
      <form action="">
        <select name="category" id="" onChange={handleInputChange}>
          <option value="category">category</option>
          <option value="Soccer">Soccer</option>
          <option value="Badminton">Badminton</option>
          <option value="Basketball">Basketball</option>
        </select>
      </form>
      <input
        type="text"
        name="title"
        id=""
        placeholder="enter a title"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="content"
        id=""
        placeholder="enter the content"
        onChange={handleInputChange}
      />
      <input
        type="text"
        src=""
        alt=""
        name="image"
        placeholder="paste image url "
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default NewsForm;
