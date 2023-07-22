import style from '@/layout/ContentLists.module.sass';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { faCircleChevronDown, faFileSignature, faFile, faFileLines } from '@fortawesome/free-solid-svg-icons';
import { Disclosure } from '@headlessui/react';
import { germanDate } from '@/helpers/helpScripts';
import Link from 'next/link';


export default function DocList({content}) {
    return (
        <div>
            {content && content.data.map((item) => {
                return(
                    <Disclosure key={item.id}>
                        {({ open }) => (
                            <div className={open ? 'bg-slate-100 rounded-lg shadow-sm' : ''}>
                                    <Disclosure.Button className={`${style.listItem} rounded-lg w-full text-left`} id={`doc${item.id}`}>
                                        <div className={` ${style.listIcon} flex-none rounded-l-lg`}>
                                            <div className="w-5">
                                                <FontAwesomeIcon icon={faFileLines} />
                                            </div>
                                        </div>
                                        <div className={`${style.listContent} flex-auto`}>
                                            <p className={`${style.summary}`}>{item.attributes.docType}</p>
                                            <p className={`${style.meta}`}>{germanDate(item.attributes.createdAt)}</p>
                                        </div>
                                        <div className={`${style.hrLink} flex-none`}>
                                            <div className={`${open ? 'rotate-180 transform' : ''} w-5`}>
                                                <FontAwesomeIcon icon={faCircleChevronDown} />
                                            </div>
                                        </div>
                                    </Disclosure.Button>
                                <Disclosure.Panel>
                                    <div className="pb-5">
                                        <div className="px-5">
                                        {item.attributes.document.data ? (
                                            <Link href={process.env.NEXT_PUBLIC_STRAPI_URL+item.attributes.document.data.attributes.url} target="_blank">
                                                <button className="flex items-center font-medium text-sm text-primary hover:bg-sky-200/70 rounded-md px-2 py-1">
                                                    <FontAwesomeIcon icon={faFile} className="w-3" />
                                                    <span className="ml-3">Dokument öffnen</span>
                                                </button>
                                            </Link>
                                        ) : ''}
                                        </div>
                                        <div className="mt-2 border-t px-5 pt-3">
                                            <div className="text-sm text-primary">
                                                {item.attributes.cdl_tasks.map((certificate) => (
                                                    <div className="flex items-center justify-between pb-3">
                                                        <p>
                                                            {certificate.signer && certificate.signed_date ? (
                                                                certificate.task === 'Digitale Unterschrift mit Dokument' || certificate.task === 'Digitale Unterschrift ohne Dokument' ? (
                                                                    `${certificate.signer.data.attributes.name} hat dieses Dokument am ${germanDate(certificate.signed_date)} digital signiert.`
                                                                ) : certificate.task === 'Digitale Beglaubigung mit Dokument' || certificate.task === 'Digitale Beglaubigung ohne Dokument' ? (
                                                                    `${certificate.signer.data.attributes.name} hat dieses Dokument am ${germanDate(certificate.signed_date)} digital beglaubigt.`
                                                                ) : (`Einige Aufgaben zu diesem Dokument stehen noch aus.`)
                                                                ) : (`Einige Aufgaben zu diesem Dokument stehen noch aus.`)}
                                                        </p>
                                                        <div className="flex-initial">
                                                        {certificate.certificate_doc.data ? (
                                                            <Link href={process.env.NEXT_PUBLIC_STRAPI_URL+certificate.certificate_doc.data.attributes.url} target="_blank">
                                                                <button className="flex items-center font-medium text-sm text-primary hover:bg-sky-200/70 rounded-md px-2 py-1">
                                                                    <FontAwesomeIcon icon={faFileSignature} className="w-3" />
                                                                    <span className="ml-2">Zertifikat öffnen</span>
                                                                </button>
                                                            </Link>
                                                        ) : ''}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Disclosure.Panel>
                            </div>
                        )}
                    </Disclosure>
                )
            })}
        </div>
    )
}