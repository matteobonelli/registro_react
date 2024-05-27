import { Button } from 'flowbite-react'
import React from 'react'
import { useStepState } from '../classroomState/ClassroomState';

interface TabsButtonProps {
    activeTab: number;
    setActiveTab: (n: number) => void
}

const TabsButton: React.FC<TabsButtonProps> = ({activeTab, setActiveTab}) => {

    const [state] = useStepState();


  return (
    <div className="flex justify-end">
    {activeTab !== 0 && (
    <Button
        color="gray"
        onClick={() => setActiveTab(activeTab - 1)}
    >
        Indietro
    </Button>
    )}
    {activeTab < 3 && (
    <Button
        disabled={!state?.isValid}
        className="ml-5"
        color="success"
        onClick={() => setActiveTab(activeTab + 1)}
    >
        Avanti
    </Button>
    )}
        {activeTab === 3 && (
    <Button
        className="ml-5"
        color="success"
        onClick={() => console.log('POST!')}
    >
        Salva
    </Button>
    )}
</div>
  )
}

export default TabsButton