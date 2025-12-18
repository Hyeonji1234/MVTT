import Header from "../components/Header";
import SpoilerWarningModal from "../components/SpoilerWarningModal";
import '../styles/globals.css';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <SpoilerWarningModal />
            <Header />
            <Component {...pageProps} />
        </>
    );
}
