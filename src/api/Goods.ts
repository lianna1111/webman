import { http } from "@/plugin/axios";
import qs from 'qs'
import { LocationQueryValue } from "vue-router";

class Goods{
    get(id:number | string | LocationQueryValue[] = 0,uid:string | number = 0){
        return http.request({url:'goods/'+id+'/'+uid})
    }

    one(id:number | string | LocationQueryValue[] = 0){
        return http.request({url:'goods/one/'+id})
    }

    cate(cid:number | string | LocationQueryValue[] = 0){
        return http.request({url:'goods/cate/'+cid})
    }

    cates(){
        return http.request({url:'goods/cates'})
    }

    airpop(){
        return http.request({url:'goods/airpop'})
    }

    show(data = {}){
        return http.request({method:'post',url:'goods/show',data:qs.stringify(data)})
    }

    hash(id:number | string | LocationQueryValue[] = 0){
        return http.request({url:'goods/hash/'+id})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'goods/add',
            data: qs.stringify(data)
        })
    }

    mod(data:object){
        return http.request({
            method:'post',
            url: 'goods/mod',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'goods/save',
            data: qs.stringify(data)
        })
    }

    del(id:number){
        return http.request({
            method:'post',
            url: 'goods/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new Goods()
