import { http } from "@/plugin/axios";
import qs from 'qs'

/**
 * 行为接口总类
 */

class Handle{
    get(id:number = 0){
        return http.request({url:'handle/'+id})
    }

    show(data:Object){
        return http.request({method:'post',url:'handle/show',data:data})
    }

    list(){
        return http.request({url:'handle/list'})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'handle/add',
            data: qs.stringify(data)
        })
    }
    // 获取行为接口
    all(){
        return http.request({url:'handle'})
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'engine/save',
            data: qs.stringify(data)
        })
    }

    del(id:number){
        return http.request({
            method:'post',
            url: 'engine/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new Handle()