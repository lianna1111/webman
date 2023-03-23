import { http } from "@/plugin/axios";
import qs from 'qs'
import { LocationQueryValue } from "vue-router";

class Ulist{
    get(id:number | string | LocationQueryValue[] = 0){
        return http.request({url:'ulist/'+id})
    }

    show(data = {}){
        return http.request({method:'post',url:'ulist/show',data:qs.stringify(data)})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'ulist/add',
            data: qs.stringify(data)
        })
    }

    mod(data:object){
        return http.request({
            method:'post',
            url: 'ulist/mod',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'ulist/save',
            data: qs.stringify(data)
        })
    }

    del(id:number){
        return http.request({
            method:'post',
            url: 'ulist/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new Ulist()
