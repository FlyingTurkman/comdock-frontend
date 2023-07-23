function Error({ statusCode }) {
    return(
        <>
            <Head>
                <link rel="shortcut icon" href="/icons/icon-primary.svg" />
                <title>Fehler | COMDOCK Index</title>
            </Head>
            <main className="wrapper flex flex-col items-center h-screen">
                <Link className="flex" href="/">
                    <img className="block h-12 w-auto" src="/icons/icon-primary.svg" alt="COMDOCK Index" />
                    <h1 className="text-primary ml-6 self-center leading-none">COMDOCK Index</h1>
                </Link>

                <div className="grow text-center justify-center items-center flex flex-col">
                    <AlertIcon theme="error" weightClass='w-12' />
                    <div className="mt-10">
                        {statusCode ? (
                            <h4 className="text-primary">{statusCode}</h4>
                        ) : ''}
                        <h1 className="mt-4">Es ist ein Fehler aufgetreten.</h1>
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
   
Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}
   
export default Error