import { http } from "@/plugin/axios";
import qs from 'qs'

/**
 * 菜单接口总类
 */

class Engine{
    get(id:number = 0){
        return http.request({url:'engine/'+id})
    }

    show(data:Object){
        return http.request({method:'post',url:'engine/show',data:data})
    }

    list(){
        return http.request({url:'engine/list'})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'engine/add',
            data: qs.stringify(data)
        })
    }
    // 获取菜单接口
    all(){
        return http.request({url:'engine'})
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

export default new Engine()