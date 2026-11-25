import { getProjectByID } from "@/api/ProjectAPI";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import  AddTaskModal  from "../../components/task/AddTaskModal"
import TaskList from "@/components/task/TaskList";


export default function ProjectDetailsView () {

   const navigate = useNavigate();
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
      retry: false, /** */
   });      

   

   if(isLoading) return "Cargando..."
   if(isError) return <Navigate to="/404" />
   if(data) return (
      <>
         <h1 className="text-5xl font-black">{data.projectName}</h1>
         <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>
         <nav className="my-5 flex gap-3">
            <button 
              type="button" 
              className="bg-purple-400
                        hover:bg-purple-500 
                        px-10 py-3 
                        text-white 
                        text-xl 
                        font-bold 
                        cursor-pointer 
                        transition-colors"
            onClick={() => navigate("?newTask=true")}            
            >Agregar Tarea</button> 
         </nav>
         <TaskList
           tasks={data.tasks} />
         <AddTaskModal />
      </>
   );
};