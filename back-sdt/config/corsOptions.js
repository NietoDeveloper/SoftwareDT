const allowedOrigins = [
    'http://localhost:5173',          // Desarrollo local
    'https://softwaredt.vercel.app'   // Producción en Vercel 🚀
];

const corsOptions = {
    origin: (origin, callback) => {
        // Permitir si el origen está en la lista o si no hay origen (como Postman/Server-side)
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
};

module.exports = corsOptions;