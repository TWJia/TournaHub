import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import NavbarA from "./NavbarA";

const NewsForm = () => {
  // const [image, setImage] = useState("");
  const [sports, setSports] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allNews, setAllNews] = useState([]);
  const title = useRef(null);
  const author = useRef(null);
  const content = useRef(null);
  const photo = useRef(null);
  const category = useRef("");
  const [organizerId, setorganizerId] = useState("");

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
  useEffect(() => {
    // Set the initial value of organizerId when the component mounts
    setorganizerId(user ? user._id : "");
  }, [user]);

  const handleImage = (e) => {
    setnewsData({
      ...newsData,
      photo: e.target.files[0],
    });
    console.log(newsData.photo);
  };

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
      formData.append("user", user._id);

      const response = await axios.post(
        "http://localhost:3001/api/news/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Make sure to set the content type
          },
        }
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
      title.current.value = "";
      content.current.value = "";
      author.current.value = "";
      photo.current.value = "";
      category.current.value = "";

      // Fetch all news after successful submission
      fetchAllNews();
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

  // const handleDeleteNews = async (newsId) => {
  //   try {
  //     const { status } = await axios.delete(
  //       `http://localhost:3001/api/news/${newsId}`
  //     );
  //     if (status === 200) {
  //       fetchAllNews();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleDeleteNews = async (newsId) => {
    try {
      console.log("Deleting news with ID:", newsId);

      const { status } = await axios.delete(
        `http://localhost:3001/api/news/${newsId}`
      );

      console.log("Delete status:", status);

      if (status === 200) {
        fetchAllNews();
      }
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  return (
    <div>
      <NavbarA />
      <h1>Write a new article:</h1>
      <form action="">
        <h6>Select sport category:</h6>
        <select
          type="select"
          name="category"
          onChange={handleInputChange}
          ref={category}
        >
          {/* Placeholder or instruction option */}
          <option ref={category} value="" disabled selected>
            Select category
          </option>

          {/* Actual options from the sports array */}
          {sports.map((sport) => (
            <option key={sport.id} value={sport.name}>
              {sport.name}
            </option>
          ))}
        </select>
      </form>
      <input
        ref={title}
        type="text"
        name="title"
        id=""
        placeholder="Enter a title"
        onChange={handleInputChange}
      />
      <input
        ref={author}
        type="text"
        name="author"
        id=""
        placeholder="Enter Author name"
        onChange={handleInputChange}
      />
      <input
        ref={content}
        type="text"
        name="content"
        id=""
        placeholder="Enter the article content"
        onChange={handleInputChange}
      />
      <input
        ref={photo}
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
