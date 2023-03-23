import { http } from "@/plugin/axios";
import qs from 'qs'
import { LocationQueryValue } from "vue-router";

class Activity{
    get(id:number | string | LocationQueryValue[] = 0){
        return http.request({url:'activity/'+id})
    }

    show(data = {}){
        return http.request({method:'post',url:'activity/show',data:qs.stringify(data)})
    }

    cate(cid:number | string | LocationQueryValue[] = 0){
        return http.request({url:'activity/cate/'+cid})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'activity/add',
            data: qs.stringify(data)
        })
    }

    mod(data:object){
        return http.request({
            method:'post',
            url: 'activity/mod',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'activity/save',
            data: qs.stringify(data)
        })
    }

    del(id:number){
        return http.request({
            method:'post',
            url: 'activity/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new Activity()
