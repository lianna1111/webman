import { http } from "@/plugin/axios";
import qs from 'qs'

class Enterprise{
    get(id:number = 0){
        return http.request({url:'enterprise/'+id})
    }

    show(data:Object){
        return http.request({method:'post',url:'enterprise/show',data:data})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'enterprise/add',
            data: qs.stringify(data)
        })
    }

    mod(data:object){
        return http.request({
            method:'post',
            url: 'enterprise/mod',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'enterprise/save',
            data: qs.stringify(data)
        })
    }

    del(id:number){
        return http.request({
            method:'post',
            url: 'enterprise/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new Enterprise()
