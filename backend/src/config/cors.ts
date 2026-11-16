import { CorsOptions } from "cors"

export const corsConfig: CorsOptions = {
    origin: function(origin, callback){
        const whiteList = [process.env.FRONTEND_URL];

        if(whiteList.includes(origin)){ // perimite la conexion si la URL viene del origen
            callback(null, true)
        }else{
            callback(new Error("Error del CORS"))
        }
    },

    
}