import { createRouter, createWebHashHistory } from "vue-router"
import Login from "../pages/home/login/index.vue"
// import Player from "../pages/home/player/index.vue"
import Home from "../pages/home/index.vue"
import MusicHall from "../pages/home/explore/music-hall/index.vue"
import NewSong from "../pages/home/explore/new-song/index.vue"
import Videos from "../pages/home/explore/videos/index.vue"
import Radios from "../pages/home/explore/radio/index.vue"
import SongList from "../pages/home/song-list/index.vue"
import Search from "../pages/home/search/index.vue"
const Player = () => import('../pages/home/player/index.vue')
const routes = [
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    // {
    //     path: "/player",
    //     name: "player",
    //     component: Player,
    //     meta: {
    //         keepAlive: true
    //     }
    // },
    {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "musichall",
                name: "musichall",
                meta: {
                    keepAlive: false
                },
                component: MusicHall
            },
            {
                path: "newsong",
                name: "newsong",
                meta: {
                    keepAlive: false
                },
                component: NewSong
            },
            {
                path: "videos",
                name: "videos",
                meta: {
                    keepAlive: false
                },
                component: Videos
            },
            {
                path: "radios",
                name: "radios",
                meta: {
                    keepAlive: false
                },
                component: Radios
            },
            {
                path: "songlist",
                name: "songlist",
                component: SongList,
                meta: {
                    keepAlive: false
                }
            },
            {
                path: "search",
                name: "search",
                meta: {
                    keepAlive: true
                },
                component: Search
            },
        ]
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
export default router
