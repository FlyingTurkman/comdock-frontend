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
                                        <p className={`${style.summary}`}>{item.attributes.type}</p>
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
                                        {item.attributes.mainDoc.data ? (
                                            <Link href={process.env.NEXT_PUBLIC_STRAPI_URL+item.attributes.mainDoc.data.attributes.url} target="_blank">
                                                <button className="flex items-center font-medium text-sm text-primary hover:bg-sky-200/70 rounded-md px-2 py-1">
                                                    <FontAwesomeIcon icon={faFile} className="w-3" />
                                                    <span className="ml-3">Dokument öffnen</span>
                                                </button>
                                            </Link>
                                        ) : ''}
                                        </div>
                                        <div className="mt-2 border-t px-5 pt-3">
                                            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-3">
                                                {item.attributes.relatedDocs.map((relation) => (
                                                    <Link href={process.env.NEXT_PUBLIC_STRAPI_URL+relation.document.data.attributes.url} target="_blank" className='col-auto'>
                                                        <button className="flex items-center font-medium text-sm text-primary hover:bg-sky-200/70 rounded-md px-2 py-1">
                                                            <FontAwesomeIcon icon={faFile} className="w-3" />
                                                            <span className="ml-3">{relation.type} öffnen</span>
                                                        </button>
                                                    </Link>
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