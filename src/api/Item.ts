import { http } from "@/plugin/axios";
import qs from 'qs'

class Item{
    show(data:Object){
        return http.request({method:'post',url:'item/show',data:data})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'item/add',
            data: qs.stringify(data)
        })
    }
}

export default new Item()
