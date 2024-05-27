import { Button, Tabs, TabsRef } from "flowbite-react";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import DettagliAula from "./tabs/DettagliAula";
import ListaStudenti from "./tabs/ListaStudenti";
import ListaDocenti from "./tabs/ListaDocenti";
import Riepilogo from "./tabs/Riepilogo";
import { StepProvider } from "./classroomState/ClassroomState";
import TabsButton from "./tabs/TabsButton";


const AddClassroom: React.FC = () => {
    
  const tabsRef = useRef<TabsRef>(null);
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <>
    <StepProvider>
        <Tabs
            aria-label="Default tabs"
            style="default"
            ref={tabsRef}
            onActiveTabChange={(tab) => setActiveTab(tab)}
        >
            <Tabs.Item active title="Dettagli aula" icon={HiUserCircle}>
            <DettagliAula />
            </Tabs.Item>
            <Tabs.Item disabled={true} title="Lista studenti" icon={MdDashboard}>
            <ListaStudenti />
            </Tabs.Item>
            <Tabs.Item title="Lista docenti" icon={HiAdjustments}>
            <ListaDocenti />
            </Tabs.Item>
            <Tabs.Item title="Riepilogo" icon={HiClipboardList}>
            <Riepilogo />
            </Tabs.Item>
        </Tabs>
        <TabsButton activeTab={activeTab} setActiveTab={(n) => tabsRef.current?.setActiveTab(n)} />
    </StepProvider>
    </>
  );
};

export default AddClassroom;
