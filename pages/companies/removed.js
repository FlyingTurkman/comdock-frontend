import Layout from "@/components/basics/Layout";
import { ConnectionFailOnSite } from "@/components/errors/ConnectionFailOnSite";
import BlankPage from "@/components/pagetypes/BlankPage";
import CompaniesList from "@/components/listpages/CompaniesList";
import { fetcher } from "@/helpers/helpScripts";
import { useEffect} from "react";
import Alert from "@/components/basics/Alert";
import Link from "next/link";

const RemovedCompanies = ({companies}) => {

  useEffect(() => {
    if (!companies) {
      setTimeout(() => {
        window.location.reload();
      }, 120000);
    }
  }, [companies]);

  return (
    <Layout siteTitle="Entfernte Firmen">
      <BlankPage title="Entfernte Firmen">
          {companies ? (
            <>
                <Alert theme="info">
                    <p>
                        In dieser Anscht werden Firmen angezeigt, die vormals mit einem Unternehmen des NCS Verbunds verbunden waren, 
                        sich in Liquidation befinden oder bereits gelöscht wurden.
                    </p>
                    <p>
                        Unter <Link href="/companies" className=" text-info hover:text-sky-600">Firmen</Link> finden Sie die aktuell aktiven Firmen.
                    </p>
                </Alert>
                <CompaniesList content={companies} />
            </>
            ) : (
              <ConnectionFailOnSite />
            )
          }
        </BlankPage>
    </Layout>
  );
};
export default RemovedCompanies

export async function getServerSideProps() {
  try {
    const contentResponse = await fetcher(
      'companies', 
      'fields[0]=company_name&fields[1]=hr_court&fields[2]=hr_dept&fields[3]=hr_number&fields[4]=status&populate=main_branch&filters[$or][0][status][$eq]=gelöscht&filters[$or][1][status][$eq]=Liquidation&filters[$or][2][status][$eq]=Gesellschaft verlassen')
    return {
      props: {
        companies: contentResponse,
      },
    };
  } catch (error) {
    return {
      props: {
        companies: null,
      },
    };
  }
}