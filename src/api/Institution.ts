import { http } from "@/plugin/axios";
import qs from 'qs'

class Institution{
    get(id:number = 0){
        return http.request({url:'institution/'+id})
    }

    show(data:Object){
        return http.request({method:'post',url:'institution/show',data:data})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'institution/add',
            data: qs.stringify(data)
        })
    }

    mod(data:object){
        return http.request({
            method:'post',
            url: 'institution/mod',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'institution/save',
            data: qs.stringify(data)
        })
    }

    del(id:number){
        return http.request({
            method:'post',
            url: 'institution/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new Institution()
