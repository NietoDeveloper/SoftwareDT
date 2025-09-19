import '../index.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Button from './Button'
import Header from './Header'
import { useEffect } from 'react';

const Section = ({asset, headerStatus, headerTitle, btnTarget, btnText}) => {
    const assetUrl = `/${asset}`;
    const isVideo = assetUrl.endsWith('.mp4') || assetUrl.endsWith('.webm');

    useEffect(() => {
        AOS.init({
            once: true,
        });
    }, [])

    return (
        <section className={`h-[100vh] w-full relative flex justify-center`}>
            {isVideo ? (
                <video autoPlay loop muted className="absolute w-full h-full object-cover" src={assetUrl} />
            ) : (
                <div className="absolute w-full bg-center h-full" style={{backgroundImage: `url(${assetUrl})`, backgroundSize: 'cover'}} />
            )}
            
            <div className="flex flex-col gap-8 text-white absolute left-16 bottom-24 md:left-32 md:bottom-32">
                <Header 
                    status={headerStatus}
                    title={headerTitle}
                />
                <Button 
                    target={btnTarget}
                    text={btnText}
                />
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" class="animate-chevron text-white bottom-10 absolute icon icon-tabler icon-tabler-chevron-down" width="48" height="48" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M6 9l6 6l6 -6" />
            </svg>
        </section>
    )
}

export default Section