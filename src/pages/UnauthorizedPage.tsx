import { useNavigate } from "react-router-dom";

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex flex-row justify-center items-center">
      <div className="flex flex-col items-center">
        <p className="text-gray-500 text-9xl opacity-70">401</p>
        <p className="text-xl">Unauthorized Page</p>
        <button onClick={() => navigate('/')} className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md cursor-pointer">Return Home</button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
