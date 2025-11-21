import React, { useState, useEffect } from "react";
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';

// --- MOCK DE HOOKS ELIMINADOS y REEMPLAZADOS POR LÓGICA REAL DE FIREBASE ---
// Los hooks useParams, useNavigate y useLocation fueron eliminados ya que este ya no es una página de confirmación.

// --- CONFIGURACIÓN E INICIALIZACIÓN DE FIREBASE ---
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null;
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

let db = null;
let auth = null;
let app = null;

if (firebaseConfig) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
}

// --------------------------------------------------------------------------

// --- COMPONENTE AUXILIAR PARA MOSTRAR UNA TARJETA DE CITA EN LA LISTA ---
const AppointmentCard = ({ appointment }) => {
    const navigate = useMockNavigate(); // Mock de navegación

    const getStatusClasses = (status) => {
        switch (status) {
            case "Confirmada":
                return "bg-green-100 text-green-700 border-green-400";
            case "Pendiente":
                return "bg-yellow-100 text-yellow-700 border-yellow-400";
            case "Cancelada":
                return "bg-red-100 text-red-700 border-red-400";
            default:
                return "bg-gray-100 text-gray-700 border-gray-400";
        }
    };

    const statusClasses = getStatusClasses(appointment.status);

    // Formateo de la fecha para visualización
    const formattedDate = new Date(appointment.date).toLocaleDateString("es-ES", {
        weekday: "long", year: "numeric", month: "long", day: "numeric",
    });

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-5 mb-4 flex justify-between items-center transition duration-300 hover:shadow-xl hover:border-indigo-300 sm:flex-row flex-col sm:text-left text-center">
            
            {/* Detalles principales */}
            <div className="flex-1 min-w-0 mb-4 sm:mb-0">
                <h3 className="text-xl font-bold text-gray-900 truncate">
                    {appointment.doctorName || "Doctor Asignado"}
                </h3>
                <p className="text-sm text-indigo-600 font-medium">
                    {appointment.specialization || "Especialidad no definida"}
                </p>
            </div>

            {/* Fecha y Hora */}
            <div className="flex flex-col mx-4 items-center sm:items-start mb-4 sm:mb-0">
                <p className="text-lg font-semibold text-gray-800">{appointment.time}</p>
                <p className="text-sm text-gray-500 capitalize">{formattedDate}</p>
            </div>

            {/* Estado y Acción */}
            <div className="flex flex-col items-end">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${statusClasses}`}>
                    {appointment.status}
                </span>
                <button
                    onClick={() => navigate(`/appointment/${appointment.id}`)}
                    className="mt-3 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition duration-150"
                >
                    Ver Detalles &rarr;
                </button>
            </div>
        </div>
    );
};

// --- COMPONENTE DE CARGA (LOOP) ---
const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center p-10 bg-white rounded-xl shadow-lg border border-gray-200">
        <svg
            className="animate-spin h-8 w-8 text-indigo-600 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            ></circle>
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
        </svg>
        <p className="text-lg font-medium text-indigo-600">Cargando citas agendadas...</p>
    </div>
);

// --- COMPONENTE PRINCIPAL ---

const App = () => {
    // 1. Estados
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const [authReady, setAuthReady] = useState(false);

    // Mock de navegación para evitar errores
    const useMockNavigate = () => (path) => console.log(`Navigating to ${path}`);
    const navigate = useMockNavigate(); 

    // 2. Inicialización de Firebase y Autenticación
    useEffect(() => {
        if (!firebaseConfig) {
            console.error("Firebase no está configurado.");
            setLoading(false);
            return;
        }

        // 2a. Autenticación y obtención de userId
        const authenticate = async () => {
            try {
                if (initialAuthToken) {
                    await signInWithCustomToken(auth, initialAuthToken);
                } else {
                    await signInAnonymously(auth);
                }
            } catch (error) {
                console.error("Error durante la autenticación:", error);
            }
        };

        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                setUserId(null); // Desconectado o error
            }
            setAuthReady(true);
        });

        authenticate();
        return () => unsubscribeAuth();
    }, []);

    // 3. Carga de Datos (onSnapshot)
    useEffect(() => {
        if (!db || !authReady || !userId) {
            // No intentar cargar datos si Firebase no está listo o no hay userId
            if (authReady) setLoading(false);
            return; 
        }

        // RUTA DE FIRESTORE: /artifacts/{appId}/users/{userId}/appointments
        const collectionPath = `/artifacts/${appId}/users/${userId}/appointments`;
        const q = query(
            collection(db, collectionPath),
            // Nota: Se elimina orderBy para evitar errores de índice en este entorno.
        );

        console.log(`Intentando conectar a Firestore en: ${collectionPath} para userId: ${userId}`);

        // Escucha en tiempo real
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const clientAppointments = [];
            querySnapshot.forEach((doc) => {
                clientAppointments.push({ id: doc.id, ...doc.data() });
            });

            // Simulamos datos si la consulta está vacía para la previsualización, pero respetando el requisito de no mostrar datos falsos.
            // En este entorno, si la base de datos está vacía, aparecerá "No hay citas".
            if (clientAppointments.length === 0 && process.env.NODE_ENV !== 'production') {
                // MOCK DATA ONLY FOR PREVIEW, REMOVE IN REAL APP IF DONT WANT FAKE DATA
                // clientAppointments.push({ id: 'MOCK1', doctorName: 'Dr. Mock', specialization: 'General', date: new Date().toISOString().split('T')[0], time: '10:00', status: 'Confirmada' });
            }
            
            setAppointments(clientAppointments);
            setLoading(false);
        }, (error) => {
            console.error("Error al obtener citas en tiempo real:", error);
            setLoading(false);
        });

        // Limpieza de la suscripción al desmontar el componente
        return () => unsubscribe();
    }, [userId, authReady]);


    // 4. Renderizado condicional
    const renderContent = () => {
        if (loading) {
            return <LoadingSpinner />;
        }

        if (appointments.length === 0) {
            return (
                <div className="max-w-3xl mx-auto p-10 mt-12 bg-yellow-50 rounded-xl shadow-lg border border-yellow-300 text-center">
                    <h1 className="text-3xl font-bold text-yellow-800 mb-2">
                        🎉 ¡Todo Listo!
                    </h1>
                    <p className="text-xl text-yellow-700">
                        No tienes citas agendadas por el momento.
                    </p>
                    <button
                        onClick={() => navigate("/book")}
                        className="mt-6 py-2 px-6 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition shadow-md"
                    >
                        Agendar Primera Cita
                    </button>
                </div>
            );
        }

        return (
            <div className="space-y-4">
                {appointments.map((appointment) => (
                    <AppointmentCard key={appointment.id} appointment={appointment} />
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 font-sans">
            <div className="max-w-4xl mx-auto mt-12">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                    Mis Citas Agendadas
                </h1>
                <p className="text-xl text-gray-600 mb-8 border-b pb-4">
                    Revisa el estado y los detalles de tus próximas reservas médicas.
                </p>

                {renderContent()}

            </div>
        </div>
    );
};

export default App;