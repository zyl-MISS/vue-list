import Vue from 'vue'
import Vuex from 'vuex'
// import action from './action/index.js'
import mutations from './mutations/index.js'
Vue.use(Vuex)
const store = new Vuex.Store({
    state:{
        user_info:{
            user_name:'',
            power:'',
            user_id:"",
            phone:""
        },
        user_name:'',
        power:'',
        user_id:"",
        phone:""

    },
    // action:action,
    mutations:mutations
})
export default store