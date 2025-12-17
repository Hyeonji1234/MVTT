import Header from "../components/Header";
import SpoilerWarningModal from "../components/SpoilerWarningModal";
import '@/styles/globals.css';

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <SpoilerWarningModal />
            <Header />
            <Component {...pageProps} />
        </>
    );
}
