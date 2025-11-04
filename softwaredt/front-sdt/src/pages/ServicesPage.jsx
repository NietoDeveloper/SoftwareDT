import React from 'react';

const ServicesList = () => {
  const services = [
    { title: 'Service 1', subtitle: 'Subtitle 1', description: 'Description for service 1.', photo: 'https://via.placeholder.com/150', price: '$100 - $200' },
    { title: 'Service 2', subtitle: 'Subtitle 2', description: 'Description for service 2.', photo: 'https://via.placeholder.com/150', price: '$150 - $250' },
    { title: 'Service 3', subtitle: 'Subtitle 3', description: 'Description for service 3.', photo: 'https://via.placeholder.com/150', price: '$200 - $300' },
    { title: 'Service 4', subtitle: 'Subtitle 4', description: 'Description for service 4.', photo: 'https://via.placeholder.com/150', price: '$250 - $350' },
    { title: 'Service 5', subtitle: 'Subtitle 5', description: 'Description for service 5.', photo: 'https://via.placeholder.com/150', price: '$300 - $400' },
    { title: 'Service 6', subtitle: 'Subtitle 6', description: 'Description for service 6.', photo: 'https://via.placeholder.com/150', price: '$350 - $450' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {services.map((service, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
          <img src={service.photo} alt={service.title} className="w-32 h-32 mb-2" />
          <h2 className="text-xl font-bold mb-1">{service.title}</h2>
          <h3 className="text-lg font-semibold mb-2">{service.subtitle}</h3>
          <p className="text-gray-700 mb-2">{service.description}</p>
          <p className="text-gray-900 font-bold">{service.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ServicesList;