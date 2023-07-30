import { Remarkable } from 'remarkable';
import { faFile } from '@fortawesome/free-regular-svg-icons';
import { faBuilding, faBuildingColumns, faCircleMinus, faCirclePlus, faCodeBranch, faEllipsis, faGraduationCap, faHouseUser, faIndustry, faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

export async function fetcher(endpoint, query, options = {}) {
    let response;
    let url


    if (!query || query == ``) {
      url = process.env.NEXT_PUBLIC_STRAPI_URL+'/api/'+endpoint
    } else {
      url = process.env.NEXT_PUBLIC_STRAPI_URL+'/api/'+endpoint+'?'+query
    }

    if (!options) {
      response = await fetch(url);
    } else {
      response = await fetch(url, options);
    }

    const data = await response.json();
    return data;
  }

export function germanDate(dateString) {
  // Renders the given dateString to German format TT.MM.YYYY
  const formatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }
  const date = new Date(dateString).toLocaleDateString('de-DE', formatOptions)
  return date;
}

export const Now = () => {
    // Renderes the current Date and Time in German format TT.MM.YYYY, HH:MM
    const [now, setNow] = useState('');
  
    useEffect(() => {
      const updateTimestamp = () => {
        const timestamp = new Date();
        const formatOptions = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }
        const localTimestamp = timestamp.toLocaleString('de-DE', formatOptions);
        setNow(localTimestamp);
      };
  
      updateTimestamp(); // Update on component mount
  
    }, []);
  
    return now;
  };
  


export async function markdownToHtml(markdown) {
    const md = new Remarkable({
        html: true,
        breaks: true,
        typographer: true,
        quotes: '“”‘’',
    });

    md.renderer.rules.underline_open = () => '<u>';
    md.renderer.rules.underline_close = () => '</u>';

    return md.render(markdown);
}

export function dynamicIconHandler(import_icon) {
    const iconMap = {
        'faEllipsis': faEllipsis,
        'faGraduationCap': faGraduationCap,
        'faUser': faUser,
        'faCirclePlus': faCirclePlus,
        'faBuilding': faBuilding,
        'faFile': faFile,
        'faCircleMinus': faCircleMinus,
        'faCodeBranch': faCodeBranch,
        'faIndustry': faIndustry,
        'faBuildingColumns': faBuildingColumns,
        'faHouseUser': faHouseUser
    };
    const export_icon = iconMap[import_icon];
    return export_icon
}
