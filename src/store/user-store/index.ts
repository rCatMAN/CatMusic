import { defineStore } from "pinia"
import { getLoginStatusApi, signOutApi } from "@/request/api/user"
type userProfileType = {
    nickname?: string,
    avatarUrl?: string
}
export const useUserStore = defineStore('user', {
    state: () => {
        return {
            isLogin: false,
            userProfile: {
                nickname: undefined,
                avatarUrl: undefined
            } as userProfileType,
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
                this.userProfile = {}
            }
        },
        async signOut() {
            const { data: res } = await signOutApi()
            console.log("退出登录", res)
        }
    }
})
