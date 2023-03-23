import { http } from "@/plugin/axios";
import qs from 'qs'

class Role{
    get(id:number = 0){
        return http.request({url:'role/'+id})
    }

    show(){
        return http.request({method:'post',url:'role/show'})
    }

    child(){
        return http.request({url:'role/child'})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'role/add',
            data: qs.stringify(data)
        })
    }

    mod(data:object){
        return http.request({
            method:'post',
            url: 'role/mod',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'role/save',
            data: qs.stringify(data)
        })
    }

    del(id:number){
        return http.request({
            method:'post',
            url: 'role/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new Role()
