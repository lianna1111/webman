import { http } from "@/plugin/axios";
import qs from 'qs'

class Tencent{
    sms(data:object){
        return http.request({
            method:'post',
            url: 'Tencent/sms',
            data: qs.stringify(data)
        })
    }
}

export default new Tencent()
