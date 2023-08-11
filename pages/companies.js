import Layout from "@/components/basics/Layout";
import { ConnectionFailOnSite } from "@/components/errors/ConnectionFailOnSite";
import BlankPage from "@/components/pagetypes/BlankPage";
import CompaniesList from "@/components/listpages/CompaniesList";
import { fetcher } from "@/helpers/helpScripts";
import { useEffect} from "react";
import Alert from "@/components/basics/Alert";
import Link from "next/link";

const Companies = ({companies}) => {

  useEffect(() => {
    if (!companies) {
      setTimeout(() => {
        window.location.reload();
      }, 120000);
    }
  }, [companies]);

  return (
    <Layout siteTitle="Firmen">
      <BlankPage title="Firmen">
          {companies ? (
            <>
            <CompaniesList content={companies} />
            <Alert theme="info">
              <p>In dieser Ansicht werden nur aktive Firmen angezeigt.</p>
              <p>Unter <Link href="/companies/removed" className="font-medium text-info hover:text-sky-600">Entfernte Firmen</Link> finden Sie Firmen, 
                die vormals mit einem Unternehmen des NCS Verbunds verbunden waren, 
                sich in Liquidation befinden oder bereits gelöscht wurden.
              </p>
            </Alert>
            </>
            ) : (
              <ConnectionFailOnSite />
            )
          }
        </BlankPage>
    </Layout>
  );
};
export default Companies

export async function getServerSideProps() {
  try {
    const contentResponse = await fetcher(
      'companies', 
      'fields[0]=company_name&fields[1]=hr_court&fields[2]=hr_dept&fields[3]=hr_number&fields[4]=pageslug&populate=main_branch&filters[status][$eq]=aktiv&sort[0]=company_name')
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