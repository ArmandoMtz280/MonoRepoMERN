/**Este archivo se encarga de hacer todas las peticiones al API*/

import api from "@/lib/lib"
import { dashboardProjectSchema, type Project, type ProjectFormData } from "@/types"
import { isAxiosError } from "axios";

// Crear proyecto
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

// Obtener todos los proyectos
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

// Obtener Proyecto por ID
export const getProjectByID = async (id: Project["_id"]) => {
   try{
      const { data } = await api(`/projects/${id}`);
      return data;
      
      }catch(error){
      if(isAxiosError(error) && error.response){ // valida q sea un error de axios
          throw new Error(error.response.data.error) // se lanza el error y lo cacha useMutation en CreateProjectsView
      }
   }  
};

// Types para updateProject
type ProjectAPIType = {
   formData: ProjectFormData,
   projectId: Project["_id"]
};

// Editar Proyecto
export const updateProject = async ({formData, projectId}: ProjectAPIType) => {
   console.log(formData)
   try{
      const { data } = await api.put<string>(`/projects/${projectId}`, formData);
      return data;
      
      }catch(error){
      if(isAxiosError(error) && error.response){ // valida q sea un error de axios
          throw new Error(error.response.data.error) // se lanza el error y lo cacha useMutation en EditProjectsView
      }
   }  
};

// Eliminar Proyecto
export const deleteProject = async (id: Project["_id"]) => {
   try{
      const URL = `/projects/${id}`;
      const { data } = await api.delete<string>(URL);
      return data;
      
      }catch(error){
      if(isAxiosError(error) && error.response){ // valida q sea un error de axios
          throw new Error(error.response.data.error) // se lanza el error y lo cacha useMutation en CreateProjectsView
      }
   }  
};