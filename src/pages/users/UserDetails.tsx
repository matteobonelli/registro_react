import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useMatch, useNavigate, useParams } from 'react-router-dom'
import { User } from './Users';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { Label, TextInput, Datepicker, Button } from 'flowbite-react';
import { t } from 'i18next';
import { formatDateValue } from '../../utils/dateUtils';
import { toast } from 'react-toastify';

const UserDetails: React.FC = () => {

    const {id, edit} = useParams();
    const [user, setUser] = useState<User>();
    const navigate = useNavigate();
    const [isEdit, setIsEdit] = useState<boolean>();
    

    const {
        register,
        handleSubmit,
        control,
        setValue,
        reset,
        formState: { errors, isValid },
    } = useForm<User>();
    
    const getUser = () => axios.get(`${import.meta.env.VITE_BASE_URL}/users/${id}`).then((user: any) => {
        setUser(user)
    }); 

    const onSubmit: SubmitHandler<User> = (data) => editUser(data);

    const editUser = (data: User) => axios.put(`${import.meta.env.VITE_BASE_URL}/users/${id}`, data).then(() => {
        toast('Utente modificato con successo!');
        navigate('/users')
    }); 

    useEffect(() => {      
        getUser()
    }, []);

    useEffect(() => {
        if(user) {
            reset(user);
            /*    
                setValue('name', user.name);
                setValue('lastname', user.lastname);
                setValue('dateOfBirth', user.dateOfBirth); 
            */
        }
    }, [user]);

    useEffect(() => {
      setIsEdit(!!edit);      
    }, [edit])
    
    

    
    

  return (
    <>
        <div className='flex justify-between items-center py-5'>
        <h1 className='text-xl font-bold'>{user?.name} {user?.lastname}</h1>
        {!isEdit && <Button onClick={() => navigate('edit')}>{t('edit')}</Button>}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>

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
                    disabled={!isEdit}
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
                    disabled={!isEdit}

                />
            </div>



            <div>
                <div className="my-2 block">
                <Label htmlFor="dateOfBirth" value={t('dateOfBirth')} />
                </div>

                <Controller
                    name="dateOfBirth"
                    control={control}
                    rules={{
                        validate: {
                            rangeDate: v => {
                                const minRange = dayjs().subtract(99, 'year').toDate();
                                const maxRange = dayjs().subtract(18, 'year').toDate();
                                return dayjs(v).isBefore(maxRange) && dayjs(v).isAfter(minRange)
                            }
                        }
                    }}
                    render={({ field }) => 
                        <Datepicker 
                            {...field}
                            language="it-IT"
                            maxDate={dayjs().subtract(18, 'year').toDate()}
                            minDate={dayjs().subtract(99, 'year').toDate()}
                            value={formatDateValue(field.value)}
                            onSelectedDateChanged={(date) => field.onChange(date)}
                            color={errors.dateOfBirth ? 'failure': ''}
                            helperText={
                                errors.dateOfBirth ? <span>Data non valida</span> : "Min 18 anni, max 99 anni"
                            }
                            showTodayButton={false}
                            showClearButton={false}
                            readOnly={false}
                            disabled={!isEdit}

                        />
                    }
                />

 
            </div>

            {isEdit && 
            <div className="mt-4 block">
            <Button disabled={isValid} type='submit'>{t('save')}</Button>
            </div>}

        </form>
        </>
  )
}

export default UserDetails