import axios from 'axios';
import classNames from 'classnames';
import { Dropdown } from 'flowbite-react'
import React, { useEffect, useState }  from 'react'
import { useTranslation } from 'react-i18next';
import Settings from '../../pages/settings/Settings';
import { httpGet, httpPatch } from '../../services/httpService';

export interface Settings {
    id: number,
    isDark: boolean,
    lang: string
  }



const LanguageSwitcher: React.FC = () => {

    let isDark = false;

    const { i18n } = useTranslation();

    const [data, setData] = useState<Settings>()

  useEffect(() => {
    httpGet("settings")
    .then((res: any) => 
        {        
            isDark = res?.isDark;
            setData(res)
            console.log(res?.lang);
            i18n.changeLanguage(res?.lang ? res?.lang : "en");
        }
      );
    let obj = i18n.options.resources;
    obj && setlanguages(Object.keys(obj));
    console.log(languages);
    //i18n.changeLanguage(savedLanguage);
  }, []);


    const [languages, setlanguages] = useState<string[]>()

    //console.log(savedLanguage);
    

    const changeLanguage = (lang: string) => {
        httpPatch("settings", {
            lang: lang,
            isDark: isDark
        })
            .then(response => {
                console.log('Response:', response);
                i18n.changeLanguage(lang);
                localStorage.setItem('lng', lang);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }




  return (
    <Dropdown label={<span className={`fi fi-${i18n.language}`}></span>} inline>
        {
            languages?.map((lang: string, index: number) => (
                <Dropdown.Item key={index} onClick={() => changeLanguage(lang)}><span className={`fi fi-${lang}`}></span></Dropdown.Item>
            ))
        }
    </Dropdown>
  )
}

export default LanguageSwitcher