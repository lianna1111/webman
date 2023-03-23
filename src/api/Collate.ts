import { http } from "@/plugin/axios";
import qs from 'qs'

/**
 * 菜单接口总类
 */

class Collate{
    get(id:number = 0){
        return http.request({url:'collate/'+id})
    }

    show(data:Object){
        return http.request({method:'post',url:'collate/show',data:data})
    }

    list(){
        return http.request({url:'collate/list'})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'collate/add',
            data: qs.stringify(data)
        })
    }
    // 获取菜单接口
    all(){
        return http.request({url:'collate'})
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'collate/save',
            data: qs.stringify(data)
        })
    }

    del(id:number){
        return http.request({
            method:'post',
            url: 'collate/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new Collate()