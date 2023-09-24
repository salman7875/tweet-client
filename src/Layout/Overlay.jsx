const Overlay = ({ children }) => {
  return (
    <div
      className={`h-[90vh] bg-slate-200 relative top-0 bottom-[-90vh] z-20 transition-all ease-in-out duration-500`}
    >
      {children}
    </div>
  );
};

export default Overlay;
