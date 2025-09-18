const Header = ({status, title}) => {
  return (
    <div className="flex flex-col gap-1">
        <h1 
          data-aos="fade-up" 
          data-aos-duration="700"
          data-aos-delay="0"
          className="font-custom text-xl"
        >
          {status}
        </h1>
        
        <h2 
          data-aos="fade-up" 
          data-aos-duration="700"
          data-aos-delay="200"
          className="font-custom-bold text-5xl"
        >
          {title}
        </h2>
    </div>
  )
}

export default Header