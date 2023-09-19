

import axios from 'axios'
import { ElLoading } from 'element-plus'
class HttpRequest{
    instance:any;
    constructor(baseConfig:any){
        this.instance=axios.create(baseConfig)
        this.instance.interceptors.request.use((config:any)=>{
            const token =localStorage.getItem('token')
            ElLoading.service({ fullscreen: true ,text:'加载中'})
            if(token){
                config.headers.Authorization=token
            }
            return config
        },(error:any)=>{
            return Promise.reject(error)
        })
        this.instance.interceptors.response.use((res:any)=>{
            ElLoading.service({ fullscreen: true ,text:'加载中'}).close()
            return res.data
        },(error:any)=>{
            return Promise.reject(error)
        })
    }
    get(url:string,params:any={}){
        return this.instance.get(url,{params})
    }
    post(url:string,data:any={}){
        return this.instance.post(url,data)
    }
    put(url:string,data:any={}){
        return this.instance.put(url,data)
    }
    delete(url:string,data:any={}){
        return this.instance.delete(url,data)
    }
}
export default new HttpRequest({
    baseURL:'http://shiyansong.cn:8888/api/private/v1',
    timeout:5000
})