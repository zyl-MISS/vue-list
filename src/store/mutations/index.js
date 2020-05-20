export default {
    updateUserInfo (state, user_info) {
        state.user_info.user_id = user_info.id
        state.user_info.user_name = user_info.user_name
        state.user_info.phone = user_info.phone
        state.user_info.power = user_info.power
        state.user_id = user_info.id
        state.user_name = user_info.user_name
        state.phone = user_info.phone
        state.power = user_info.power
    },
    signOut(state){
        state.user_info.user_id = ""
        state.user_info.user_name = ""
        state.user_info.phone = ""
        state.user_info.power = ""
        state.user_id = ""
        state.user_name = ""
        state.phone = ""
        state.power =""
    },
}