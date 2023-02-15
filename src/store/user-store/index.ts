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
})
