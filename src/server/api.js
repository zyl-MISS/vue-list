import Ajax from "./ajax.js"
import UserServer from "./userServer.js"
class Server extends UserServer {
    /**
     * 获取任务列表
     * @param {obj} params 
     * @param {int} params.status                       //状态
     * @param {int} params.page                         //页码
     * @param {int} params.size                         //每页数量
     */
    getList(params){
        return Ajax({
            url:"/purchase/list",
            method:"POST",
            params:params
        })
    }
    /**
     * 创建任务
     * @param {obj} params 
     * @param {int} params.title                       //标题
     * @param {int} params.descript                    //描述
     * @param {int} params.time                        //时间
     */
    createTodo(params){
        return Ajax({
            url:"/purchase/create",
            method:"POST",
            params:params
        })
    }
    /**
     * 审批单号
     * @param {obj} params 
     * @param {int} params.id                       //标题
     * @param {int} params.status                    //描述
     */
    updateStatus(params){
        return Ajax({
            url:"/purchase/update_status",
            method:"POST",
            params:params
        })
    }
    /**
     * 编辑单号
     * @param {obj} params 
     */
    editTodo(params){
        return Ajax({
            url:"/purchase/edit",
            method:"POST",
            params:params
        })
    }
    /**
     * 编辑单号
     * @param {obj} params---id
     */
    deleteTodo(params){
        return Ajax({
            url:"/purchase/delete",
            method:"POST",
            params:params
        })
    }
}
export default new Server;