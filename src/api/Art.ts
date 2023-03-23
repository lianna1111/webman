import { http } from "@/plugin/axios";
import qs from 'qs'

/**
 * 艺术类别接口总类
 */

class Art{
    get(id:number = 0){
        return http.request({url:'art/'+id})
    }

    show(data:Object){
        return http.request({method:'post',url:'art/show',data:data})
    }

    list(){
        return http.request({url:'art/list'})
    }

    tree(){
        return http.request({url:'art/tree'})
    }

    child(){
        return http.request({url:'art/child'})
    }
    // 获取菜单接口
    all(){
        return http.request({url:'art'})
    }

    // 获取最大排序值
    sort(pid:number){
        return http.request({
            method:'post',
            url: 'art/sort',
            data: qs.stringify({pid:pid})
        })
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'art/add',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'art/save',
            data: qs.stringify(data)
        })
    }

    del(id:number){
        return http.request({
            method:'post',
            url: 'art/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new Art()