import api from "@/lib/lib"
import type { ProjectFormData } from "@/types"

export const createProject = async (formData: ProjectFormData) => {
     
     try{
       const { data } = await api.post("/projects", formData) // Hace la conexion
       return data;
     }catch(error){
       console.log(error)
     }

}