/**Este archivo se encarga de hacer todas las peticiones al API*/

import api from "@/lib/lib"
import { dashboardProjectSchema, type ProjectFormData } from "@/types"
import { isAxiosError } from "axios";

export const createProject = async (formData: ProjectFormData) => {
     
     try{
       const { data } = await api.post("/projects", formData) // Hace la peticion
       return data;
     }catch(error){
      if(isAxiosError(error) && error.response){ // valida q sea un error de axios
          throw new Error(error.response.data.error) // se lanza el error y lo cacha useMutation en CreateProjectsView
      }
       
     }

};

export const getAllProjects = async () => {
   try{
      const { data } = await api("/projects");
      const response = dashboardProjectSchema.safeParse(data)
      if(response.success){
          return response.data
      }
   }catch(error){
      if(isAxiosError(error) && error.response){ // valida q sea un error de axios
          throw new Error(error.response.data.error) // se lanza el error y lo cacha useMutation en CreateProjectsView
      }
   }  
};