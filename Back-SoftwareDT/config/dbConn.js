import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

/**
 * 🛰️ SOFTWARE DT - MULTI-CLUSTER MANAGER (Nivel S+)
 * Optimización de túneles de datos para Datacenters independientes.
 */
const initializeConnection = (uri, name, dbName) => { 
    if (!uri) {
        console.error(`⚠️ SDT CRITICAL ERROR: La URI para [${name}] no está definida en el entorno.`);

        return mongoose.createConnection(); 
    }

    const connectionOptions = {
        maxPoolSize: 20, // Escalabilidad para 20 peticiones simultáneas por cluster
        minPoolSize: 5,
        serverSelectionTimeoutMS: 15000, 
        socketTimeoutMS: 45000,    
        family: 4, 
        dbName: dbName, // 🎯 Fuerza el Namespace específico en Atlas (sdt o sdt_citas)
        heartbeatFrequencyMS: 10000 
    }; 
    
    const connection = mongoose.createConnection(uri, connectionOptions);
    
    connection.on('connected', () => {
        console.log(`📡 [${name}] ONLINE -> Datacenter: ${dbName}`);
    });
    
    connection.on('error', (err) => {
        console.error(`❌ SDT ARCHITECT ERROR [${name}]:`, err.message);
    });

    connection.on('disconnected', () => {
        console.warn(`🛰️ [${name}] OFFLINE: Intentando reconexión automática en el nodo...`);
    });

    return connection;
};

/**
 * 🗄️ EXPORTACIÓN DE DATACENTERS ESPECÍFICOS
 * Estos pools se deben usar en los modelos para aislar el tráfico de datos.
 */

// 🟢 Cluster Principal de Usuarios e Infraestructura (DB: sdt)
// Vinculado a: User.js y Product.js 
export const userDB = initializeConnection(
    process.env.MONGODB_URI_USUARIOS, 
    'USER-DATACENTER', 
    'sdt'
);

// 🔵 Cluster de Gestión Operativa (DB: sdt_citas)
// Vinculado a: Cita.js y logs de citas
export const citaDB = initializeConnection(
    process.env.MONGODB_URI_CITAS, 
    'CITAS-DATACENTER', 
    'sdt_citas'
);

// Exportación unificada para mantenimiento global del sistema
export default { userDB, citaDB };

        
  


