import axios from "axios"

function Ajax(params){
    return new Promise((resolve,reject)=>{
        axios({
            url: params.url,
            method: params.method || "get", 
            baseURL: 'http://127.0.0.1:3002',
            // `transformRequest` 允许在向服务器发送前，修改请求数据
            // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
            // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
            transformRequest: [function (data, headers) {
              // 对 data 进行任意转换处理
              return data;
            }],
          
            // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
            transformResponse: [function (data) {
                // 对 data 进行任意转换处理
                let params = JSON.parse(data)
                return  params
            }],
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            params: params.params
          
            // `h
        }).then((res)=>{
            resolve(res.data)
        }).catch(err=>{
            reject(err)
        })
    })
}

export default Ajax;