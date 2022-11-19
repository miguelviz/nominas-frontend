import axios from "axios";
import Constants from "./Constants";
const PostRequest = ({postData,url,load})=>{
    return new Promise((resolve,reject)=>{
        (async()=>{
            axios.defaults.baseURL = Constants.BACKEND;
            if(load){
                load(true);
            }
            let r = await axios.post(url,postData).catch(e=>{
                console.log(e);
                reject({
                    error:"Error al conectar al servidor"
                })
            })
            if(r){
                if(r.data){
                    if(r.data.error){
                        reject({
                            error:r.data.error
                        })
                    }else{
                        resolve(r.data);
                    }
                }
            }
            if(load){
                load(false);
            }
        })()
    })
}
export default PostRequest;