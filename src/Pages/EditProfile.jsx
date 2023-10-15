import { useContext, useEffect, useState } from "react";
import Header from "../Component/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/auth";
import { hostEndPoint, localEndPoint } from "../Utils/request";

const EditProfile = () => {
  const { token, currentUser: user, loading, error } = useContext(AuthContext);
  const [avatar, setAvatar] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    bio: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      username: user.username,
      name: user.name,
      bio: user.bio,
    });
  }, [user]);

  const formChangeHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const convertToBase64 = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setAvatar(reader.result);
    };
    reader.onerror = (err) => {
      console.log(err);
    };
  };

  const resetForm = () => {
    setAvatar("");
    setFormData({
      username: "",
      name: "",
      bio: "",
    });
  };

  const editProfileHandler = async () => {
    try {
      const { data } = await axios.put(
        `${localEndPoint}/edit`,
        { ...formData, avatar },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      if (!data.success) {
        throw new Error("Something went wrong. Edit-Profile!");
      } else {
        navigate("/profile");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section>
      <Header>
        <h1 className="text-3xl font-medium">Edit Profile</h1>
        <button>
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
        </button>
      </Header>
      <div className="flex flex-col items-center mt-5">
        <img
          src={`data:image/jpeg;base64${user?.avatar}`}
          alt=""
          className="w-32 h-32 rounded-full object-cover"
        />
        <input
          type="file"
          className="ms-20 mt-4"
          name="avatar"
          onChange={convertToBase64}
        />
      </div>
      <div className="flex flex-col gap-2 mt-4 px-4">
        <label
          htmlFor="username"
          className="text-xl font-semibold text-gray-700"
        >
          Username:{" "}
        </label>
        <input
          type="text"
          placeholder="username"
          className="py-2 px-4 mb-2 text-xl rounded-sm"
          name="username"
          defaultValue={user?.username}
          onChange={formChangeHandler}
        />
        <label htmlFor="name" className="text-xl font-semibold text-gray-700">
          Name:{" "}
        </label>
        <input
          type="text"
          placeholder="Name"
          className="py-2 px-4 mb-2 text-xl rounded-sm"
          // value={formData.name}
          defaultValue={user?.name}
          name="name"
          onChange={formChangeHandler}
        />
        <label htmlFor="bio" className="text-xl font-semibold text-gray-700">
          Bio:{" "}
        </label>
        <input
          type="text"
          placeholder="bio"
          className="py-2 px-4 mb-2 text-xl rounded-sm"
          defaultValue={user?.bio}
          name="bio"
          onChange={formChangeHandler}
        />
      </div>
      <div className="flex justify-end gap-4 px-4 mt-5">
        <button
          className="py-2 px-7 text-xl font-medium border-2 border-gray-600 rounded-sm"
          onClick={resetForm}
        >
          Cancel
        </button>
        <button
          className="py-2 px-7 text-xl font-medium border-2 border-gray-600 rounded-sm"
          onClick={editProfileHandler}
        >
          Edit
        </button>
      </div>
    </section>
  );
};

export default EditProfile;
