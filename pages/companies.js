import Layout from "@/components/basics/Layout";
import { ConnectionFailOnSite } from "@/components/errors/ConnectionFailOnSite";
import BlankPage from "@/components/pagetypes/BlankPage";
import CompaniesList from "@/components/listpages/CompaniesList";

import { fetcher } from "@/helpers/helpScripts";
import { useEffect} from "react";


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
            <CompaniesList content={companies} />
            ) : (
              <ConnectionFailOnSite />
            )
          }
        </BlankPage>
    </Layout>
  );
};
export default Companies

export async function getStaticProps() {
  try {
    const contentResponse = await fetcher(
      'companies', 
      'fields[0]=company_name&fields[1]=hr_court&fields[2]=hr_dept&fields[3]=hr_number&populate=main_branch')
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