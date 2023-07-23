import { germanDate } from '@/helpers/helpScripts';
import style from '@/layout/ContentLists.module.sass';
import { faBuilding, faInfo, faInfoCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useState } from 'react';
import Alert from '../basics/Alert';


export default function NetworkList({networkInfo}) {
    const [ShowFullNetwork, setShowFullNetwork] = useState(false)
    const numToShow = ShowFullNetwork ? Math.max(
        networkInfo.attributes.activeNetworkCompanies.length,
        networkInfo.attributes.activeNetworkPersons.length
      ) : 3;


    return (
        <>
        <div className={`${style.networkItem} ${style.headItem} rounded-lg`}>
            <div className={` ${style.listIcon} flex-none rounded-l-lg`}>
                <div className='w-5'>
                    <FontAwesomeIcon icon={faBuilding} />
                </div>
            </div>
            <div className={`${style.listContent} flex-auto`}>
                <p className={`${style.summary}`}>{networkInfo.attributes.company_name}</p>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div id="networkCompanies">
                <h6 className={`${style.networkTitle} rounded`}>Verbundene Unternehmen</h6>
                {networkInfo.attributes.activeNetworkCompanies.slice(0, numToShow).map((company) => {
                    return (
                        <div className={`${style.networkItem} rounded-lg`}>
                                <div className={` ${style.listIcon} flex-none rounded-l-lg`}>
                                    <div className={style.faIcon}>
                                        <FontAwesomeIcon icon={faBuilding} />
                                    </div>
                                </div>
                                <div className={`${style.listContent} flex-auto`}>
                                <Link href={'/companies/'+company.connected_company.data.attributes.hr_number} key={company.connected_company.data.attributes.hr_number}>
                                    <p className={`${style.summary}`}>{company.connected_company.data.attributes.company_name}</p>
                                    <p className={`${style.meta}`}>{company.connection_type}</p>
                                </Link>
                                </div>
                                {company.hr_public.data?.id ? (
                                    <div className={`${style.hrLink} flex-none`}>
                                        <Link href={'/hr/'+company.hr_public.data.id}>
                                            <div className='w-5'>
                                                <FontAwesomeIcon icon={faInfoCircle} />
                                            </div>
                                        </Link>
                                    </div>
                                ) : null}
                            </div>
                    )
                })}
                {
                    networkInfo.attributes.activeNetworkPersons.length == 0 && networkInfo.attributes.deletedNetworkPersons.length > 0 ? (
                        <div className="my-5">
                            <Alert theme='info'>
                                <p className="text-sm">
                                    Es gibt nur ehemals verbundene Unternehmen.
                                </p>
                            </Alert>
                            
                        </div>
                    ) : ''
                }
                {
                    networkInfo.attributes.activeNetworkPersons.length == 0 && networkInfo.attributes.deletedNetworkPersons == 0 ? (
                        <div className="my-5">
                            <Alert theme='info'>
                                <p className="text-sm">Es gibt keine aktuell oder ehemals verbundenen Unternehmen.</p>
                            </Alert>
                        </div>
                    ) : ''
                }
                {ShowFullNetwork && networkInfo.attributes.deletedNetworkCompanies.map((company) => {
                    return (
                        <Link href={'/companies/'+company.connected_company.data.attributes.hr_number} key={company.connected_company.data.attributes.hr_number}>
                        <div className={`${style.networkItem} ${style.deleted} rounded-lg`}>
                            <div className={` ${style.listIcon} flex-none rounded-l-lg`}>
                                <div className={style.faIcon}>
                                    <FontAwesomeIcon icon={faBuilding} />
                                </div>
                            </div>
                            <div className={`${style.listContent} flex-auto`}>
                                <p className={`${style.summary}`}>{company.connected_company.data.attributes.company_name}</p>
                                <p className={`${style.meta}`}>{company.connection_type} ({germanDate(company.since)} bis {germanDate(company.upto)})</p>
                            </div>
                            {company.hr_public.data?.id ? (
                                <div className={`${style.hrLink} flex-none`}>
                                    <Link href={'/hr/'+company.hr_public.data.id}>
                                        <div className='w-5'>
                                            <FontAwesomeIcon icon={faInfoCircle} />
                                        </div>
                                    </Link>
                                </div>
                            ) : null}
                        </div>
                    </Link>
                    )
                })}
            </div>
            <div id="networkPersons">
                <h6 className={`${style.networkTitle} rounded`}>Verbundene Personen</h6>
                {networkInfo.attributes.activeNetworkPersons.slice(0, numToShow).map((person) => {
                    return (
                        <Link href={'/persons/'+person.connected_person.data.id} key={person.connected_person.data.id}>
                        <div className={`${style.networkItem} rounded-lg`}>
                            <div className={` ${style.listIcon} flex-none rounded-l-lg`}>
                                <div className={style.faIcon}>
                                    <FontAwesomeIcon icon={faUser} />
                                </div>
                            </div>
                            <div className={`${style.listContent} flex-auto`}>
                                <p className={`${style.summary}`}>{person.connected_person.data.attributes.first_name} {person.connected_person.data.attributes.sir_name}</p>
                                <p className={`${style.meta}`}>{person.connection_type}</p>
                            </div>
                            {person.hr_public.data?.id ? (
                                <div className={`${style.hrLink} flex-none`}>
                                    <Link href={'/hr/'+person.hr_public.data.id}>
                                        <div className='w-5'>
                                            <FontAwesomeIcon icon={faInfoCircle} />
                                        </div>
                                    </Link>
                                </div>
                            ) : null}
                        </div>
                    </Link>
                    )
                })}
                {
                    networkInfo.attributes.activeNetworkPersons.length == 0 && networkInfo.attributes.deletedNetworkPersons.length > 0 ? (
                        <div className="my-5">
                            <Alert theme='info'>
                                <p className="text-sm">
                                    Es gibt nur ehemals verbundene Personen.
                                </p>
                            </Alert>
                            
                        </div>
                    ) : ''
                }
                {
                    networkInfo.attributes.activeNetworkPersons.length == 0 && networkInfo.attributes.deletedNetworkPersons == 0 ? (
                        <div className="my-5">
                            <Alert theme='info'>
                                <p className="text-sm">Es gibt keine aktuell oder ehemals verbundenen Personen.</p>
                            </Alert>
                        </div>
                    ) : ''
                }
                {ShowFullNetwork && networkInfo.attributes.deletedNetworkPersons.map((person) => {
                    return (
                        <Link href={'/persons/'+person.connected_person.data.id} key={person.connected_person.data.id}>
                        <div className={`${style.networkItem} ${style.deleted} rounded-lg`}>
                            <div className={` ${style.listIcon} flex-none rounded-l-lg`}>
                                <div className={style.faIcon}>
                                    <FontAwesomeIcon icon={faUser} />
                                </div>
                            </div>
                            <div className={`${style.listContent} flex-auto`}>
                                <p className={`${style.summary}`}>{person.connected_person.data.attributes.first_name} {person.connected_person.data.attributes.sir_name}</p>
                                <p className={`${style.meta}`}>
                                    {person.connection_type} ({germanDate(person.since)} bis {germanDate(person.upto)})
                                </p>
                            </div>
                            {person.hr_public.data?.id ? (
                                <div className={`${style.hrLink} flex-none`}>
                                    <Link href={'/hr/'+person.hr_public.data.id}>
                                        <div className='w-5'>
                                            <FontAwesomeIcon icon={faInfoCircle} />
                                        </div>
                                    </Link>
                                </div>
                            ) : ''}
                        </div>
                    </Link>
                    )
                })}
            </div>
        </div>
        {
            (
                networkInfo.attributes.activeNetworkCompanies.length > numToShow || networkInfo.attributes.activeNetworkPersons.length > numToShow ||
                networkInfo.attributes.deletedNetworkCompanies.length > 0 || networkInfo.attributes.deletedNetworkPersons.length > 0
            ) && (
                <button className={`${style.LenghtToggleButton} ${style.network} rounded`} onClick={() => setShowFullNetwork(!ShowFullNetwork)}>
                    {ShowFullNetwork ? "Netzwerk einklappen" : "Netzwerk ausklappen"}
                </button>
            )
        }
        </>
    )
}