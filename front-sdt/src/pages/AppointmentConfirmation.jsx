import { useLocation, Link } from "react-router-dom";
import {
  Calendar,
  User,
  Clock,
  CheckCircle,
  Briefcase,
  ExternalLink,
  ArrowRight,
  Mail
} from "lucide-react";

const IconWrapper = ({ children }) => (
  <div className="p-3 rounded-full bg-black text-amber-500 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-lg">
    {children}
  </div>
);

const AppointmentConfirmation = () => {

  );
};

const DetailItem = ({ icon, title, value }) => (
  <div className="group flex items-center p-5 bg-white border border-gray-200 rounded-2xl transition-all duration-300 hover:border-black hover:shadow-lg">
    <div className="text-black group-hover:text-amber-600 transition-colors mr-4 bg-gray-100 p-3 rounded-xl group-hover:bg-black">
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-black text-black uppercase tracking-widest opacity-50">{title}</p>
      <p className="text-md font-extrabold text-black uppercase">{value}</p>
    </div>
  </div>
);

export default AppointmentConfirmation;