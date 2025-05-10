import { useNavigate } from "react-router"

export default function Menu() {
    const navigate = useNavigate();
    return (
        <div className="w-full flex flex-col items-center justify-center p-4">
            <div className="w-full flex items-center justify-start gap-4">
                <img src="/images/back-button.svg" alt="back button" width={20} height={20}
                    onClick={() => navigate(-1)}/>
                <h1 className="text-xl text-center">Menu</h1>
            </div>      
            <div className="w-full flex flex-col mt-4"> 
                <p className="text-2xl font-semibold">Local Dishes</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    <div className="flex flex-col shadow-lg rounded-3xl">
                        <img src="/images/local1.jpg" alt="Egusi" className="h-48 w-full rounded-3xl" />
                        <div className="p-4 bg-white rounded-3xl">
                            <p className="text-lg font-semibold text-gray-800">Pounded yam and egusi</p>
                            <p className="text-sm text-gray-600">
                                <span className="font-medium text-gray-700">Price: </span>&#8358;6,000
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col shadow-lg rounded-3xl">
                        <img src="/images/local2.jpg" alt="Egusi" className="h-48 w-full rounded-3xl" />
                        <div className="p-4 bg-white rounded-3xl">
                            <p className="text-lg font-semibold text-gray-800">Amala and ewedu</p>
                            <p className="text-sm text-gray-600">
                                <span className="font-medium text-gray-700">Price: </span>&#8358;2,500
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col shadow-lg rounded-3xl">
                        <img src="/images/local3.jpg" alt="Egusi" className="h-48 w-full rounded-3xl" />
                        <div className="p-4 bg-white rounded-3xl">
                            <p className="text-lg font-semibold text-gray-800">Semovita and egusi</p>
                            <p className="text-sm text-gray-600">
                                <span className="font-medium text-gray-700">Price: </span>&#8358;4,000
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col shadow-lg rounded-3xl">
                        <img src="/images/local4.jpg" alt="Egusi" className="h-48 w-full rounded-3xl" />
                        <div className="p-4 bg-white rounded-3xl">
                            <p className="text-lg font-semibold text-gray-800">Fufu and vegetable</p>
                            <p className="text-sm text-gray-600">
                                <span className="font-medium text-gray-700">Price: </span>&#8358;3,500
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col shadow-lg rounded-3xl">
                        <img src="/images/local5.jpg" alt="Egusi" className="h-48 w-full rounded-3xl" />
                        <div className="p-4 bg-white rounded-3xl">
                            <p className="text-lg font-semibold text-gray-800">Eba and oha soup</p>
                            <p className="text-sm text-gray-600">
                                <span className="font-medium text-gray-700">Price: </span>&#8358;4,000
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col shadow-lg rounded-3xl">
                        <img src="/images/local6.jpg" alt="Egusi" className="h-48 w-full rounded-3xl" />
                        <div className="p-4 bg-white rounded-3xl">
                            <p className="text-lg font-semibold text-gray-800">Tuwo shinkafa and soup</p>
                            <p className="text-sm text-gray-600">
                                <span className="font-medium text-gray-700">Price: </span>&#8358;5,000
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col shadow-lg rounded-3xl">
                        <img src="/images/local7.jpg" alt="Egusi" className="h-48 w-full rounded-3xl" />
                        <div className="p-4 bg-white rounded-3xl">
                            <p className="text-lg font-semibold text-gray-800">Ofada rice and moi moi</p>
                            <p className="text-sm text-gray-600">
                                <span className="font-medium text-gray-700">Price: </span>&#8358;5,500
                            </p>
                        </div>
                    </div>
                </div>
            </div> 
            <div className="w-full flex flex-col mt-4">
                <p className="text-2xl font-semibold">Continental</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    <div className="flex flex-col shadow-lg rounded-3xl">
                        <img src="/images/cont1.avif" alt="Egusi" className="h-48 w-full rounded-3xl" />
                        <div className="p-4 bg-white rounded-3xl">
                            <p className="text-lg font-semibold text-gray-800">Fried rice</p>
                            <p className="text-sm text-gray-600">
                                <span className="font-medium text-gray-700">Price: </span>&#8358;10,500
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col shadow-lg rounded-3xl">
                        <img src="/images/jellof.webp" alt="Egusi" className="h-48 w-full rounded-3xl" />
                        <div className="p-4 bg-white rounded-3xl">
                            <p className="text-lg font-semibold text-gray-800">Jellof rice</p>
                            <p className="text-sm text-gray-600">
                                <span className="font-medium text-gray-700">Price: </span>&#8358;12,500
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col shadow-lg rounded-3xl">
                        <img src="/images/cont2.webp" alt="Egusi" className="h-48 w-full rounded-3xl" />
                        <div className="p-4 bg-white rounded-3xl">
                            <p className="text-lg font-semibold text-gray-800">Coconut Rice </p>
                            <p className="text-sm text-gray-600">
                                <span className="font-medium text-gray-700">Price: </span>&#8358;10,500
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col shadow-lg rounded-3xl">
                        <img src="/images/spagetthi.webp" alt="Egusi" className="h-48 w-full rounded-3xl" />
                        <div className="p-4 bg-white rounded-3xl">
                            <p className="text-lg font-semibold text-gray-800">Spagetthi </p>
                            <p className="text-sm text-gray-600">
                                <span className="font-medium text-gray-700">Price: </span>&#8358;9,500
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col shadow-lg rounded-3xl">
                        <img src="/images/codfish.webp" alt="Egusi" className="h-48 w-full rounded-3xl" />
                        <div className="p-4 bg-white rounded-3xl">
                            <p className="text-lg font-semibold text-gray-800">Cod Fish</p>
                            <p className="text-sm text-gray-600">
                                <span className="font-medium text-gray-700">Price: </span>&#8358;11,500
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col shadow-lg rounded-3xl">
                        <img src="/images/cont2.avif" alt="Egusi" className="h-48 w-full rounded-3xl" />
                        <div className="p-4 bg-white rounded-3xl">
                            <p className="text-lg font-semibold text-gray-800">Strawberry shake</p>
                            <p className="text-sm text-gray-600">
                                <span className="font-medium text-gray-700">Price: </span>&#8358;13,500
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col shadow-lg rounded-3xl">
                        <img src="/images/pasta.webp" alt="Egusi" className="h-48 w-full rounded-3xl" />
                        <div className="p-4 bg-white rounded-3xl">
                            <p className="text-lg font-semibold text-gray-800">Pasta</p>
                            <p className="text-sm text-gray-600">
                                <span className="font-medium text-gray-700">Price: </span>&#8358;10,500
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col mt-4">
                <p className="text-sm text-gray-600 mt-4">
                    <span className="font-medium text-gray-700">Note: </span>Prices are subject to change based on availability and season.
                </p>    
            </div>      
        </div>
    )
}