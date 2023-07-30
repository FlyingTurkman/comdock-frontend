import style from '@/layout/ContentLists.module.sass';
import Layout from "@/components/basics/Layout"
import DetailPage from "@/components/pagetypes/DetailPage";
import NetworkList from "@/components/detailPages/NetworkList";
import { fetcher, markdownToHtml } from "@/helpers/helpScripts";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PablicationSection from '@/components/detailPages/PublicationSection';
import { ConnectionFailFullSite } from '@/components/errors/ConnectionFailFullSite';
import { useEffect } from 'react';

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

    return(
        <Layout siteTitle={item.attributes.company_name}>
            <DetailPage 
                title={item.attributes.main_branch && item.attributes.main_branch.data ? 
                    item.attributes.company_name + ', ' + item.attributes.main_branch.data.attributes.city :
                    item.attributes.company_name
                }
                contentType='company'>
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
                {item.attributes.networkCompanies.length > 0 || item.attributes.networkPersons.length > 0 ? (
                    <section id="network" className="detailSection">
                        <h4 className="sectionLabel">Netzwerk</h4>
                        <div className="my-2">
                            <NetworkList networkInfo={relationalInfo} />
                        </div>
                    </section>
                ) : '' }
                {item.attributes.hr_pubs.data.length > 0 || relationalInfo.attributes.docs.data.length > 0 ? (
                <section id="publications" className="detailSection">
                    <h4 className="sectionLabel">Veröffentlichungen</h4>
                    <div className="my-2">
                        <PablicationSection hr={item.attributes.hr_pubs} docs={relationalInfo.attributes.docs} />
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
            `populate=*&_sort=furtherNames.name_upto:ASC`
        )

        const relationalResponse = await fetcher(
            `slugify/slugs/company/${pageslug}`,
            `fields=company_name&populate[networkCompanies][populate][connected_company][fields][0]=hr_number,company_name&populate[networkPersons][populate][connected_person][fields][0]=id,first_name,sir_name&populate[networkExternals][populate][connected_external][fields][0]=company_name,url,icon&populate[networkCompanies][populate][hr_public][fields][0]=id&populate[networkPersons][populate][hr_public][fields][0]=id&populate[docs][populate][document][fields][0]=url&populate[docs][populate][cdl_tasks][populate][signer][fields][0]=name&populate[docs][populate][cdl_tasks][populate][certificate_doc][fields][0]=url`
        )

        const corp_object = await markdownToHtml(contentResponse.data.attributes.corp_object);
        
        // Sort networkCompanies, networkPersons, networkExternals by their 'since' field
        relationalResponse.data.attributes.networkCompanies.sort((oldest, newest) => {
            return new Date(newest.since) - new Date(oldest.since);
        });

        relationalResponse.data.attributes.networkPersons.sort((oldest, newest) => {
            return new Date(newest.since) - new Date(oldest.since);
        });

        relationalResponse.data.attributes.networkExternals.sort((oldest, newest) => {
            return new Date(newest.since) - new Date(oldest.since);
        });

        const activeNetworkCompanies = relationalResponse.data.attributes.networkCompanies.filter(company => company.upto === null || company.upto === '');
        const deletedNetworkCompanies = relationalResponse.data.attributes.networkCompanies.filter(company => company.upto !== null && company.upto !== '');

        const activeNetworkPersons = relationalResponse.data.attributes.networkPersons.filter(person => person.upto === null || person.upto === '');
        const deletedNetworkPersons = relationalResponse.data.attributes.networkPersons.filter(person => person.upto !== null && person.upto !== '');

        const activeNetworkExternals = relationalResponse.data.attributes.networkExternals.filter(external => external.upto === null || external.upto === '');
        const deletedNetworkExternals = relationalResponse.data.attributes.networkExternals.filter(external => external.upto !== null && external.upto !== '');

        return{
            props: {
                item: contentResponse.data,
                corp_object,
                relationalInfo: {
                    ...relationalResponse.data,
                    attributes: {
                        ...relationalResponse.data.attributes,
                        activeNetworkCompanies: activeNetworkCompanies,
                        deletedNetworkCompanies: deletedNetworkCompanies,
                        activeNetworkPersons: activeNetworkPersons,
                        deletedNetworkPersons: deletedNetworkPersons,
                        activeNetworkExternals: activeNetworkExternals,
                        deletedNetworkExternals: deletedNetworkExternals
                    }
                }
            }
        }
    } catch (error) {
        return{
            props: {item: null}
        }
    }
}

export default CompanyDetail;