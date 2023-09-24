const PostOption = ({ children }) => {
  return (
    <div className="absolute right-2 bottom-[-35px] border-2 bg-slate-300 border-gray-900 z-10 flex flex-col">
      {children}
    </div>
  );
};

export default PostOption;
