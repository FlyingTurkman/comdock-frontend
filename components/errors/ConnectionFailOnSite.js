import Alert from "../basics/Alert";

export function ConnectionFailOnSite() {
    return(
        <Alert theme="warning" title="Wir haben unsere Daten verloren">
            <p>
                Die Verbindung zu unserer Datenbank kann nicht hergestellt werden.<br />
                Diese Seite wird nun alle 2 Minuten neu geladen. Wenn die Daten nicht bald angezeigt werden, versuche es später erneut.
            </p>
        </Alert>
    )
}