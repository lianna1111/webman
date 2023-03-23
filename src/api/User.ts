import { http } from "@/plugin/axios";
import qs from 'qs'

class User{
    get(id:number | string){
        return http.request({url:'user/'+id}) 
    }
    
    show(data:Object){
        return http.request({method:'post',url:'user/show',data:data})
    }

    token(id  = 0){
        
    }
//
    save(data:object){
        return http.request({
            method:'post',
            url: 'user/save',
            data: qs.stringify(data)
        })
    }
    add(data:object){
        return http.request({
            method:'post',
            url: 'user/save',
            data: qs.stringify(data)
        })
    }
// 
    check(id:number | string,token:string){
        return http.request({method:'post',url:'user/check',data:{uid:id,token:token}}) 
    }

    // 用户登录接口
    login(data:object){
        return http.request({
            method:'post',
            url: 'login',
            data: qs.stringify(data)
        })
    }

    logout(){
        return http.request({
            url: 'user/logout'
        })
    }
}

export default new User()