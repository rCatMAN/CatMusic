import {createRouter, createWebHashHistory} from "vue-router"
import Login from "../pages/home/login/index.vue"
import Home from "../pages/home/index.vue"
import MusicHall from "../pages/home/explore/MusicHall/index.vue"
import Videos from "../pages/home/explore/Videos/index.vue"
import Radios from "../pages/home/explore/Radio/index.vue"
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
