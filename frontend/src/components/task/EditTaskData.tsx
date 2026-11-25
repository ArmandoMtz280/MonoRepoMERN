import { getTaskById } from "@/api/TaskAPI";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";

/**se encarga de la logica, solo hace la consulta y renderiza el modal */
export default function EditTaskData() {

   const params = useParams();
   const projectId = params.projectId!; // obtiene el id del proyecto desde la url

   const location = useLocation(); // lee el query string
   const queryParams = new URLSearchParams(location.search); // extrae el queryparam
   const taskId = queryParams.get("editTask")!; // extare el valor de ese param
         console.log(taskId)

   const { data } = useQuery({
       queryKey: ["task", taskId],
       queryFn: () => getTaskById({projectId, taskId}),
       

   }) ;
   
   console.log(data)

   return(
      <div>Edit task data</div>
   );
};