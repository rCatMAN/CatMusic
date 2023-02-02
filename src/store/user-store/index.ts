import { defineStore } from "pinia"
import { getLoginStatusApi, signOutApi } from "@/request/api/user"
export const useUserStore = defineStore('user', {
    state: () => {
        return {
            isLogin: false,
            userProfile: null,
            isLoaded: false,
        }
    },
    // getters:{
    //     getIsLogin:(state)=>{
    //         return state.isLogin
    //     }
    // },
    actions: {
        async setLoginStatus() {
            const { data: profile } = await getLoginStatusApi()
            if (profile.data.profile) {
                console.log("执行了setLOGIN")
                this.isLogin = true
                this.userProfile = profile.data.profile
            } else {
                console.log("执行了setLOGIN")
                this.isLogin = false
                this.userProfile = null
            }
        },
        async signOut() {
            const { data: res } = await signOutApi()
            console.log("退出登录", res)
        }
    }
    // const isLogin = ref(false)
    // const userName = ref("")
    // async function setLoginStatus(){
    //     const { data:response } = await getLoginStatus()
    //     if( response.profile){
    //         isLogin.value = true
    //         userName.value = response.profile.nickname
    //     }else{
    //         isLogin.value = false
    //     }
    // }
})
