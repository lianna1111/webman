import { http } from "@/plugin/axios";

class Qrcode{
    create(url:string){
        return http.request({
            url: 'qrcode?url='+url
        })
    }
}

export default new Qrcode()
