import { http } from "@/plugin/axios";
import qs from 'qs'
import { LocationQueryValue } from "vue-router";

class Tabbar{
    get(id:number | string | LocationQueryValue[] = 0){
        return http.request({url:'tabbar/'+id})
    }

    show(data = {}){
        return http.request({method:'post',url:'tabbar/show',data:qs.stringify(data)})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'tabbar/add',
            data: qs.stringify(data)
        })
    }

    mod(data:object){
        return http.request({
            method:'post',
            url: 'tabbar/mod',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'tabbar/save',
            data: qs.stringify(data)
        })
    }

    del(id:number){
        return http.request({
            method:'post',
            url: 'tabbar/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new Tabbar()
