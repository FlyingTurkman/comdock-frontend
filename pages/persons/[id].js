import Layout from "@/components/basics/Layout";
import DetailPage from "@/components/pagetypes/DetailPage";
import Link from "next/link";
import style from '@/layout/ContentLists.module.sass';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { fetcher, germanDate } from "@/helpers/helpScripts";
import { useEffect } from "react";
import { ConnectionFailFullSite } from "@/components/errors/ConnectionFailFullSite";
import HRList from "@/components/detailPages/HRList";

const PersonDetail = ({item}) => {
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
        <Layout siteTitle={item.attributes.first_name+' '+item.attributes.sir_name+', '+item.attributes.city}>
            <DetailPage title={item.attributes.first_name+' '+item.attributes.sir_name+', '+item.attributes.city} contentType='person'>
                {item.attributes.networkChildren.data.length > 0 ? (
                    <section id="network" className="detailSection">
                        <h4 className="sectionLabel">Positionen</h4>
                        <div className="personNetwork">
                            {item.attributes.networkChildren.data
                                .sort((newest, oldest) => oldest.attributes.since.localeCompare(newest.attributes.since))
                                .map((person) => {
                                return (
                                    <div className={`${style.listItem} ${person.attributes.upto ? (style.deleted) : ''} rounded-lg`}>
                                        <div className={`${style.listIcon} flex-none rounded-l-lg`}>
                                            <div className={style.faIcon}>
                                                <FontAwesomeIcon icon={faBuilding} />
                                            </div>
                                        </div>
                                        <div className={`${style.listContent} flex-auto`}>
                                            <Link href={'/company/'+person.attributes.childCompany.data.attributes.hr_number} key={person.id}>
                                                <p className={`${style.summary}`}>{person.attributes.childCompany.data.attributes.company_name}</p>
                                                <p className={`${style.meta}`}>
                                                    {person.attributes.type} {person.attributes.upto ? ('(bis '+germanDate(person.attributes.upto)+')') : ''}
                                                </p>
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                ) : ''}

                {item.attributes.pubsMentioned.data.length > 0 ? (
                    <section id="publics" className="detailSection">
                        <h4 className="sectionLabel">Veröffentlichungen</h4>
                        <HRList content={item.attributes.pubsMentioned.data} />
                    </section>
                ) : ''}

            </DetailPage>
        </Layout>
    )
}

export async function getServerSideProps({params}) {
    const {id} = params;
    try{
        const contentResponse = await fetcher(
            `persons/${id}`,
            'populate[networkChildren][populate][childCompany][fields][0]=company_name,hr_number&populate[pubsMentioned][populate][company][fields][0]=company_name,hr_number'
        )
        return {
            props: {
                item: contentResponse.data,
            },
        };
    } catch (error) {
        return {
            props: {item: null},
        };
    }
}


export default PersonDetail;