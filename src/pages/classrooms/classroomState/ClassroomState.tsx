import { createContext, useContext, useState } from "react";

export const ClassroomContext = createContext<any[]>([]);


export function StepProvider({ children }: any) {
    const dataForm = useState<any[]>([]);

    return (
        <ClassroomContext.Provider value={dataForm}>
            {children}
        </ClassroomContext.Provider>
    );
}

export function useStepState() {
    const context = useContext(ClassroomContext);
    if (!context) {
        throw new Error("useStepState must be used within the StepProvider");
    }
    return context;
}