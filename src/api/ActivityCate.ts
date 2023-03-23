import { http } from "@/plugin/axios";
import qs from 'qs'
import { LocationQueryValue } from "vue-router";

class ActivityCate{
    get(id:number | string | LocationQueryValue[] = 0){
        return http.request({url:'activity_cate/'+id})
    }

    show(data = {}){
        return http.request({method:'post',url:'activity_cate/show',data:qs.stringify(data)})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'activity_cate/add',
            data: qs.stringify(data)
        })
    }

    mod(data:object){
        return http.request({
            method:'post',
            url: 'activity_cate/mod',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'activity_cate/save',
            data: qs.stringify(data)
        })
    }

    del(id:number){
        return http.request({
            method:'post',
            url: 'activity_cate/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new ActivityCate()
