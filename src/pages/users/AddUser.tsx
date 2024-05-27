import { Button, Datepicker, Label, TextInput } from 'flowbite-react'
import { t } from 'i18next'
import React from 'react'
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { User } from './Users'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import dayjs from "dayjs";
import { formatDateValue } from '../../utils/dateUtils'
import relativeTime from "dayjs/plugin/relativeTime";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(relativeTime);
dayjs.extend(isSameOrAfter);


const AddUser: React.FC = () => {

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isValid },
    } = useForm<User>({
        mode: 'onBlur',
    });

    const onSubmit: SubmitHandler<User> = (data) => addUser(data);
    const navigate = useNavigate();

    const addUser = (data: User) => axios.post(`${import.meta.env.VITE_BASE_URL}/users`, data).then(() => {
        toast('Utente salvato con successo!');
        navigate('/users')
    }); 

    console.log(errors);
    




    
  return (
    <>
        <div className='flex justify-between items-center py-5'>
        <h1 className='text-xl font-bold'>{t('add')} User</h1>
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
                        />
                    }
                />

 
            </div>

            <div className="mt-4 block">
            <Button disabled={!isValid} type='submit'>{t('save')}</Button>
            </div>

        </form>
    </>

    




    )
}

export default AddUser