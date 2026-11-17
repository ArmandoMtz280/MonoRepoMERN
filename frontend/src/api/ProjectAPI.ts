import api from "@/lib/lib"
import type { ProjectFormData } from "@/types"
import { isAxiosError } from "axios";

export const createProject = async (formData: ProjectFormData) => {
     
     try{
       const { data } = await api.post("/projects", formData) // Hace la conexion
       return data;
     }catch(error){
      if(isAxiosError(error) && error.response){ // valida q sea un error de axios
          throw new Error(error.response.data.error) // se lanza el error y lo cacha useMutation en CreateProjectsView
      }
       
     }

}