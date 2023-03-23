import { http } from "@/plugin/axios";
import qs from 'qs'
import { LocationQueryValue } from "vue-router";

class Carousel{
    get(id:number | string | LocationQueryValue[] = 0){
        return http.request({url:'carousel/'+id})
    }

    show(data = {}){
        return http.request({method:'post',url:'carousel/show',data:qs.stringify(data)})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'carousel/add',
            data: qs.stringify(data)
        })
    }

    mod(data:object){
        return http.request({
            method:'post',
            url: 'carousel/mod',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'carousel/save',
            data: qs.stringify(data)
        })
    }

    del(id:number){
        return http.request({
            method:'post',
            url: 'carousel/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new Carousel()
