import { http } from "@/plugin/axios";
import qs from 'qs'

class Examination{
    get(id:number = 0){ // id=0 分页
        return http.request({url:'examination/'+id})
    }

    all(){
        return http.request({url:'examination/all'})
    }

    show(data:Object){
        return http.request({method:'post',url:'examination/show',data:data})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'examination/add',
            data: qs.stringify(data)
        })
    }

    mod(data:object){
        return http.request({
            method:'post',
            url: 'examination/mod',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'examination/save',
            data: qs.stringify(data)
        })
    }

    del(id:number){
        return http.request({
            method:'post',
            url: 'examination/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new Examination()
