import Layout from "@/components/basics/Layout";
import Alert from "@/components/basics/Alert";
import { fetcher } from "@/helpers/helpScripts";
import { useEffect } from "react";
import { ConnectionFailFullSite } from "@/components/errors/ConnectionFailFullSite";
import CompaniesList from "@/components/listpages/CompaniesList";
import PersonsList from "@/components/listpages/PersonsList";
import Link from "next/link";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";




const Index = ({companies, persons}) => {
  useEffect(() => {
    if (!companies || !persons) {
      setTimeout(() => {
        window.location.reload();
      }, 120000);
    }
  }, [companies, persons]);

  if (!companies || !persons) {
    return(<ConnectionFailFullSite />)
  }

  return(
    <Layout nopageHeader>
      <div className="bg-white rounded-lg p-4 mt-8">
      <div className="mx-auto max-w-4xl">
        <h3 className="text-primary mb-3">Herzlich Willkommen bei COMDOCK</h3>
        <p className="text-justify leading-relaxed">
          COMDOCK ist eine Plattform, die Ihnen Zugang zu Informationen über Unternehmen der NCS Group bietet. 
          Sie können Unternehmensdaten, das Unternehmensnetzwerk und alle offiziellen Bekanntmachungen einsehen. 
        </p>
        <p className="text-justify leading-relaxed">
          Die NCS Group veröffentlicht und übermittelt alle eigenen Unternehmensdaten mit COMDOCK an das Unternehmensregister, das DPMA-Register und viele weitere Registeportale. 
          Über COMDOCK Legal haben Notare und Bevollmächtigte die Möglichkeit, Dokumente und Eintragungen digital zu signieren und zu beglaubigen.
        </p>
      </div>
      </div>
      <div className="md:flex md:flex-row md:gap-4 index-wrapper">
        <section className="flex-grow">
          <div className="h3 text-primary">Firmen</div>
          <CompaniesList content={companies} />
          <div className="w-full text-center">
            <Link href="companies">
              <button className="btn btn-primary">Mehr Firmen</button>
            </Link>
          </div>
        </section>
        <section className="flex-grow">
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

export async function getStaticProps() {
  try {
    const companyResponse = await fetcher(
      'companies', 
      'fields[0]=company_name&fields[1]=hr_court&fields[2]=hr_dept&fields[3]=hr_number&populate=main_branch&pagination[pageSize]=5'
    )
    const personResponse = await fetcher(
      `persons`,
      'fields[0]=first_name&fields[1]=sir_name&fields[2]=city&pagination[pageSize]=5'
    )
    return {
      props: {
        companies: companyResponse,
        persons: personResponse
      },
    };
  } catch (error) {
    return {
      props: {
        companies: null,
        persons: null
      },
    };
  }
}