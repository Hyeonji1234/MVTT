import Header from "../components/Header";
import SpoilerWarningModal from "../components/SpoilerWarningModal";

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <SpoilerWarningModal />
            <Header />
            <Component {...pageProps} />
        </>
    );
}
