import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Settings } from '../../components/languageSwitcher/LanguageSwitcher'

const SettingsComponent: React.FC = () => {

  const [data, setData] = useState<Settings>()

  const getSettings = () => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/settings`).then((res: any) => 
      {        
        setData(res)
      }
    )
  }

  useEffect(() => {
    getSettings();
  }, []);

  //useAuthGuard(false)

  return (
    <div>Settings</div>
  )
}

export default SettingsComponent

