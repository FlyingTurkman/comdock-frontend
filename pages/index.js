import Layout from "@/components/basics/Layout";
import { fetcher, markdownToHtml } from "@/helpers/helpScripts";
import { useEffect } from "react";
import { ConnectionFailFullSite } from "@/components/errors/ConnectionFailFullSite";
import CompaniesList from "@/components/listpages/CompaniesList";
import PersonsList from "@/components/listpages/PersonsList";
import Link from "next/link";




const Index = ({companies, persons, texts, jumbotron}) => {
  useEffect(() => {
    if (!companies || !persons || !texts) {
      setTimeout(() => {
        window.location.reload();
      }, 120000);
    }
  }, [companies]);

  // if (!companies || !persons || !texts) {
  //   return(<ConnectionFailFullSite />)
  // }

  return(
    <Layout nopageHeader>
      <div className="bg-white rounded-lg p-4 index-wrapper mt-8 shadow">
        <div className="mx-auto max-w-4xl">
          <h3 className="text-primary mb-3">{texts.attributes.headline}</h3>
          <div className="leading-relaxed text-justify" dangerouslySetInnerHTML={{ __html: jumbotron }}></div>
        </div>
      </div>
      <div className="md:flex md:flex-row md:gap-4 index-wrapper">
        <section className="basis-1/2">
          <div className="h3 text-primary">Firmen</div>
          <CompaniesList content={companies} />
          <div className="w-full text-center">
            <Link href="companies">
              <button className="btn btn-primary">Mehr Firmen</button>
            </Link>
          </div>
        </section>
        <section className="basis-1/2 pt-8 md:pt-0">
          <div className="h3 text-primary">Personen</div>
          <PersonsList content={persons} />
          <div className="w-full text-center">
            <Link href="persons">
              <button className="btn btn-primary">Mehr Personen</button>
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default Index

export async function getServerSideProps() {
  try {
    const companyResponse = await fetcher(
      'companies', 
      'fields[0]=company_name&fields[1]=hr_court&fields[2]=hr_dept&fields[3]=hr_number&fields[4]=pageslug&populate=main_branch&filters[status][$eq]=aktiv&sort[0]=company_name&pagination[pageSize]=5'
    )
    const personResponse = await fetcher(
      `persons`,
      'fields[0]=first_name&fields[1]=sir_name&fields[2]=city&sort[0]=sir_name&sort[1]=first_name&pagination[pageSize]=5'
    )

    const contentResponse = await fetcher('indexcontent')
    const jumbotron = await markdownToHtml(contentResponse.data.attributes.jumbotron);

    return {
      props: {
        companies: companyResponse,
        persons: personResponse,
        texts: contentResponse.data,
        jumbotron
      },
    };
  } catch (error) {
    return {
      props: {
        companies: null,
        persons: null,
        contentResponse: null
      },
    };
  }
}
