import Header from "../Component/Header";
import Comment from "../Component/Comment";
import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/auth";
import { hostEndPoint, localEndPoint } from "../Utils/request";

const Comments = () => {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { currentUser, loading, error } = useContext(AuthContext);

  useEffect(() => {
    const fetchComments = async (id) => {
      try {
        const { data } = await axios.get(
          `${localEndPoint}/tweets/comments/${id}`
        );
        if (!data.success) {
          throw new Error("Something went wrong. Comments!");
        } else {
          setComments(data.userComment.comments);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchComments(id);
  }, [comment]);

  const createComment = async () => {
    try {
      const { data } = await axios.post(
        `${localEndPoint}/tweets/${id}`,
        { comment },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      setComment("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section>
      <Header>
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
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </Link>
        <h1 className="text-3xl font-medium">Comment</h1>
      </Header>
      <div className="flex items-center justify-around gap-2 py-1 shadow-md">
        <img
          src={`data:image/jpeg;base64${currentUser?.avatar}`}
          alt=""
          className="w-12 h-12 rounded-full object-cover"
        />
        <input
          type="text"
          placeholder="Add a Comment..."
          className="py-2 px-3 outline-none w-[70vw]"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
        <button onClick={createComment}>
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
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
      {comments &&
        comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
    </section>
  );
};

export default Comments;
