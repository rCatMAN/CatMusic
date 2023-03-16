import { createRouter, createWebHashHistory } from "vue-router"
import Login from "../pages/home/login/index.vue"
import Home from "../pages/home/index.vue"
import MusicHall from "../pages/home/explore/music-hall/index.vue"
import NewSong from "../pages/home/explore/new-song/index.vue"
import Radios from "../pages/home/explore/radio/index.vue"
import SongList from "../pages/home/song-list/index.vue"
import Search from "../pages/home/search/index.vue"
const Artist = () => import('../pages/home/artist/index.vue')
const Album = () => import('../pages/home/album/index.vue')
const Videos = () => import('../pages/home/video/index.vue')
const Mvs = () => import('../pages/home/mv/index.vue')
const welcome = () => import('../pages/home/welecome/index.vue')
const routes = [
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/welcome",
        name: "welcome",
        component: welcome,
    },
    {
        path: "/",
        name: "Home",
        component: Home,
        redirect: '/welcome',
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
                path: "video",
                name: "video",
                meta: {
                    keepAlive: false
                },
                component: Videos
            },
            {
                path: "mv",
                name: "mv",
                meta: {
                    keepAlive: false
                },
                component: Mvs
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
                path: "album",
                name: "album",
                component: Album,
                meta: {
                    keepAlive: false
                }
            },
            {
                path: "artist",
                name: "artist",
                component: Artist,
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
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})
export default router
