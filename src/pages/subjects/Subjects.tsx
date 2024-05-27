import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const Subjects: React.FC = () => {

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: {errors}
} = useForm();

  const dataForm = watch();

  const getDataForm = () => console.log(dataForm);
  

 const onSubmit: SubmitHandler<any> = (data) => console.log(data)

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register('name', {required: true})}/>
      {errors.name && <span>This field is required</span>}
      <br />
      <input type="text" {...register('lastname')}/>
      
      <button type="submit">Invia</button>

    </form>


    <button onClick={() => getDataForm()}>getDataForm</button>
    </>
  )
}

export default Subjects