import classNames from 'classnames';
import { Dropdown } from 'flowbite-react'
import React, { useEffect, useState }  from 'react'
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {

    const { i18n } = useTranslation();

    const [languages, setlanguages] = useState<string[]>()

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('lng', lang);
    }

    useEffect(() => {
        
        let obj = i18n.options.resources;
       
        obj && setlanguages(Object.keys(obj));
        console.log(languages);

    }, [])



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