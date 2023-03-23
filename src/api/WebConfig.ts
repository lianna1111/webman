import { http } from "@/plugin/axios";
import qs from 'qs'
import { LocationQueryValue } from "vue-router";

class WebConfig{
    get(id:number | string | LocationQueryValue[] = 0){
        return http.request({url:'webconfig/'+id})
    }

    show(data = {}){
        return http.request({method:'post',url:'webconfig/show',data:qs.stringify(data)})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'webconfig/add',
            data: qs.stringify(data)
        })
    }

    mod(data:object){
        return http.request({
            method:'post',
            url: 'webconfig/mod',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'webconfig/save',
            data: qs.stringify(data)
        })
    }

    del(id:number){
        return http.request({
            method:'post',
            url: 'webconfig/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new WebConfig()
