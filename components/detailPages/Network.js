import { germanDate } from '@/helpers/helpScripts';
import style from '@/layout/ContentLists.module.sass';
import { faBuilding, faBuildingCircleArrowRight, faBuildingColumns, faIndustry, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useState } from 'react';
import Alert from '../basics/Alert';


export default function Network({networkInfo}) {

    const sortedNetwork = networkInfo.attributes.childNetworks.data.sort((newest, oldest) => oldest.attributes.since.localeCompare(newest.attributes.since));
    const activeNetwork = sortedNetwork.filter(item => item.attributes.upto === null);
    const deletedNetwork = sortedNetwork.filter(item => item.attributes.upto !== null);

    const parents = networkInfo.attributes.parentNetworks.data.sort((newest, oldest) => oldest.attributes.since.localeCompare(newest.attributes.since));
    const activeParents = parents.filter(item => item.attributes.upto === null);
    const deletedParents = parents.filter(item => item.attributes.upto !== null);

    const [ShowFullNetwork, setShowFullNetwork] = useState(false)
    const initalNum = 4
    const numToShow = ShowFullNetwork ? activeNetwork.length : initalNum;


    return(
        <>
            <div className={`${style.networkItem} ${style.headItem} mb-5 rounded-lg`}>
                <div className={` ${style.listIcon} flex-none rounded-l-lg`}>
                    <div className='w-5'>
                        <FontAwesomeIcon icon={faBuilding} />
                    </div>
                </div>
                <div className={`${style.listContent} flex-auto`}>
                    <p className={`${style.summary}`}>{networkInfo.attributes.company_name}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-5">
                
                {activeNetwork.slice(0, numToShow).map((child) => {
                    if (child.attributes.parentCompany.data !== null) {
                        return (
                            <div className={`${style.networkItem} rounded-lg`}>
                                <div className={` ${style.listIcon} flex-none rounded-l-lg`}>
                                    <div className={style.faIcon}>
                                        <FontAwesomeIcon icon={faBuilding} />
                                    </div>
                                </div>
                                <div className={`${style.listContent} flex-auto`}>
                                    <Link href={'/companies/'+child.attributes.parentCompany.data.attributes.hr_number} >
                                        <p className={`${style.summary}`}>{child.attributes.parentCompany.data.attributes.company_name}</p>
                                        <p className={`${style.meta}`}>{child.attributes.type}</p>
                                    </Link>
                                </div>
                            </div>
                        )

                    } else if (child.attributes.parentExternal.data !== null) {
                        return (
                            <div className={`${style.networkItem} rounded-lg`}>
                                <div className={` ${style.listIcon} flex-none rounded-l-lg`}>
                                    <div className={style.faIcon}>
                                        {child.attributes.parentExternal.data.attributes.reg_dept == 'Behörde' ? (
                                            <FontAwesomeIcon icon={faBuildingColumns} />
                                        ) : (
                                            <FontAwesomeIcon icon={faIndustry} />
                                        )}
                                    </div>
                                </div>
                                <div className={`${style.listContent} flex-auto`}>
                                    <Link href={child.attributes.parentExternal.data.attributes.url} target='_blank' >
                                        <p className={`${style.summary}`}>{child.attributes.parentExternal.data.attributes.company_name}</p>
                                        <p className={`${style.meta}`}>{child.attributes.type}</p>
                                    </Link>
                                </div>
                            </div>
                        )

                    } else if (child.attributes.parentPerson.data !== null) {
                        return (
                            <div className={`${style.networkItem} rounded-lg`}>
                                <div className={` ${style.listIcon} flex-none rounded-l-lg`}>
                                    <div className={style.faIcon}>
                                        <FontAwesomeIcon icon={faUser} />
                                    </div>
                                </div>
                                <div className={`${style.listContent} flex-auto`}>
                                    <Link href={'/persons/'+child.attributes.parentPerson.data.id} >
                                        <p className={`${style.summary}`}>{child.attributes.parentPerson.data.attributes.first_name} {child.attributes.parentPerson.data.attributes.sir_name}</p>
                                        <p className={`${style.meta}`}>{child.attributes.type}</p>
                                    </Link>
                                </div>
                            </div>
                        )
                    }
                })}

                {ShowFullNetwork && activeParents.map((parent) => {
                    return (
                        <div className={`${style.networkItem} rounded-lg`}>
                            <div className={` ${style.listIcon} flex-none rounded-l-lg`}>
                                <div className={style.faIcon}>
                                    <FontAwesomeIcon icon={faBuildingCircleArrowRight} />
                                </div>
                            </div>
                            <div className={`${style.listContent} flex-auto`}>
                                <Link href={'/companies/'+parent.attributes.childCompany.data.attributes.hr_number} >
                                    <p className={`${style.summary}`}>{parent.attributes.childCompany.data.attributes.company_name}</p>
                                    <p className={`${style.meta}`}>{parent.attributes.type}</p>
                                </Link>
                            </div>
                        </div>
                    )
                })}

                {ShowFullNetwork && deletedNetwork.map((child) => {
                    if (child.attributes.parentCompany.data !== null) {
                        return (
                            <div className={`${style.networkItem} ${style.deleted} rounded-lg`}>
                                <div className={` ${style.listIcon} flex-none rounded-l-lg`}>
                                    <div className={style.faIcon}>
                                        <FontAwesomeIcon icon={faBuilding} />
                                    </div>
                                </div>
                                <div className={`${style.listContent} flex-auto`}>
                                    <Link href={'/companies/'+child.attributes.parentCompany.data.attributes.hr_number} >
                                        <p className={`${style.summary}`}>{child.attributes.parentCompany.data.attributes.company_name}</p>
                                        <p className={`${style.meta}`}>
                                            {child.attributes.type} ({germanDate(child.attributes.since)+' bis '+germanDate(child.attributes.upto)})
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        )

                    } else if (child.attributes.parentExternal.data !== null) {
                        return (
                            <div className={`${style.networkItem} ${style.deleted} rounded-lg`}>
                                <div className={` ${style.listIcon} flex-none rounded-l-lg`}>
                                    <div className={style.faIcon}>
                                        {child.attributes.parentExternal.data.attributes.reg_dept == 'Behörde' ? (
                                            <FontAwesomeIcon icon={faBuildingColumns} />
                                        ) : (
                                            <FontAwesomeIcon icon={faIndustry} />
                                        )}
                                    </div>
                                </div>
                                <div className={`${style.listContent} flex-auto`}>
                                    <Link href={child.attributes.parentExternal.data.attributes.url} target='_blank' >
                                        <p className={`${style.summary}`}>{child.attributes.parentExternal.data.attributes.company_name}</p>
                                        <p className={`${style.meta}`}>
                                            {child.attributes.type} ({germanDate(child.attributes.since)+' bis '+germanDate(child.attributes.upto)})
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        )

                    } else if (child.attributes.parentPerson.data !== null) {
                        return (
                            <div className={`${style.networkItem} ${style.deleted} rounded-lg`}>
                                <div className={` ${style.listIcon} flex-none rounded-l-lg`}>
                                    <div className={style.faIcon}>
                                        <FontAwesomeIcon icon={faUser} />
                                    </div>
                                </div>
                                <div className={`${style.listContent} flex-auto`}>
                                    <Link href={'/persons/'+child.attributes.parentPerson.data.id} >
                                        <p className={`${style.summary}`}>{child.attributes.parentPerson.data.attributes.first_name} {child.attributes.parentPerson.data.attributes.sir_name}</p>
                                        <p className={`${style.meta}`}>
                                            {child.attributes.type} ({germanDate(child.attributes.since)+' bis '+germanDate(child.attributes.upto)})
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        )
                    }
                })}

                {ShowFullNetwork && deletedParents.map((parent) => {
                    return (
                        <div className={`${style.networkItem} ${style.deleted} rounded-lg`}>
                            <div className={` ${style.listIcon} flex-none rounded-l-lg`}>
                                <div className={style.faIcon}>
                                    <FontAwesomeIcon icon={faBuildingCircleArrowRight} />
                                </div>
                            </div>
                            <div className={`${style.listContent} flex-auto`}>
                                <Link href={'/companies/'+parent.attributes.childCompany.data.attributes.hr_number} >
                                    <p className={`${style.summary}`}>{parent.attributes.childCompany.data.attributes.company_name}</p>
                                    <p className={`${style.meta}`}>
                                        {parent.attributes.type} ({germanDate(parent.attributes.since)+' bis '+germanDate(parent.attributes.upto)})
                                    </p>
                                </Link>
                            </div>
                        </div>
                    )
                })}

            </div>
            {activeNetwork.length === 0 && (deletedNetwork.length > 0 || activeParents.length > 0 || deletedParents.length > 0) ? (
                <Alert theme='info'>
                    <p className="text-sm">
                        Es gibt ausgeblendete Einträge.
                    </p>
                </Alert>
            ) : ''}
            
            {(activeNetwork.length > initalNum || deletedNetwork.length > 0 || activeParents.length > 0 || deletedParents.length > 0) && (
            <button className={`${style.LenghtToggleButton} ${style.network} rounded`} onClick={() => setShowFullNetwork(!ShowFullNetwork)}>
                {ShowFullNetwork ? "Netzwerk einklappen" : "Netzwerk ausklappen"}
            </button>
            )}
            

    
        </>
    )
}