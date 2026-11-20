import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ProjectForm from "@/components/projects/ProjectForm";
import type { ProjectFormData } from "@/types";
import { createProject } from "@/api/ProjectAPI";

export default function CreateProjectsView () {

   const naviegate = useNavigate();
   const initialValues: ProjectFormData = {
      projectName: "",
      clientName: "",
      description: ""
   };

   const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: initialValues});

   const { mutate } = useMutation({ // uso de useMutation de react-query
      mutationFn: createProject, // funcion que se ejecuta
      onError: (error) => {   // que sucede en un error
        toast.error(error.message)
      },
      onSuccess: (data) => {  // que sucede cuando es exitosa 
        toast.success(data)
        naviegate("/") // se redirecciona a proyectos
      }
   });

/**con mutate no se requiere q la funcion se asincrona react query maneja la asincronia */
   const handleForm = (formdata: ProjectFormData) => mutate(formdata);


   // const handleForm = async (formdata: ProjectFormData) => {
   //    await mutation.mutateAsync(formdata);
   //    //   const data = await createProject(formdata) // Se crea proyecto
   //    //   toast.success(data)
   //    //   naviegate("/") // se redirecciona a proyectos
   // };
 
   return(
       <>
        <div className="max-w-3xl mx-auto">
           <h1 className="text-5xl font-black">Crear Proyecto</h1>
           <p className="text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario para crear un proyecto</p>

           <nav className="my-5">
               <Link to="/" className="bg-purple-400 hover:bg-purple-500
                px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors">
                    Volver a Proyectos
               </Link>
           </nav>

           <form className="mt-10 bg-white shadow-lg p-10 rounded-lg" onClick={handleSubmit(handleForm)} noValidate>

              <ProjectForm
                register={register}
                errors={errors}
              />

              <input 
                type="submit" 
                value="Crear Proyecto"
                className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"/>
           </form>
        </div>
       </>
   );
};