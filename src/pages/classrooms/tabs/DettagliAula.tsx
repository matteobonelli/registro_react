import { Button, Label, TextInput } from 'flowbite-react';
import { t } from 'i18next';
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useStepState } from '../classroomState/ClassroomState';

const DettagliAula: React.FC = () => {

    const {
        register,
        watch,
        formState: {errors, isValid}
    } = useForm();

    const [state, setState] = useStepState();
    const dettagli = watch();

    const updateDettagli = () => {
        setState({...state, dettagli});
    }

    useEffect(() => {
        setState({...state, dettagli});
    }, [isValid])
    
      

  return (
    <>
    <form onKeyUp={() => updateDettagli()}>
        <div>
            <div className="my-2 block">
            <Label htmlFor="name" value={t('name')} />
            </div>
            <TextInput 
                id="name" 
                {...register('name', { required: {value: true, message: "required"}})} 
                color={errors.name ? 'failure': ''}
                helperText={
                    errors.name ? <span>{t('fieldRequired')}</span> : null
                }
            />
        </div>

        <div>
            <div className="my-2 block">
            <Label htmlFor="lastname" value={t('lastname')} />
            </div>
            <TextInput 
                id="lastname" 
                {...register('lastname', { required: {value: true, message: "required"}})} 
                color={errors.lastname ? 'failure': ''}
                helperText={
                    errors.lastname ? <span>{t('fieldRequired')}</span> : null
                }
            />
        </div>

    </form>
    </>
  )
}

export default DettagliAula