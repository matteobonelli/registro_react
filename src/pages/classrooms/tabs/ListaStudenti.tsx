import { Label, TextInput } from 'flowbite-react';
import { t } from 'i18next';
import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useStepState } from '../classroomState/ClassroomState';

const ListaStudenti: React.FC = () => {

    const [state, setState] = useStepState();

    const {
        register,
        watch,
        formState: {errors}
    } = useForm();

    const listaStudenti = watch();

    const updatelista = () => {
        setState({...state, listaStudenti});
    }

  return (
    <form onKeyUp={() => updatelista()}>
        <div>
            <div className="my-2 block">
            <Label htmlFor="nomeLista" value={t('nomeLista')} />
            </div>
            <TextInput 
                id="nomeLista" 
                {...register('nomeLista', { required: {value: true, message: "required"}})} 
                color={errors.nomeLista ? 'failure': ''}
                helperText={
                    errors.nomeLista ? <span>{t('fieldRequired')}</span> : null
                }
            />
        </div>

        <div>
            <div className="my-2 block">
            <Label htmlFor="descrizioneLista" value={t('descrizioneLista')} />
            </div>
            <TextInput 
                id="descrizioneLista" 
                {...register('descrizioneLista', { required: {value: true, message: "required"}})} 
                color={errors.descrizioneLista ? 'failure': ''}
                helperText={
                    errors.descrizioneLista ? <span>{t('fieldRequired')}</span> : null
                }
            />
        </div>

    </form>  )
}

export default ListaStudenti