import { http } from "@/plugin/axios";
import qs from 'qs'
import { LocationQueryValue } from "vue-router";

class Article{
    get(id:number | string | LocationQueryValue[] = 0){
        return http.request({url:'article/'+id})
    }

    show(data = {}){
        return http.request({method:'post',url:'article/show',data:qs.stringify(data)})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'article/add',
            data: qs.stringify(data)
        })
    }

    mod(data:object){
        return http.request({
            method:'post',
            url: 'article/mod',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'article/save',
            data: qs.stringify(data)
        })
    }

    del(id:number){
        return http.request({
            method:'post',
            url: 'article/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new Article()
