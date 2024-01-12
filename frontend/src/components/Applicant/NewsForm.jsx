import axios from "axios";
import React, { useEffect, useState } from "react";
import NavbarA from "./NavbarA";

const NewsForm = () => {
  // const [image, setImage] = useState("");
  const [sports, setSports] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allNews, setAllNews] = useState([]);

  const [newsData, setnewsData] = useState({
    category: "",
    title: "",
    content: "",
    author: "",
    photo: "",
    user: "null",
  });

  const handleInputChange = (e) => {
    setnewsData({
      ...newsData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    setnewsData({
      ...newsData,
      photo: e.target.files[0],
    });
    console.log(newsData.photo);
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
    fetchAllNews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", newsData.title);
      formData.append("author", newsData.author);
      formData.append("content", newsData.content);
      formData.append("category", newsData.category);
      formData.append("photo", newsData.photo);
      formData.append("user", newsData.user._id);

      const response = await axios.post(
        "http://localhost:3001/api/news/create",
        formData
      );

      console.log(response.data);

      setnewsData({
        category: "",
        title: "",
        content: "",
        author: "",
        photo: "",
        user: "null",
      });
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  const fetchAllNews = async () => {
    try {
      const { data, status } = await axios.get(
        "http://localhost:3001/api/news/all"
      );
      setAllNews(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteNews = async (newsId) => {
    try {
      const { status } = await axios.delete(
        `http://localhost:3001/api/news/${newsId}`
      );
      if (status === 200) {
        fetchAllNews();
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
        type="file"
        accept=".png, .jpg, .jpeg"
        src=""
        alt=""
        name="photo"
        placeholder="paste photo"
        onChange={handleImage}
      />
      <button onClick={handleSubmit}>Submit</button>
      <div>
        {allNews.map((newss) => {
          return (
            <>
              <div>
                <p>{newss.user?.name}</p>
                <h5>{newss.title}</h5>
                <p>Category: {newss.category}</p>
                <h6>{newss.content}</h6>
                {user?._id === newss.user?._id && (
                  <button onClick={() => handleDeleteNews(newss._id)}>
                    Delete
                  </button>
                )}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default NewsForm;
