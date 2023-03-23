import { http } from "@/plugin/axios";
import qs from 'qs'

class Project{
    get(id:number = 0){
        return http.request({url:'project/'+id})
    }

    all(){
        return http.request({url:'project'})
    }

    show(data:Object){
        return http.request({method:'post',url:'project/show',data:data})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'project/add',
            data: qs.stringify(data)
        })
    }

    mod(data:object){
        return http.request({
            method:'post',
            url: 'project/mod',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'project/save',
            data: qs.stringify(data)
        })
    }

    del(id:number){
        return http.request({
            method:'post',
            url: 'project/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new Project()
