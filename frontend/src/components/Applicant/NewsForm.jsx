import axios from "axios";
import React, { useEffect, useState } from "react";
import NavbarA from "./NavbarA";

const NewsForm = () => {
  // const [image, setImage] = useState("");
  const [sports, setSports] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [newsData, setnewsData] = useState({
    category: "",
    title: "",
    content: "",
    author: "",
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
  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await axios.get("http://localhost:3001/ManageSports");
        setSports(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSports();
    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      const category = document.querySelector('select[name="category"]').value;
      setnewsData({
        ...newsData,
        category: category,
      });
      const { status } = await axios.post(
        "http://localhost:3001/api/news/create",
        newsData
      );
      if (status === 200) {
        alert("News created successfully!");
      } else {
        alert("Failed to create news. Please try again.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavbarA />
      <h1>Write a new article:</h1>
      <form action="">
        <h6>Select sport category:</h6>
        <select type="select" name="category" onChange={handleInputChange}>
          {sports.map((sport) => (
            <option key={sport.id} value={sport.name}>
              {sport.name}
            </option>
          ))}
        </select>
      </form>
      <input
        type="text"
        name="title"
        id=""
        placeholder="Enter a title"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="author"
        id=""
        placeholder="Enter Author name"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="content"
        id=""
        placeholder="Enter the article content"
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
