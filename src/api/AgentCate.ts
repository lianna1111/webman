import { http } from "@/plugin/axios";
import qs from 'qs'

class AgentCate{
    get(id:number = 0){
        return http.request({url:'agent_cate/'+id})
    }

    show(data:Object){
        return http.request({method:'post',url:'agent_cate/show',data:data})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'agent_cate/add',
            data: qs.stringify(data)
        })
    }

    mod(data:object){
        return http.request({
            method:'post',
            url: 'agent_cate/mod',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'agent_cate/save',
            data: qs.stringify(data)
        })
    }

    del(id:number){
        return http.request({
            method:'post',
            url: 'agent_cate/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new AgentCate()
