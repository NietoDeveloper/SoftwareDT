





    // 2. INTERCEPTOR DE RESPUESTA
    axiosPrivate.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;



           
                
              

                originalRequest._retry = true;
                isRefreshing = true;

                return new Promise(async (resolve, reject) => {
                    try {
                        console.log("🔄 SDT Security: Renovando acceso...");
                        const newAccessToken = await refreshAccessToken();
                        
                        const cleanNewToken = getCleanToken(newAccessToken);
                        
                        if (!cleanNewToken) throw new Error("Refresh fallido");

                        setAccessToken(cleanNewToken); // Actualiza Contexto
                        localStorage.setItem('token', cleanNewToken); // Actualiza Disco
                        
                        originalRequest.headers.Authorization = `Bearer ${cleanNewToken}`;
                        processQueue(null, cleanNewToken);
                        resolve(axiosPrivate(originalRequest));
                    } catch (refreshError) {
                        processQueue(refreshError, null);
                        console.error("🚨 SDT: Sesión caducada definitivamente.");
                        if (onLogout) onLogout();
                        reject(refreshError);
                    } finally {
                        isRefreshing = false;
                    }
                });
            }

            return Promise.reject(error);
        }
    );
};