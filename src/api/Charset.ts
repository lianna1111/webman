import { http } from "@/plugin/axios";
import qs from 'qs'

/**
 * 菜单接口总类
 */

class Charset{
    get(id:number = 0){
        return http.request({url:'charset/'+id})
    }

    show(data:Object){
        return http.request({method:'post',url:'charset/show',data:data})
    }

    list(){
        return http.request({url:'charsest/list'})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'charsest/add',
            data: qs.stringify(data)
        })
    }
    // 获取菜单接口
    all(){
        return http.request({url:'charsest'})
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'charset/save',
            data: qs.stringify(data)
        })
    }

    del(id:number){
        return http.request({
            method:'post',
            url: 'charset/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new Charset()