import Home from './Home'
import AboutUs from './AboutUs'
import Book from './Book'


export default function Page() {
    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    };
    return (
        <div>
            <Home scrollToBottom={scrollToBottom}/>
            <AboutUs />
            <Book />
        </div>
    )
}
