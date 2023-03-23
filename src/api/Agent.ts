import { http } from "@/plugin/axios";
import qs from 'qs'

class Agent{
    get(id:number = 0){
        return http.request({url:'agent/'+id})
    }
// 获取
all(){
    return http.request({url:'agent'})
}
    show(data = {}){
        return http.request({method:'post',url:'agent/show',data:qs.stringify(data)})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'agent/add',
            data: qs.stringify(data)
        })
    }

    mod(data:object){
        return http.request({
            method:'post',
            url: 'agent/mod',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'agent/save',
            data: qs.stringify(data)
        })
    }

    del(id:number){
        return http.request({
            method:'post',
            url: 'agent/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new Agent()
