import { Link, useNavigate } from "react-router-dom";
import Header from "../Component/Header";
import { useState } from "react";
import axios from "axios";

const CreatePost = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [caption, setCaption] = useState("");

  const token = localStorage.getItem("token");

  const convertBase64 = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setContent(reader.result);
    };
    reader.onerror = (err) => {
      console.log(err);
    };
  };

  const uploadPostHandler = async () => {
    try {
      const formData = { content, caption };
      const { data } = await axios.post(
        "http://localhost:5000/api/tweets/create",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      setContent("");
      setCaption("");
      if (data.success) {
        navigate("/profile");
      } else {
        throw new Error({ message: "Something went wrong, Posting!" });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <section>
      <Header>
        <h1 className="text-2xl font-medium">Create Post</h1>
        <Link to="..">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Link>
      </Header>
      <div className="p-3">
        <input
          type="file"
          placeholder="Upload post..."
          onChange={convertBase64}
        />
        {content && (
          <img
            src={`data:image/jpeg;base64${content}`}
            alt="test img"
            className="w-full h-80 object-cover my-2"
          />
        )}
        <input
          type="text"
          placeholder="What's on your mind..."
          className="py-2 px-4 outline-none text-xl focus:ring-2 focus:ring-inset focus:ring-blue-950 rounded-sm w-[80%]"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <div className="flex justify-end gap-4 mt-5">
          <button className="py-2 px-7 font-semibold text-xl border-2 border-gray-600 rounded-md">
            Cancel
          </button>
          <button
            className="py-2 px-7 font-semibold text-xl border-2 border-gray-600 rounded-md"
            onClick={uploadPostHandler}
          >
            Post
          </button>
        </div>
      </div>
    </section>
  );
};

export default CreatePost;
