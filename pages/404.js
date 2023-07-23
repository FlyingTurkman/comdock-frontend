import AlertIcon from "@/components/basics/AlertIcon"
import Head from "next/head"
import Link from "next/link"

export default function NotFound() {
    return(
        <>
            <Head>
                <link rel="shortcut icon" href="/icons/icon-primary.svg" />
                <title>Seite nicht gefunden | COMDOCK Index</title>
            </Head>

            <main className="wrapper flex flex-col items-center h-screen">
                <Link className="flex" href="/">
                    <img className="block h-12 w-auto" src="/icons/icon-primary.svg" alt="COMDOCK Index" />
                    <h1 className="text-primary ml-6 self-center leading-none">COMDOCK Index</h1>
                </Link>

                <div className="grow text-center justify-center items-center flex flex-col">
                    <AlertIcon theme="primary" weightClass='w-12' />
                    <div className="mt-10">
                        <h4 class="text-primary">404</h4>
                        <h1 class="mt-4">Seite nicht gefunden</h1>
                        <p class="mt-6">Leider konnten wir die gewünschte Seite nicht finden.</p>
                        <div className="mt-10">
                            <Link href="/">
                                <button className="btn btn-primary">Zurück zur Startseite</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}