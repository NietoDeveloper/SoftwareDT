
import React from 'react';

const ServicesList = () => {
  const services = [
    { name: 'Service 1', description: 'Description for service 1.' },
    { name: 'Service 2', description: 'Description for service 2.' },
    { name: 'Service 3', description: 'Description for service 3.' },
    { name: 'Service 4', description: 'Description for service 4.' },
    { name: 'Service 5', description: 'Description for service 5.' },
    { name: 'Service 6', description: 'Description for service 6.' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {services.map((service, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-bold mb-2">{service.name}</h2>
          <p className="text-gray-700">{service.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ServicesList;