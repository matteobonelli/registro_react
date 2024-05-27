import React from "react";
import { Drawer, Sidebar, TextInput } from "flowbite-react";
import {
  HiChartPie,
  HiCollection,
  HiOutlinePuzzle,
  HiOutlineOfficeBuilding,
  HiSearch,
  HiUsers,
} from "react-icons/hi";
import { ProtectedRoute } from "../../services/authGuard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface SidebarLayoutProps {
  isOpen: boolean;
  handleClose: () => void;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  isOpen,
  handleClose,
}) => {
  const enableMenu = useSelector(
    (state: RootState) => state.settings.enableMenu
  );

  return (
    <Drawer
      className="top-15 border-r h-screen border-gray-200"
      backdrop={false}
      open={isOpen}
      onClose={handleClose}
    >
      <Drawer.Header title="MENU" titleIcon={() => <></>} />
      <Drawer.Items>
        <Sidebar
          aria-label="Sidebar with multi-level dropdown example"
          className="[&>div]:bg-transparent [&>div]:p-0"
        >
          <div className="flex h-full flex-col justify-between py-2">
            <div>
              <form className="pb-3 md:hidden">
                <TextInput
                  icon={HiSearch}
                  type="search"
                  placeholder="Search"
                  required
                  size={32}
                />
              </form>
              <Sidebar.Items>
                <Sidebar.ItemGroup>
                  <Link className="btn-sidebar" to="/">
                    <HiChartPie /> Dashboard
                  </Link>
                  {enableMenu?.enableClassrooms && (
                    <Link className="btn-sidebar" to="/classrooms">
                      Aule
                    </Link>
                  )}
                  {enableMenu?.enableSubjects && (
                    <Link className="btn-sidebar" to="/subjects">
                      Materie
                    </Link>
                  )}

                  {enableMenu?.enableUsers && (
                    <Link className="btn-sidebar" to="/users">
                      Utenti
                    </Link>
                  )}
                </Sidebar.ItemGroup>
                <Sidebar.ItemGroup>
                  {false && (
                    <Link className="btn-sidebar" to="/settings">
                      Settings
                    </Link>
                  )}
                </Sidebar.ItemGroup>
              </Sidebar.Items>
            </div>
          </div>
        </Sidebar>
      </Drawer.Items>
    </Drawer>
  );
};

export default SidebarLayout;
