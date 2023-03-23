import { http } from "@/plugin/axios";
import qs from 'qs'
import { LocationQueryValue } from "vue-router";

class Poster{
    get(id:number | string | LocationQueryValue[] = 0){
        return http.request({url:'poster/'+id})
    }

    show(data = {}){
        return http.request({method:'post',url:'poster/show',data:qs.stringify(data)})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'poster/add',
            data: qs.stringify(data)
        })
    }

    mod(data:object){
        return http.request({
            method:'post',
            url: 'poster/mod',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'poster/save',
            data: qs.stringify(data)
        })
    }

    del(id:number){
        return http.request({
            method:'post',
            url: 'poster/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new Poster()
