import { http } from "@/plugin/axios";
import qs from 'qs'
import { LocationQueryValue } from "vue-router";

class Contact{
    get(id:number | string | LocationQueryValue[] = 0){
        return http.request({url:'contact/'+id})
    }
    invite(aid:number = 0){
        return http.request({url:'contact/invite/'+aid})
    }
}

export default new Contact()
