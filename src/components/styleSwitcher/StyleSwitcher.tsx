import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaRegMoon, FaRegSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { changeDarkMode } from "../../redux/settings/settingSlice";
import { httpGet, httpPatch } from "../../services/httpService";
import { useTranslation } from "react-i18next";

const StyleSwitcher: React.FC = () => {
  const dark = useSelector((state: RootState) => state.settings.dark);
  let isDark = false;
  const dispatch = useDispatch();

  const { i18n } = useTranslation();

  const [data, setData] = useState<boolean>()

  let lang = 'gb';

  useEffect(() => {
    httpGet("settings")
    .then((res: any) => 
      {        
        isDark = res?.isDark
        setData(isDark);
        localStorage.setItem("isDark", `${isDark}`);
        console.log("il valore del db di isDark è :" + res?.isDark);
        lang = res?.lang;
        res?.isDark && document.body.classList.add("dark");
      }
    );
    
  }, [dark]);

  const darkModeHandler = () => {
    dispatch(changeDarkMode());
    httpPatch("settings", {
      lang: lang,
      isDark: !data
  })
      .then(response => {
          console.log('Response:', response);
          document.body.classList.toggle("dark");
      })
      .catch(error => {
          console.error('Error:', error);
      });
    
  };
  return (
    <Button onClick={() => darkModeHandler()}>
      {
        isDark && <FaRegSun /> // render sunny when dark is true
      }
      {
        !isDark && <FaRegMoon /> // render moon when dark is false
      }
    </Button>
  );
};

export default StyleSwitcher;
