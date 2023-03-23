import router from '@/router'
import { UserObj } from '@/util/interface'
import User from '@/api/User'

// 检查登录
function checkLogin(){
    const uid = localStorage.getItem('uid')
    const nickname = localStorage.getItem('nickname')
    const sign = localStorage.getItem('sign')
    const face = localStorage.getItem('face')
    const token = localStorage.getItem('token')
    let user = {} as UserObj

    if(uid == null || nickname == null || face == null || sign == null || token == null){
        return false
    }

    return { uid,nickname,sign,face,token } 
}

function getUser(){
    const uid = localStorage.getItem('uid')!
    const nickname = localStorage.getItem('nickname')!
    const face = localStorage.getItem('face')!
    const sign = localStorage.getItem('sign')!
    const token = localStorage.getItem('token')!

    return { uid,nickname,sign,face,token } 
}

// 存储登录信息
function setLogin(data:any){
    localStorage.setItem('uid',data.uid)
    localStorage.setItem('nickname',data.nickname)
    localStorage.setItem('face',data.face)
    localStorage.setItem('sign',data.sign)
    localStorage.setItem('token',data.token)

    console.log('token: '+localStorage.getItem('token'))
}

function setLogout(){
    localStorage.removeItem('uid')
    localStorage.removeItem('nickname')
    localStorage.removeItem('face')
    localStorage.removeItem('sign')
    localStorage.removeItem('token')
    localStorage.clear()
}

// 检查字符是否为空
function checkStr(str:string,type = 'string'){

    if(str == null || str == 'undefined' || str.trim() == ''){
        return false
    }
    return true
}

export { checkLogin,getUser,setLogin,setLogout }