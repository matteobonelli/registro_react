import React, { useEffect } from 'react'
import { useStepState } from '../classroomState/ClassroomState';

const Riepilogo: React.FC = () => {

    const [state, setState] = useStepState();

    useEffect(() => {
      console.log(state);
    }, [state])
    


  return (
    <div>
        
        <h2>Dettagli</h2>
        <li>Nome:</li>{state &&  state?.dettagli?.name }
        <li>Cognome:</li>{state &&  state?.dettagli?.lastname }

        <h2>Lista studenti</h2>
        <li>Nome lista :</li>{state &&  state?.listaStudenti?.nomeLista }
        <li>Descrizione:</li>{state &&  state?.listaStudenti?.descrizioneLista }

    </div>
  )
}

export default Riepilogo