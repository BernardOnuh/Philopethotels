const Button = ({text, className}) => {
return (
    <div>
        <button className={`transparent border-2  border-gray-500 hover:bg-white-700 hover:text-black text-gray-500 font-medium py-1 px-4 rounded-4xl transition-all duration-300 ease-in-out transform hover:translate-x-1 ${className}`}>
            {text}
        </button>
    </div>
)
}

export default Button