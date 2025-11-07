import axios from 'axios';
import refreshAccessToken from '../utils/refreshAccess';

const BASE_URL = 'http://localhost:5000/api';

// ----------------------------------------------------------------------
// 1. INSTANCIA DE AUTENTICACIÓN (Para Login, Register, Refresh, Logout)
// Requiere 'withCredentials: true' para manejar la cookie 'jwt' (Refresh Token).
// Se usa para las rutas que NO necesitan el Access Token en el Header.
// ----------------------------------------------------------------------

export const axiosAuth = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

// ----------------------------------------------------------------------
// 2. INSTANCIAS PRIVADAS (Para Rutas Protegidas)
// NO requieren 'withCredentials: true'. El token va en el Header.
// Estas son las que necesitan la lógica del Interceptor.
// ----------------------------------------------------------------------

export const axiosPrivateUsers = axios.create({
    baseURL: `${BASE_URL}/user`, // Base URL específica para rutas protegidas de usuario
});

export const axiosPrivateDoctor = axios.create({
    baseURL: `${BASE_URL}/doctor`, // Base URL específica para rutas protegidas de doctor
});

// ----------------------------------------------------------------------
// 3. CONFIGURACIÓN DEL INTERCEPTOR (Añade Token y Maneja 401)
// ----------------------------------------------------------------------

/**
 * Configura los interceptores de respuesta para las instancias privadas.
 * @param {Function} setToken Función para actualizar el estado del token.
 */
const setupInterceptors = (setToken) => {
    // Definimos el interceptor que aplicaremos a ambas instancias privadas.
    const interceptor = axiosPrivateInstance => {
        axiosPrivateInstance.interceptors.response.use(
            (response) => response,
            async (error) => {
                const { config, response: { status } } = error;
                const originalRequest = config;

                // Solo intenta refrescar si es 401 (Unauthorized) y no es ya un reintento
                if (status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        // Llama a la función de refresh para obtener un nuevo Access Token.
                        const accessToken = await refreshAccessToken(setToken);
                        
                        // Actualiza el header del request original con el nuevo token.
                        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                        
                        // Re-ejecuta la petición original.
                        return axiosPrivateInstance(originalRequest);
                    } catch (refreshError) {
                        // Si el refresh falla (ej. 401 del refresh), el bucle se detiene
                        // y el hook/context que llama a refreshAccessToken debe forzar el logout.
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }
        );
    };

    // Aplicar el interceptor a las instancias privadas
    interceptor(axiosPrivateUsers);
    interceptor(axiosPrivateDoctor);
};

export { 
    axiosAuth, 
    axiosPrivateUsers, 
    axiosPrivateDoctor, 
    setupInterceptors 
};