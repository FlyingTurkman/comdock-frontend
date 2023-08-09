import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PageHeader from "../basics/PageHeader"
import { faBuilding, faUser } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { Now } from "@/helpers/helpScripts"
import style from '@/layout/DetailPage.module.sass'


export default function DetailPage({title, children, contentType, badge}) {

    const [activeLink, setActiveLink] = useState();
    
    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('.detailSection');
            let currentActiveLink = '';
        
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                const scrollPosition = window.scrollY;
        
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentActiveLink = section.id;
                }
            });
        
            if (currentActiveLink !== activeLink) {
                setActiveLink(currentActiveLink);
            }
        };
      
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeLink]);

    return (
        <>
            <PageHeader title={title}>
                <div className="h1 flex items-center">
                    { contentType && (
                    <div className="flex-none w-8 mr-6">
                        {contentType == 'company' ? (<FontAwesomeIcon icon={faBuilding} />) : ''}
                        {contentType == 'person' ? (<FontAwesomeIcon icon={faUser} />) : ''}
                    </div>
                    )}
                    <span>{title}</span>
                    <span className={` ${style.TitleBadge}`}>
                        {badge !== 'aktiv' ? (badge) : ''}
                    </span>
                </div>
            </PageHeader>
            <div className="w-full relative">
                <aside className={`${style.tableOfContent} lg:block hidden`}>
                    <div className={style.sectionsList}>
                        <ul>
                            {React.Children.toArray(children).map(child => {
                                if (child.type == 'section' && child.props.className === 'detailSection') {
                                    return (
                                        <li key={child.props.id}>
                                            <Link href={`#${child.props.id}`} className={`${style.tocItem} rounded-r ${activeLink === child.props.id ? 'active' : ''}`}>
                                                {Array.isArray(child.props.children) ? child.props.children[0].props.children : child.props.children.props.children}
                                            </Link>
                                        </li>
                                    );
                                };
                            })}
                        </ul>
                        <p className={style.tocText}>Abruf vom <Now /></p>
                    </div>
                </aside>
                <article className="wrapper">
                    {children}
                </article>
            </div>
        </>
    )
}