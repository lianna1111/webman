import { http } from "@/plugin/axios";
import qs from 'qs'
import { LocationQueryValue } from "vue-router";

class Message{
    get(id:number | string | LocationQueryValue[] = 0){
        return http.request({url:'message/'+id})
    }

    show(data = {}){
        return http.request({method:'post',url:'message/show',data:qs.stringify(data)})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'message/add',
            data: qs.stringify(data)
        })
    }

    mod(data:object){
        return http.request({
            method:'post',
            url: 'message/mod',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'message/save',
            data: qs.stringify(data)
        })
    }

    del(id:number){
        return http.request({
            method:'post',
            url: 'message/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new Message()
