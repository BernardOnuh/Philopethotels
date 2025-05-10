import Button from '../components/Button';
import { Link } from 'react-router';

export default function Home({ scrollToBottom }) {
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
                </nav>

                <div className="w-full flex flex-col md:flex-row justify-between items-center my-4 relative px-4 md:px-8">
                    <p className="text-lg md:text-2xl text-center md:text-left font-semibold text-white">
                        Let's Make Your Stay Unforgettable
                    </p>
                    <nav className="flex flex-col md:flex-row items-center justify-center md:justify-between w-full md:w-1/3 mt-4 md:mt-0">
                        <Link to="/rooms" className='mt-4'>
                            <Button text="Rooms" />
                        </Link>
                        <Link to="/menu" className='mt-4'>
                            <Button text="Menu" />
                        </Link>
                        <div onClick={scrollToBottom} className='mt-4'>
                            <Button text="Book" />
                        </div>
                    </nav>
                </div>

                {/* Footer Section */}
                <div className="absolute bottom-6 left-0 flex flex-col md:flex-row items-center justify-between w-full px-4 md:px-8 my-1">
                    <p className="text-sm md:text-base text-center md:text-left text-white">
                        Not just a hotel, <br /> but a place that feels like home
                    </p>
                    <Link to="/rooms">
                        <button className="mt-4 md:mt-0 transparent border-2 border-gray-500 hover:bg-white hover:text-black text-gray-500 font-medium py-2 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:translate-x-1">
                            Check Rooms
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
}