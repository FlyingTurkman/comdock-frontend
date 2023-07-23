import Head from "next/head"
import Link from "next/link"
import AlertIcon from "../basics/AlertIcon"



export function ConnectionFailFullSite() {
    return(
        <>
            <Head>
                <link rel="shortcut icon" href="/icons/icon-primary.svg" />
                <title>COMDOCK Index</title>
            </Head>

            <main className="wrapper flex flex-col items-center h-screen">
                <Link className="flex" href="/">
                    <img className="block h-12 w-auto" src="/icons/icon-primary.svg" alt="COMDOCK Index" />
                    <h1 className="text-primary ml-6 self-center leading-none">COMDOCK Index</h1>
                </Link>

                <div className="grow text-center justify-center items-center flex flex-col">
                    <AlertIcon theme="warning" weightClass='w-12' />
                    <div className="mt-10">
                    <h1>Wir haben unsere Daten verloren</h1>
                    <p>
                        Die Verbindung zu unserer Datenbank kann nicht hergestellt werden.<br />
                        Diese Seite wird nun alle 2 Minuten neu geladen. Wenn die Daten nicht bald angezeigt werden, versuche es später erneut.
                    </p>
                    </div>
                </div>
            </main>
        </>
    )
}