





    // 2. INTERCEPTOR DE RESPUESTA
    axiosPrivate.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;



           
                

            return Promise.reject(error);
        }
    );
};