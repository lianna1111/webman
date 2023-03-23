import { http } from "@/plugin/axios";
import qs from 'qs'

class Unit{
    get(id:number = 0){
        return http.request({url:'unit/'+id})
    }

    show(data:Object){
        return http.request({method:'post',url:'unit/show',data:data})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'unit/add',
            data: qs.stringify(data)
        })
    }

    mod(data:object){
        return http.request({
            method:'post',
            url: 'unit/mod',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'unit/save',
            data: qs.stringify(data)
        })
    }

    del(id:number){
        return http.request({
            method:'post',
            url: 'unit/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new Unit()
