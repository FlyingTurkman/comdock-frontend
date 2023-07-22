/* jshint esversion:6 */

import Head from "next/head";
import Nav from "./Nav";
import Link from "next/link";


export default function Layout ({children, siteTitle, nopageHeader, backend}) {
    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/icons/icon-primary.svg" />
                <title>
                    {siteTitle ? (siteTitle+' | '+'COMDOCK Index') : ('COMDOCK Index')}
                </title>
            </Head>
            <Nav nopageHeader={nopageHeader} backend={backend} />
            <main>
                {children}
            </main>            
            <footer>
                <p className="text-xs text-center text-zinc-300 font-light">
                    Dies ist eine ausdrücklich nichtamtliche Webseite zu Übungszwecken. Jegliche Daten sind frei erfunden. 
                    <Link href="https://github.com/onissen/comdock-frontend/blob/main/README.md" className="underline font-normal hover:text-primary-100">Mehr Infos in der README-Datei</Link>
                </p>
            </footer>
        </>
    );
}