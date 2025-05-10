import Button from '../components/Button';
import { Link } from 'react-router';
import { useState, useEffect} from 'react';

export default function Home({ scrollToBottom }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [width, setWidth] = useState(window.innerWidth)
    const toggleMenu = () => setMenuOpen(!menuOpen);
    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])
    return (
        <div>
            <section
                className="w-full flex flex-col items-center h-screen text-gray-400 p-4 relative"
                style={{
                    backgroundImage: `url('/images/reception2.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    height: '100vh',
                }}
            >
                <div className="absolute inset-0 bg-black opacity-70"></div>

                <nav className="w-full py-2 bg-transparent flex justify-between items-center border-b-2 border-gray-400 relative px-4 md:px-8">
                    <p className="text-xl md:text-2xl font-bold text-white">Philopethotels</p>
                    {width < 768 ? (
                        <div className="relative">
                            <button
                                style={{ cursor: 'pointer' }}
                                onClick={toggleMenu}
                                className="text-2xl text-white focus:outline-none py-1 px-2 border-2 border-gray-500 hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
                            >
                                ☰
                            </button>
                            {menuOpen && (
                                <nav className="absolute flex flex-col justify-center w-full top-16 right-20 z-10 transition-all duration-300 ease-in-out">
                                    <Link to="/rooms" className="text-white py-2 md:py-0">
                                        <Button text="Rooms" />
                                    </Link>
                                    <Link to="/menu" className="text-white py-2 md:py-0">
                                        <Button text="Menu" />
                                    </Link>
                                    <div onClick={scrollToBottom} className="text-white py-2 md:py-0">
                                        <Button text="Book" />
                                    </div>
                                </nav>
                            )}
                        </div>
                    ) : (
                        <nav className="flex items-center justify-between w-1/3">
                            <Link to="/rooms" className="text-white py-2 md:py-0">
                                <Button text="Rooms" />
                            </Link>
                            <Link to="/menu" className="text-white py-2 md:py-0">
                                <Button text="Menu" />
                            </Link>
                            <div onClick={scrollToBottom} className="text-white py-2 md:py-0">
                                <Button text="Book" />
                            </div>
                        </nav>
                    )}
                </nav>
                
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center max-w-md">
                    <img src="/images/star.png" alt="Star Icon" className="h-7 w-20" />
                    <p className="text-5xl text-center text-white">
                        ENJOY A LUXURY EXPERIENCE
                    </p>
                    <Link to="/rooms">
                        <Button text="Check Rooms" />
                    </Link>
                </div>
            </section>
        </div>
    );
}