import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="min-h-screen bg-[url('https://images.unsplash.com/photo-1693229789648-7464bee1bf76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDkxfHhIeFlUTUhMZ09jfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60')] bg-no-repeat bg-cover flex flex-col items-center justify-center">
      <h1 className="text-3xl text-white font-semibold">
        404 - Page Not Found
      </h1>
      <Link to='/' className="mt-5 border-2 border-gray-100 text-white py-3 px-6 text-xl">
        Back to Home
      </Link>
    </section>
  );
};

export default NotFound;
