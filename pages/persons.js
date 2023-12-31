import Layout from "@/components/basics/Layout";
import { ConnectionFailOnSite } from "@/components/errors/ConnectionFailOnSite";
import BlankPage from "@/components/pagetypes/BlankPage";
import PersonsList from "@/components/listpages/PersonsList";
import { fetcher } from "@/helpers/helpScripts";
import { useEffect } from "react";


const Persons = ({persons}) => {
  useEffect(() => {
    if (!persons) {
      setTimeout(() => {
        window.location.reload();
      }, 120000);
    }
  }, [persons]);

  return(
      <Layout siteTitle="Personen">
        <BlankPage title="Personen" >
          {persons ? (
          <PersonsList content={persons} />
          ) : (
            <ConnectionFailOnSite />
          )}
        </BlankPage>
      </Layout>
  )
}
export default Persons

export async function getServerSideProps() {
  try {
    const contentResponse = await fetcher(
      `persons`,
      'fields[0]=first_name&fields[1]=sir_name&fields[2]=city&sort[0]=sir_name&sort[1]=first_name'
    )
    return {
      props: {
        persons: contentResponse,
      },
    };
  } catch(error) {
    return {
      props: {
        persons: null
      },
    };
  }
}
  