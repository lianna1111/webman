import { http } from "@/plugin/axios";
import qs from 'qs'

/**
 * 订单接口总类
 */

class Order{
    get(id:number = 0){
        return http.request({url:'order/'+id})
    }

    show(data = {}){
        return http.request({method:'post',url:'order/show',data:qs.stringify(data)})
    }

    exports(data:Object){
        return http.request({
            method:'post',
            url: 'order/export',
            data: qs.stringify(data)
        })
    }

    list(){
        return http.request({url:'order/list'})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'order/add',
            data: qs.stringify(data)
        })
    }
    // 获取菜单接口
    all(){
        return http.request({url:'order'})
    }

    // 手动上链
    mchain(order:any){
        return http.request({url:'order/mchain/'+order})
    }

    schain(operation_id:string){
        return http.request({url:'order/schain/'+operation_id})
    }

    // 手动回调
    mnotify(order:any){
        return http.request({url:'order/mnotify/'+order})
    }

    // 锁单
    mlock(order:any){
        return http.request({url:'order/mlock/'+order})
    }

    // 恢复锁单
    unlock(order:any){
        return http.request({url:'order/unlock/'+order})
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'order/save',
            data: qs.stringify(data)
        })
    }

    airdrop(data:object){
        return http.request({
            method:'post',
            url: 'order/airdrop',
            data: qs.stringify(data)
        })
    }

    del(id:number){
        return http.request({
            method:'post',
            url: 'order/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new Order()