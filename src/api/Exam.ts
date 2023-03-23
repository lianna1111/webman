import { http } from "@/plugin/axios";
import qs from 'qs'

class Exam{
    get(id:number = 0){
        return http.request({url:'exam/'+id})
    }

    all(){
        return http.request({url:'exam'})
    }

    show(data:Object){
        return http.request({method:'post',url:'exam/show',data:data})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'exam/add',
            data: qs.stringify(data)
        })
    }

    mod(data:object){
        return http.request({
            method:'post',
            url: 'exam/mod',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'exam/save',
            data: qs.stringify(data)
        })
    }

    del(id:number){
        return http.request({
            method:'post',
            url: 'exam/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new Exam()
