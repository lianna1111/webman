import { http } from "@/plugin/axios";
import qs from 'qs'

class EnterpriseCate{
    get(id:number = 0){
        return http.request({url:'enterprise_cate/'+id})
    }

    show(data:Object){
        return http.request({method:'post',url:'enterprise_cate/show',data:data})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'enterprise_cate/add',
            data: qs.stringify(data)
        })
    }

    mod(data:object){
        return http.request({
            method:'post',
            url: 'enterprise_cate/mod',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'enterprise_cate/save',
            data: qs.stringify(data)
        })
    }

    del(id:number){
        return http.request({
            method:'post',
            url: 'enterprise_cate/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new EnterpriseCate()
