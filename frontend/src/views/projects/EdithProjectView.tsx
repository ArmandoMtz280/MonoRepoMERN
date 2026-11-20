import { getProjectByID } from "@/api/ProjectAPI";
import EditProjectForm from "@/components/projects/EditProjectForm";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";


export default function EdithProjectView () {

   const params = useParams(); // hook useParams() para obtener los parametros de la URL
   const projectId = params.projectId!;
         console.log(params)
         console.log(projectId)


   /**
    * data: es la informacion 
    * isLoading: retorna un true mientras carga la im¿nformacion y false cuando termina
    * error: trae el error que viene desde el backend
    * isError: retorna true o false dependiendo si hay errores
    * retry: hace las consultas que se requieran, en false solo hace
    */      
   const { data, isLoading, isError } = useQuery({
      queryKey: ["editProject", projectId],
      queryFn: () => getProjectByID(projectId),
      retry: false,
   });      

   

   if(isLoading) return "Cargando..."
   if(isError) return <Navigate to="/404" />
   if(data) return <EditProjectForm data={data}/>
};