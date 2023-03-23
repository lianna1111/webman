import { http } from "@/plugin/axios";
import qs from 'qs'
import { LocationQueryValue } from "vue-router";

class WebNav{
    get(id:number | string | LocationQueryValue[] = 0){
        return http.request({url:'webnav/'+id})
    }

    show(data = {}){
        return http.request({method:'post',url:'webnav/show',data:qs.stringify(data)})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'webnav/add',
            data: qs.stringify(data)
        })
    }

    mod(data:object){
        return http.request({
            method:'post',
            url: 'webnav/mod',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'webnav/save',
            data: qs.stringify(data)
        })
    }

    del(id:number){
        return http.request({
            method:'post',
            url: 'webnav/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new WebNav()
