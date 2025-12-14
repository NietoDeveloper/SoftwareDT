import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios"; 
import Footer from "../components/Footer/Footer"; 



const DoctorList = () => {
  const navigate = useNavigate();




  return (
    <div>
    <div className={`mx-auto px-4 py-8 ${containerClasses}`}>
      <div
        className={`container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${
          doctors.length === 1 ? 'w-full max-w-lg' : ''
        }`}
      >
        {doctors.map((doctor) => (
          <div
            key={doctor._id}
            className="group bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer flex flex-col items-center text-center h-[300px]"
            onClick={() => navigateToBooking(doctor._id)}
          >
            <h1 className="text-xl font-semibold mb-2">{doctor.name}</h1>
            <h2 className="text-gray-600 mb-2">{doctor.specialization}</h2>
            <p className="text-yellow-500 mb-4">
              Puntaje: {doctor.totalRating}
            </p>
            <p className="text-gray-700 mb-4 line-clamp-2 flex-grow overflow-hidden">{doctor.bio}</p>

        ))}
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default DoctorList;