import Layout from "@/components/common/Layout";
import { ConnectionFailFullSite } from "@/components/errors/ConnectionFailFullSite";
import DocList from "@/components/specific/DocList";
import PageHeader from "@/components/specific/PageHeader";
import { dynamicIconHandler, fetcher, germanDate, markdownToHtml } from "@/helpers/helpScripts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect } from "react";

const HRDetail = ({item, pub_text}) => {
    useEffect(() => {
        if (!item) {
            setTimeout(() => {
            window.location.reload();
            }, 120000);
        }
    }, [item]);
    
    if (!item) {
        return(<ConnectionFailFullSite />)
    }

    return (
        <Layout siteTitle={item.attributes.pub_title+' - '+item.attributes.company.data.attributes.company_name}>
            <PageHeader noBreadcrumb>
                <div className="h2 flex">
                    <div className="flex-none w-6 mr-6">
                        <FontAwesomeIcon icon={dynamicIconHandler(item.attributes.pub_icon)} />
                    </div>
                    <span>{item.attributes.pub_title+': '+item.attributes.pub_summary}</span>
                </div>
            </PageHeader>
            <article className="wrapper text-mono">
                <div className="flex">
                    <Link href={`/companies/${item.attributes.company.data.attributes.hr_number}`} className="flex-auto font-semibold text-primary hover:underline hover:underline-offset-4">{item.attributes.company.data.attributes.hr_dept+' '+item.attributes.company.data.attributes.hr_number+' / '+item.attributes.company.data.attributes.company_name}</Link>
                    <span className="text-right font-semibold text-primary">{germanDate(item.attributes.pub_date)}</span>
                </div>
                <div className={`my-2 markdownBox text-mono`} dangerouslySetInnerHTML={{ __html: pub_text }}></div>
            </article>
            <section id="publications" className="wrapper">
                <h4 className="sectionLabel">Dokumente zu dieser Eintragung</h4>
                <div className="my-2">
                    <DocList content={item.attributes.docs} />
                </div>
            </section>
        </Layout>
    )
}

export async function getServerSideProps({params}) {
    const {id} = params;
    try {
        const contentResponse = await fetcher(
            `hr-publics/${id}`,
            `populate[company][fields][0]=company_name,hr_dept,hr_number&populate[docs][populate][cdl_tasks][populate][certificate_doc][fields][0]=url&populate[docs][populate][document][fields][0]=url&populate[docs][populate][cdl_tasks][populate][signer][fields][0]=name`
        )

        const pub_text = await markdownToHtml(contentResponse.data.attributes.pub_text);

        return {
            props:{
                item: contentResponse.data,
                pub_text
            }
        }
    } catch (error) {
        return{
            props: {item: null}
        }
    }
}

export default HRDetail;