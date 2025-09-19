const Sidebar = ({navigationList}) => {
    const navigations = navigationList

    return (
        <>
        {
            navigations && navigations.map((navigation) => {
            return (
                <a 
                className={`underline-custom hidden xl:block ${showNavbar ? '' : 'disabled'}`} 
                key={navigation.id} 
                href="/"
                >
                {navigation.name}
                </a>
            )
            })
        }
        </>
    )
}

export default Sidebar