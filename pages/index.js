import Layout from "@/components/basics/Layout";
import Alert from "@/components/basics/Alert";

export default function Index() {
  return (
    <Layout nopageHeader>
      <h1>Index Page</h1>
      <Alert title="Hallo">
        <p>Das ist eine Info</p>
      </Alert>
      <Alert title="Wie schön" theme="success">
        <p>Du hast es geschafft</p>
      </Alert>
      <Alert theme="warning" title="Achtung">
        <p>Das was hier passiert sieht irgendwie falsch aus</p>
      </Alert>
      <Alert title="Oh nein" theme="error">
        <p>So geht es nicht!</p>
      </Alert>
    </Layout>
  );
}