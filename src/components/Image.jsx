export default function Image({ src, alt, className }) {
    return (
        <img
            style={{filter: 'sharpen(1)'}}
            src={src}
            alt={alt}
            className={`m-2 shadow-md rounded-3xl object-cover  ${className}` }
        />
    );
}