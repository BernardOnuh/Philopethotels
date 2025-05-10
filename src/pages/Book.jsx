import Button from "../components/Button"

export default function Book() {
    return (
        <div className="bg-orange-200 py-10 h-1/3 w-full flex flex-col items-center justify-center">
            <h1 className="text-xl font-mediun text-gray-800 my-2">Book a Room now!</h1>
            <p className="text-gray-600 mt-2">Reach Out to us to book a reservation</p>
            <div className="my-6">
                <Button  text="Book Now" />  
            </div>
            <p className="flex items-center justify-center"><img src="/images/phone.svg" width={20} height={20} alt="phone" /> +234 78 888 88373</p>  
            <p className="text-gray-600 mt-2 text-center">We are available 24/7, you can also check us on social media</p>
            <div className="flex gap-4 mt-2">
                <img className="w-10 h-10" src="/images/facebook.svg" alt="facebook" />
                <img className="w-10 h-10" src="/images/instagram.svg" alt="instagram" />
                <img className="w-10 h-10" src="/images/twitter.svg" alt="twitter" />
            </div>    
        </div>
    )
}

