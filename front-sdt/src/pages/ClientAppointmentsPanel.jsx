import { useState, useEffect, useContext, useCallback } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { axiosPrivate } from "../API/api.js";
import { 
  PlusCircle, Mail, MessageCircle, ArrowUpRight, Loader2, Save
} from "lucide-react";
import { toast } from "react-hot-toast"; // Asumiendo que usas toast para feedback profesional

          </div>
        </aside>
      </div>
    </div>
  );
};

export default ClientAppointmentsPanel;