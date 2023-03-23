import { http } from "@/plugin/axios";
import qs from 'qs'
import { LocationQueryValue } from "vue-router";

class UlistCate{
    get(id:number | string | LocationQueryValue[] = 0){
        return http.request({url:'ulist_cate/'+id})
    }

    show(data = {}){
        return http.request({method:'post',url:'ulist_cate/show',data:qs.stringify(data)})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'ulist_cate/add',
            data: qs.stringify(data)
        })
    }

    mod(data:object){
        return http.request({
            method:'post',
            url: 'ulist_cate/mod',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'ulist_cate/save',
            data: qs.stringify(data)
        })
    }

    del(id:number){
        return http.request({
            method:'post',
            url: 'ulist_cate/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new UlistCate()
