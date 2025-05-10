import Image from '../components/Image'

export default function AboutUs () {
    return (
        <div className="flex flex-col items-center text-black h-screen bg-white py-10 px-6">
            <h1 className="my-2 text-center text-gray-400 bg-transparent border-2 rounded-4xl border-gray-200 px-4 py-1 hover:bg-black hover:text-white ">About us</h1>
            <p className="text-center my-2 text-5xl">Welcome to Philopethotels</p>
            <p className="text-center my-4">From luxirious siutes to personalized experiences. Philipethotels is designed to make <br /> every guest feel at home. Discover the perfect blend of nature, elegence and warmth</p>
            <div className='w-2/3 flex items-end justify-center'>
                <Image src={'/images/hotel1.jpg'} alt={'hotel1'} className={'rounded-3xl shadow-md'} />
                <Image src={'/images/hotel2.jpg'} alt={'hotel2'} className={'h-16'} />
                <Image src={'/images/hotel3.jpg'} alt={'hotel3'} className={'rounded-3xl shadow-md'} />
            </div>
            <div className='w-2/3 flex items-start justify-center'>    
                <Image src={'/images/hotel4.jpg'} alt={'hotel4'} className={'rounded-3xl shadow-md'} />
                <Image src={'/images/hotel5.jpg'} alt={'hotel5'} className={'h-16'} />
                <Image src={'/images/environ1.jpg'} alt={'hotel6'} className={'rounded-3xl shadow-md'} />
            </div>
        </div>
    )
}

