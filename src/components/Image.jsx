export default function Image({ src, alt, className }) {
    return (
        <img
            src={src}
            alt={alt}
            className={'w-1/3 h-40 m-2 shadow-md rounded-3xl object-cover hover:scale-105 transition-transform duration-300 ' + className }
        />
    );
}