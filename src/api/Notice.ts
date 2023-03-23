import { http } from "@/plugin/axios";
import qs from 'qs'
import { LocationQueryValue } from "vue-router";

class Notice{
    get(id:number | string | LocationQueryValue[] = 0){
        return http.request({url:'notice/'+id})
    }

    show(data = {}){
        return http.request({method:'post',url:'notice/show',data:qs.stringify(data)})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'notice/add',
            data: qs.stringify(data)
        })
    }

    mod(data:object){
        return http.request({
            method:'post',
            url: 'notice/mod',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'notice/save',
            data: qs.stringify(data)
        })
    }

    del(id:number){
        return http.request({
            method:'post',
            url: 'notice/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new Notice()
