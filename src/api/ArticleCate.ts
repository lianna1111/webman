import { http } from "@/plugin/axios";
import qs from 'qs'
import { LocationQueryValue } from "vue-router";

class ArticleCate{
    get(id:number | string | LocationQueryValue[] = 0){
        return http.request({url:'article_cate/'+id})
    }

    show(data = {}){
        return http.request({method:'post',url:'article_cate/show',data:qs.stringify(data)})
    }

    add(data:object){
        return http.request({
            method:'post',
            url: 'article_cate/add',
            data: qs.stringify(data)
        })
    }

    mod(data:object){
        return http.request({
            method:'post',
            url: 'article_cate/mod',
            data: qs.stringify(data)
        })
    }

    save(data:object){
        return http.request({
            method:'post',
            url: 'article_cate/save',
            data: qs.stringify(data)
        })
    }

    del(id:number){
        return http.request({
            method:'post',
            url: 'article_cate/del',
            data: qs.stringify({id:id})
        })
    }
}

export default new ArticleCate()
