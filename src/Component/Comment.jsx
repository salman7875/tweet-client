import { Link } from "react-router-dom";

const Comment = ({ comment }) => {
  return (
    <ul className="mt-2 px-3">
      <li className="py-3 shadow-sm">
        <Link to="#" className="flex items-start gap-2">
          <img
            src={`data:image/jpeg;base64${comment.user.avatar}`}
            alt=""
            className="w-14 h-14 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="font-medium text-xl">{comment.user.username}</span>
            <span>{comment.comment}</span>
          </div>
        </Link>
      </li>
    </ul>
  );
};

export default Comment;
