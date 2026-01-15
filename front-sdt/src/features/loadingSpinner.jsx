const Spinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[50px]">
      
      <div 
        className="
          w-12 h-12 
          border-4 border-solid 
          rounded-full 
          border-gray-200 
          border-t-indigo-500 
          animate-spin
        "
      >
      </div>

    </div>
  );
}

export default Spinner;