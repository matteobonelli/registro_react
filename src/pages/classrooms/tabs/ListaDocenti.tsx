import { Button, TextInput } from "flowbite-react";
import { t } from "i18next";
import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useStepState } from "../classroomState/ClassroomState";

const ListaDocenti: React.FC = () => {
  const [state, setState] = useStepState();

  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "docenti", // unique name for your Field Array
  });

  useEffect(() => {
    append({ name: "", lastname: "" });
  }, [])
  
  const listaDocenti = watch("docenti");

  useEffect(() => {     
    setState({ ...state, ...{listaDocenti} });
  }, [listaDocenti]);

  return (
    <>
      <div>ListaDocenti</div>
      <form>
        {fields.map((field, index) => (
          <div className="flex" key={field.id}>
            <TextInput id="name" {...register(`docenti.${index}.name`)} />
            <TextInput
              id="lastname"
              {...register(`docenti.${index}.lastname`)}
            />

            <Button
            disabled={index === 0}
              onClick={() => {
                remove(index);
              }}
            >
              Rimuovi
            </Button>
          </div>
        ))}
      </form>
      <div className="flex">
        <Button
          onClick={() => {
            append({ name: "" });
          }}
        >
          Aggiungi
        </Button>
      </div>
    </>
  );
};

export default ListaDocenti;
