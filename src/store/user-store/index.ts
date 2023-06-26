import { defineStore } from "pinia"
import { getLoginStatusApi, signOutApi } from "@/request/api/user"
import { useRouter } from "vue-router"

const router = useRouter()

type userProfileType = {
    nickname?: string,
    avatarUrl?: string,
    userId?: number,
}
export const useUserStore = defineStore('user', {
    state: () => ({
        isLogin: false,
        userProfile: {} as userProfileType,
        isLoaded: false,
    }),
    actions: {
        async setLoginStatus() {
            const { data: profile } = await getLoginStatusApi()
            if (profile.data.profile) {
                this.isLogin = true
                this.userProfile = profile.data.profile
                console.log("执行了setLOGIN", this.userProfile)
            } else {
                console.log("执行了setLOGIN")
                this.isLogin = false
                this.userProfile = {}
            }
        },
        async signOut() {
            const { data: res } = await signOutApi()
            router.push({ path: '/musichall' })
            console.log("退出登录", res)
        }
    }
})
