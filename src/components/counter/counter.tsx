import { Badge, Button } from 'flowbite-react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, incrementByAmount } from '../../redux/counter/counterSlice';
import { RootState } from '../../redux/store';
import { getSettings } from '../../redux/settings/settingSlice';

const Counter: React.FC = () => {

    const count = useSelector((state: RootState) => state.counter.value);
    const loading = useSelector((state: RootState) => state.settings.loading);

    const dispatch = useDispatch();
    


  return (
    <div className='mt-10'>
        <div className='flex'>
        <Button
            aria-label="Decrement value"
            label="decrementa"
            onClick={() => dispatch(decrement())}

        >Decrementa</Button>

        <Badge className='p-10 text-xl text-center' color="info">{count}</Badge>

        <Button
            aria-label="Increment value"
            label="Incrementa"
            onClick={() => dispatch(increment())}
        >Incrementa</Button>


        <div>
        <Button
            aria-label="Increment value"
            label="Incrementa"
            onClick={() => dispatch(incrementByAmount(10))}
        >Incrementa di 10</Button>  
        </div>

        <div>
            <Button 
            disabled={loading === "pending"}
            onClick={() => dispatch<any>(getSettings())}>Aggiorna Settings</Button>
        </div>

        </div>
  </div>
  )
}

export default Counter