import { Button } from "flowbite-react";
import React, { useEffect } from "react";
import { FaRegMoon, FaRegSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { changeDarkMode } from "../../redux/settings/settingSlice";

const StyleSwitcher: React.FC = () => {
  const dark = useSelector((state: RootState) => state.settings.dark);
  const dispatch = useDispatch();

  useEffect(() => {
    dark && document.body.classList.add("dark");
  }, [dark]);

  const darkModeHandler = () => {
    dispatch(changeDarkMode());

    document.body.classList.toggle("dark");
  };
  return (
    <Button onClick={() => darkModeHandler()}>
      {
        dark && <FaRegSun /> // render sunny when dark is true
      }
      {
        !dark && <FaRegMoon /> // render moon when dark is false
      }
    </Button>
  );
};

export default StyleSwitcher;
