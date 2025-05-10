import { useNavigate } from 'react-router'
import Image from '../components/Image'

export default function Rooms() {
    const navigate = useNavigate();
    return (
        <div className="w-full flex flex-col items-center text-gray-400 pt-4 px-4 pb-10">
            <div className="flex items-center justify-start w-full gap-2.5">
                <img src="/images/back-button.svg" alt="logo" 
                    style={{ cursor: "pointer" }}
                    className="w-6 h-6" 
                    onClick={() => navigate(-1)}/>
                <h1 className="text-xl font-bold">Rooms</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-4 w-full">
                <div className='shadow-sm rounded-3xl' >
                    <Image src="/images/superdeluxe.jpg" alt="Room 1" className="h-48 w-11/12" />
                    <div className="p-4 bg-white rounded-3xl">
                        <p className="text-lg font-semibold text-gray-800">Super Deluxe</p>
                        <p className="text-sm text-gray-600">
                            <span className="font-medium text-gray-700">Price: </span>&#8358;15,000
                        </p>
                    </div>
                </div>
                <div className='shadow-sm rounded-3xl'>
                    <Image src="/images/hotel5.jpg" alt="Room 1" className="h-48 w-11/12" />
                    <div className="p-4 bg-white rounded-3xl">
                        <p className="text-lg font-semibold text-gray-800">Fun Deluxe</p>
                        <p className="text-sm text-gray-600">
                            <span className="font-medium text-gray-700">Price: </span>&#8358;20,000
                        </p>
                    </div>
                </div>
                <div className='shadow-sm rounded-3xl'>
                    <Image src="/images/executive.jpg" alt="Room 1" className="h-48 w-11/12" />
                    <div className="p-4 bg-white rounded-3xl">
                        <p className="text-lg font-semibold text-gray-800">Executive</p>
                        <p className="text-sm text-gray-600">
                            <span className="font-medium text-gray-700">Price: </span>&#8358;25,000
                        </p>
                    </div>
                </div>
                <div className='shadow-sm rounded-3xl'>
                    <Image src="/images/governor.jpg" alt="Room 1" className="h-48 w-11/12" />
                    <div className="p-4 bg-white rounded-3xl">
                        <p className="text-lg font-semibold text-gray-800">Governor</p>
                        <p className="text-sm text-gray-600">
                            <span className="font-medium text-gray-700">Price: </span>&#8358;30,000
                        </p>
                    </div>
                </div>
                <div className='shadow-sm rounded-3xl'>
                    <Image src="/images/presidential-suite.jpg" alt="Room 1" className="h-48 w-11/12" />
                    <div className="p-4 bg-white rounded-3xl">
                        <p className="text-lg font-semibold text-gray-800">Presidential</p>
                        <p className="text-sm text-gray-600">
                            <span className="font-medium text-gray-700">Price: </span>&#8358;40,000
                        </p>
                    </div>
                </div>
                <div className='shadow-sm rounded-3xl'>
                    <Image src="/images/continental-suite.jpg" alt="Room 1" className="h-48 w-11/12" />
                    <div className="p-4 bg-white rounded-3xl">
                        <p className="text-lg font-semibold text-gray-800">Continental</p>
                        <p className="text-sm text-gray-600">
                            <span className="font-medium text-gray-700">Price: </span>&#8358;50,000
                        </p>
                    </div>
                </div>
            </div>
            <div className='my-4'>
                <p className='flex items-center justify-center'><img src="/images/phone.svg" height={20} width={20}  /> Call us to book Your reservation</p>
            </div>
        </div>
    )
}