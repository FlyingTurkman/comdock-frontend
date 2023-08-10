import { germanDate } from '@/helpers/helpScripts';
import style from '@/layout/ContentLists.module.sass';
import { faBuilding, faBuildingCircleArrowRight, faBuildingColumns, faIndustry, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useState } from 'react';
import Alert from '../basics/Alert';


export default function Network({networkInfo}) {

    // PARENT = Partner ist dieser Firma übergeordnet
    const parents = networkInfo.attributes.networkParents.data.sort((newest, oldest) => oldest.attributes.since.localeCompare(newest.attributes.since));
    const activeParents = parents.filter(item => item.attributes.upto === null);
    const deletedParents = parents.filter(item => item.attributes.upto !== null);

    const children = networkInfo.attributes.networkChildren.data.sort((newest, oldest) => oldest.attributes.since.localeCompare(newest.attributes.since));
    const activeChildren = children.filter(item => item.attributes.upto === null);
    const deletedChildren = children.filter(item => item.attributes.upto !== null);

    const [ShowFullNetwork, setShowFullNetwork] = useState(false)
    const initalNum = 4
    const numToShow = ShowFullNetwork ? activeParents.length : initalNum;

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
                
                {activeParents.slice(0, numToShow).map((parent) => {
                    if (parent.attributes.parentCompany.data !== null) {
                        return (
                            <div className={`${style.networkItem} rounded-lg`} key={parent.id}>
                                <div className={` ${style.listIcon} flex-none rounded-l-lg`}>
                                    <div className={style.faIcon}>
                                        <FontAwesomeIcon icon={faBuilding} />
                                    </div>
                                </div>
                                <div className={`${style.listContent} flex-auto`}>
                                    <Link href={'/companies/'+parent.attributes.parentCompany.data.attributes.hr_number} >
                                        <p className={`${style.summary}`}>{parent.attributes.parentCompany.data.attributes.company_name}</p>
                                        <p className={`${style.meta}`}>{parent.attributes.type}</p>
                                    </Link>
                                </div>
                            </div>
                        )

                    } else if (parent.attributes.parentExternal.data !== null) {
                        return (
                            <div className={`${style.networkItem} rounded-lg`} key={parent.id}>
                                <div className={` ${style.listIcon} flex-none rounded-l-lg`}>
                                    <div className={style.faIcon}>
                                        {parent.attributes.parentExternal.data.attributes.reg_dept == 'Behörde' ? (
                                            <FontAwesomeIcon icon={faBuildingColumns} />
                                        ) : (
                                            <FontAwesomeIcon icon={faIndustry} />
                                        )}
                                    </div>
                                </div>
                                <div className={`${style.listContent} flex-auto`}>
                                    <Link href={parent.attributes.parentExternal.data.attributes.url} target='_blank' >
                                        <p className={`${style.summary}`}>{parent.attributes.parentExternal.data.attributes.company_name}</p>
                                        <p className={`${style.meta}`}>{parent.attributes.type}</p>
                                    </Link>
                                </div>
                            </div>
                        )

                    } else if (parent.attributes.parentPerson.data !== null) {
                        return (
                            <div className={`${style.networkItem} rounded-lg`} key={parent.id}>
                                <div className={` ${style.listIcon} flex-none rounded-l-lg`}>
                                    <div className={style.faIcon}>
                                        <FontAwesomeIcon icon={faUser} />
                                    </div>
                                </div>
                                <div className={`${style.listContent} flex-auto`}>
                                    <Link href={'/persons/'+parent.attributes.parentPerson.data.id} >
                                        <p className={`${style.summary}`}>{parent.attributes.parentPerson.data.attributes.first_name} {parent.attributes.parentPerson.data.attributes.sir_name}</p>
                                        <p className={`${style.meta}`}>{parent.attributes.type}</p>
                                    </Link>
                                </div>
                            </div>
                        )
                    }
                })}

                {ShowFullNetwork && activeChildren.map((child) => {
                    return (
                        <div className={`${style.networkItem} rounded-lg`} key={child.id}>
                            <div className={` ${style.listIcon} flex-none rounded-l-lg`}>
                                <div className={style.faIcon}>
                                    <FontAwesomeIcon icon={faBuildingCircleArrowRight} />
                                </div>
                            </div>
                            <div className={`${style.listContent} flex-auto`}>
                                <Link href={'/companies/'+child.attributes.childCompany.data.attributes.hr_number} >
                                    <p className={`${style.summary}`}>{child.attributes.childCompany.data.attributes.company_name}</p>
                                    <p className={`${style.meta}`}>{child.attributes.type}</p>
                                </Link>
                            </div>
                        </div>
                    )
                })}


                {ShowFullNetwork && deletedParents.map((parent) => {
                    if (parent.attributes.parentCompany.data !== null) {
                        return (
                            <div className={`${style.networkItem} ${style.deleted} rounded-lg`} key={parent.id}>
                                <div className={` ${style.listIcon} flex-none rounded-l-lg`}>
                                    <div className={style.faIcon}>
                                        <FontAwesomeIcon icon={faBuilding} />
                                    </div>
                                </div>
                                <div className={`${style.listContent} flex-auto`}>
                                    <Link href={'/companies/'+parent.attributes.parentCompany.data.attributes.hr_number} >
                                        <p className={`${style.summary}`}>{parent.attributes.parentCompany.data.attributes.company_name}</p>
                                        <p className={`${style.meta}`}>
                                            {parent.attributes.type} ({germanDate(parent.attributes.since)} bis {germanDate(parent.attributes.upto)})
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        )

                    } else if (parent.attributes.parentExternal.data !== null) {
                        return (
                            <div className={`${style.networkItem} ${style.deleted} rounded-lg`} key={parent.id}>
                                <div className={` ${style.listIcon} flex-none rounded-l-lg`}>
                                    <div className={style.faIcon}>
                                        {parent.attributes.parentExternal.data.attributes.reg_dept == 'Behörde' ? (
                                            <FontAwesomeIcon icon={faBuildingColumns} />
                                        ) : (
                                            <FontAwesomeIcon icon={faIndustry} />
                                        )}
                                    </div>
                                </div>
                                <div className={`${style.listContent} flex-auto`}>
                                    <Link href={parent.attributes.parentExternal.data.attributes.url} target='_blank' >
                                        <p className={`${style.summary}`}>{parent.attributes.parentExternal.data.attributes.company_name}</p>
                                        <p className={`${style.meta}`}>
                                            {parent.attributes.type} ({germanDate(parent.attributes.since)} bis {germanDate(parent.attributes.upto)})
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        )

                    } else if (parent.attributes.parentPerson.data !== null) {
                        return (
                            <div className={`${style.networkItem} ${style.deleted} rounded-lg`} key={parent.id}>
                                <div className={` ${style.listIcon} flex-none rounded-l-lg`}>
                                    <div className={style.faIcon}>
                                        <FontAwesomeIcon icon={faUser} />
                                    </div>
                                </div>
                                <div className={`${style.listContent} flex-auto`}>
                                    <Link href={'/persons/'+parent.attributes.parentPerson.data.id} >
                                        <p className={`${style.summary}`}>{parent.attributes.parentPerson.data.attributes.first_name} {parent.attributes.parentPerson.data.attributes.sir_name}</p>
                                        <p className={`${style.meta}`}>
                                            {parent.attributes.type} ({germanDate(parent.attributes.since)} bis {germanDate(parent.attributes.upto)})
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        )
                    }
                })}

                {ShowFullNetwork && deletedChildren.map((child) => {
                    return (
                        <div className={`${style.networkItem} ${style.deleted} rounded-lg`} key={child.id}>
                            <div className={` ${style.listIcon} flex-none rounded-l-lg`}>
                                <div className={style.faIcon}>
                                    <FontAwesomeIcon icon={faBuildingCircleArrowRight} />
                                </div>
                            </div>
                            <div className={`${style.listContent} flex-auto`}>
                                <Link href={'/companies/'+child.attributes.childCompany.data.attributes.hr_number} >
                                    <p className={`${style.summary}`}>{child.attributes.childCompany.data.attributes.company_name}</p>
                                    <p className={`${style.meta}`}>
                                        {child.attributes.type} ({germanDate(child.attributes.since)+' bis '+germanDate(child.attributes.upto)})
                                    </p>
                                </Link>
                            </div>
                        </div>
                    )
                })}

            </div>
            {!ShowFullNetwork && activeParents.length === 0 && (deletedParents.length > 0 || activeChildren.length > 0 || deletedChildren.length > 0) ? (
                <Alert theme='info'>
                    <p className="text-sm">
                        Es gibt ausgeblendete Einträge.
                    </p>
                </Alert>
            ) : ''}
            
            {(activeParents.length > initalNum || deletedParents.length > 0 || activeChildren.length > 0 || deletedChildren.length > 0) && (
                <button className={`${style.LenghtToggleButton} ${style.network} rounded`} onClick={() => setShowFullNetwork(!ShowFullNetwork)}>
                    {ShowFullNetwork ? "Netzwerk einklappen" : "Netzwerk ausklappen"}
                </button>
            )}
            

    
        </>
    )
}