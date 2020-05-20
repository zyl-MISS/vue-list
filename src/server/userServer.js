import Ajax from "./ajax.js"
class UserServer {
    goLogin(params){
        return Ajax({
            url:"/user/login",
            method:"POST",
            params:params
        })
    }
    goReg(params){
        return Ajax({
            url:"/user/reg",
            method:"POST",
            params:params
        })
    }
}
export default  UserServer;