import Layout from "@/components/basics/Layout"
import DetailPage from "@/components/pagetypes/DetailPage";
import { fetcher, markdownToHtml } from "@/helpers/helpScripts";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PablicationSection from '@/components/detailPages/PublicationSection';
import { ConnectionFailFullSite } from '@/components/errors/ConnectionFailFullSite';
import { useEffect } from 'react';
import Network from "@/components/detailPages/Network";


const CompanyDetail = ({item, relationalInfo, corp_object}) => {
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

    const allPubs = item.attributes.hr_pubs.data.concat(relationalInfo.attributes.pubsMentioned.data).sort((newest, oldest) => oldest.attributes.pub_date.localeCompare(newest.attributes.pub_date))
    const docs = relationalInfo.attributes.docs.data.sort((newest, oldest) => oldest.attributes.createdAt.localeCompare(newest.attributes.createdAt))
   
    return(
        <Layout siteTitle={item.attributes.company_name}>
            <DetailPage 
                title={item.attributes.main_branch && item.attributes.main_branch.data ? 
                    item.attributes.company_name + ', ' + item.attributes.main_branch.data.attributes.city :
                    item.attributes.company_name
                }
                contentType='company'
                badge={item.attributes.status}>
                <section id="company_name" className="detailSection">
                    <h4 className="sectionLabel">Firma</h4>
                    <p className="my-2">{item.attributes.company_name}</p>
                    <div id="furtherNames" className="my-2">
                        {item.attributes.furtherNames &&
                          item.attributes.furtherNames.map((furtherName) => {
                            return (
                                <div className="flex text-cyan-500/50" key={furtherName.id}>
                                    <FontAwesomeIcon icon={faArrowRightArrowLeft} className="w-3 flex-none mr-2" />
                                    <span className="flex-auto text-sm">{furtherName.further_cname}</span>
                                </div>
                            )
                            })
                        } 
                    </div>
                </section>
                <section id="register" className="detailSection">
                    <h4 className="sectionLabel">Register</h4>
                    <p id="hr" className="my-2">
                        <span className="badge">HR</span>
                        <span>{item.attributes.hr_court} | {item.attributes.hr_dept+' '+item.attributes.hr_number}</span>
                    </p>
                    {item.attributes.lei ? (
                        <p id="lei" className="my-2">
                            <span className="badge">LEI</span>
                            <span>{item.attributes.lei}</span>
                        </p>
                    ) : ''}
                </section>
                {item.attributes.main_branch && item.attributes.main_branch.data ||
                    item.attributes.branches && item.attributes.branches.data.length > 0 ? (
                    <section id="addresses" className="detailSection">
                        <h4 className="sectionLabel">Sitz, Niederlassung, Zweigniederlassungen</h4>
                        {item.attributes.main_branch && item.attributes.main_branch.data ? (
                        <p id="main_branch" className="my-2">
                            <span className="badge">Sitz</span>
                            <span>
                                {item.attributes.main_branch.data.attributes.street} {item.attributes.main_branch.data.attributes.place_number}, {item.attributes.main_branch.data.attributes.zip} {item.attributes.main_branch.data.attributes.city}
                            </span>
                        </p>
                        ) : ''}
                        <div id="branches" className="my-2">
                            {item.attributes.branches && item.attributes.branches.data.map((branch) => (
                                    <p key={branch.id}>
                                        <span className="badge">Zweigniederlassung</span>
                                        <span>
                                            {branch.attributes.street} {branch.attributes.place_number}, {branch.attributes.zip} {branch.attributes.city}
                                        </span>
                                    </p>
                            ))}
                        </div>
                    </section>
                ) : ('')}
                {item.attributes.corp_object ? (
                    <section id="corp_object" className="detailSection">
                        <h4 className="sectionLabel">Unternehmensgegenstand</h4>
                        <div className={`my-2 markdownBox`} dangerouslySetInnerHTML={{ __html: corp_object }}></div>
                    </section>
                ) : '' }
                {item.attributes.networkChildren.data.length > 0 || item.attributes.networkParents.data.length > 0 ? (
                    <section id="network" className="detailSection">
                        <h4 className="sectionLabel">Netzwerk</h4>
                        <div className="my-2">
                            <Network networkInfo={relationalInfo} />
                        </div>
                    </section>
                ) : '' }
                {item.attributes.hr_pubs.data.length > 0 || item.attributes.pubsMentioned.data.length > 0 || relationalInfo.attributes.docs.data.length > 0 ? (
                <section id="publications" className="detailSection">
                    <h4 className="sectionLabel">Veröffentlichungen</h4>
                    <div className="my-2">
                        <PablicationSection hr={allPubs} docs={docs} />
                    </div>
                </section>
                ) : ''}
            </DetailPage>
        </Layout>
    )
}


export async function getServerSideProps({params}) {
    const {pageslug} = params;
    try {
        const contentResponse = await fetcher(
            `slugify/slugs/company/${pageslug}`, 
            `populate=*`
        )
        const corp_object = await markdownToHtml(contentResponse.data.attributes.corp_object);

        const relationalResponse = await fetcher(
            `slugify/slugs/company/${pageslug}`,
            `fields[0]=company_name&populate[networkParents][populate][parentCompany][fields][0]=company_name,hr_number,pageslug&populate[networkParents][populate][parentExternal][fields][0]=company_name,url,reg_number,reg_dept&populate[networkParents][populate][parentPerson][fields][0]=first_name,sir_name,id&populate[networkChildren][populate][childCompany][fields][0]=company_name,hr_number,pageslug&populate[docs][populate][mainDoc][fields][0]=url&populate[docs][populate][relatedDocs][populate][document][fields][0]=url&populate[pubsMentioned][populate][company][fields][0]=hr_number,company_name,pageslug`
        )

        return{
            props: {
                item: contentResponse.data,
                corp_object,
                relationalInfo: relationalResponse.data
            }
        }
    } catch (error) {
        return{
            props: {item: null}
        }
    }
}

export default CompanyDetail;