import Button from '../components/Button'

export default function Home() {
    return (
        <div>
            <section 
                className="w-full flex flex-col items-center h-screen text-gray-400 p-2 relative"
                style={{
                    backgroundImage: `url('/images/reception2.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    height: '100vh',
                }}
            >
                <div className="absolute inset-0 bg-black opacity-70"></div>

                <nav className="w-full py-2 bg-transparent flex justify-start items-center border-b-2 border-gray-400 relative">
                    <p className="text-xl">Philopethotels</p>
                </nav>
                <div className="w-full flex justify-between items-center my-2 relative">
                    <p className="text-xl">Let's Make Your Stay Unforgettable</p>
                    <nav className="flex items-center justify-between w-1/4">
                        <Button text="Rooms" />
                        <Button text="Menu" />
                        <Button text="Book" />
                    </nav>
                </div>
                <div className='absolute bottom-6 left-0 flex items-center justify-between w-full px-3 my-1'>
                    <p>Not just a hotel, <br /> but a place that feels like home</p>
                    <button className='transparent border-2  border-gray-500 hover:bg-white-700 hover:text-black text-gray-500 font-medium py-1 px-4 rounded-4xl transition-all duration-300 ease-in-out transform hover:translate-x-1'>Check Rooms</button>
                </div>
            </section>
        </div>
    );
}
