
        toast.error("Fallo de red o servidor no disponible. Por favor, inténtalo más tarde.");
      }
      throw error;
    }
  };


  if (doctors.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-semibold text-gray-700">¡Vaya! No se encontraron Servicios disponibles.</h1>
        <p className="text-gray-500 mt-2">Por favor, inténtalo de nuevo más tarde. ( Error cargando....)</p>
      </div>
    );
  }

  const navigateToBooking = (doctorId) => {
    navigate(`/book-appointment/${doctorId}`);
  };

  const containerClasses =
    doctors.length === 1
      ? "flex items-center justify-center min-h-screen"
      : "min-h-screen";

  return (
    <div className={`mx-auto px-4 py-8 ${containerClasses}`}>
      <div
        className={`container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${
          doctors.length === 1 ? 'w-full max-w-lg' : ''
        }`}
      >
        {doctors.map((doctor) => (
          <div
            key={doctor._id}
            className="group bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer flex flex-col items-center text-center h-[300px]"
            onClick={() => navigateToBooking(doctor._id)}
          >
            <h1 className="text-xl font-semibold mb-2">{doctor.name}</h1>
