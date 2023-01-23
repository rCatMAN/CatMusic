import {createRouter, createWebHashHistory} from "vue-router"
import Login from "../pages/home/login/index.vue"
import Home from "../pages/home/index.vue"
import MusicHall from "../pages/home/explore/music-hall/index.vue"
import Videos from "../pages/home/explore/videos/index.vue"
import Radios from "../pages/home/explore/radio/index.vue"
const routes = [
    {
        path:"/login",
        name:"Login",
        component:Login,
    },
    {
        path:"/",
        name:"Home",
        component:Home,
        children:[
            {
                path:"musichall",
                name:"musichall",
                component:MusicHall
            },
            {
                path:"videos",
                name:"videos",
                component:Videos
            },
            {
                path:"radios",
                name:"radios",
                component:Radios
            },
        ]
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes, 
  })
export default router
