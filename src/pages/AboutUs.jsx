import Image from '../components/Image';

export default function AboutUs() {
    return (
        <div className="flex flex-col items-center text-black min-h-screen bg-white py-10 px-6">
            {/* Title Section */}
            <h1 className="my-2 text-center text-gray-400 bg-transparent border-2 rounded-4xl border-gray-200 px-4 py-1 hover:bg-black hover:text-white transition-all duration-300">
                About Us
            </h1>
            <p className="text-center my-2 text-3xl md:text-5xl font-bold">Welcome to Philopethotels</p>
            <p className="text-center my-4 text-sm md:text-lg text-gray-600">
                From luxurious suites to personalized experiences, Philopethotels is designed to make
                <br />
                every guest feel at home. Discover the perfect blend of nature, elegance, and warmth.
            </p>

            {/* Image Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full md:w-2/3 mt-6">
                <Image
                    src={'/images/hotel1.jpg'}
                    alt={'hotel1'}
                    className="h-40 w-full rounded-lg hover:scale-105 transition-transform duration-300"
                />
                <Image
                    src={'/images/hotel2.jpg'}
                    alt={'hotel2'}
                    className="h-40 w-full rounded-lg hover:scale-105 transition-transform duration-300"
                />
                <Image
                    src={'/images/hotel2.avif'}
                    alt={'hotel3'}
                    className="h-40 w-full rounded-lg hover:scale-105 transition-transform duration-300"
                />
                <Image
                    src={'/images/hotel4.avif'}
                    alt={'hotel4'}
                    className="h-40 w-full rounded-lg hover:scale-105 transition-transform duration-300"
                />
                <Image
                    src={'/images/hotel5.avif'}
                    alt={'hotel5'}
                    className="h-40 w-full rounded-lg hover:scale-105 transition-transform duration-300"
                />
                <Image
                    src={'/images/environ1.jpg'}
                    alt={'hotel6'}
                    className="h-40 w-full rounded-lg hover:scale-105 transition-transform duration-300"
                />
            </div>
        </div>
    );
}