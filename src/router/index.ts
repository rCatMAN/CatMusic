import { createRouter, createWebHashHistory } from "vue-router"
import Login from "../pages/home/login/index.vue"
import Player from "../pages/home/player/index.vue"
import Home from "../pages/home/index.vue"
import MusicHall from "../pages/home/explore/music-hall/index.vue"
import NewSong from "../pages/home/explore/new-song/index.vue"
import Videos from "../pages/home/explore/videos/index.vue"
import Radios from "../pages/home/explore/radio/index.vue"
import SongList from "../pages/home/song-list/index.vue"
import Search from "../pages/home/search/index.vue"
const routes = [
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/player",
        name: "player",
        component: Player,
    },
    {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "musichall",
                name: "musichall",
                component: MusicHall
            },
            {
                path: "newsong",
                name: "newsong",
                component: NewSong
            },
            {
                path: "videos",
                name: "videos",
                component: Videos
            },
            {
                path: "radios",
                name: "radios",
                component: Radios
            },
            {
                path: "songlist",
                name: "songlist",
                component: SongList
            },
            {
                path: "search",
                name: "search",
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
