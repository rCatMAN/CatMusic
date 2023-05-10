import { createRouter, createWebHashHistory } from "vue-router"
const Login = () => import("../pages/home/login/index.vue")
const Home = () => import("../pages/home/index.vue")
const MusicHall = () => import("../pages/home/explore/music-hall/index.vue")
const NewSong = () => import("../pages/home/explore/new-song/index.vue")
const Radios = () => import("../pages/home/explore/Radio/index.vue")
const SongList = () => import("../pages/home/song-list/index.vue")
const Search = () => import("../pages/home/search/index.vue")
const Artist = () => import('../pages/home/artist/index.vue')
const Album = () => import('../pages/home/album/index.vue')
const Videos = () => import('../pages/home/video/index.vue')
const Mvs = () => import('../pages/home/mv/index.vue')
const welcome = () => import('../pages/home/welecome/index.vue')
const MusicSpace = () => import('../pages/home/user-space/index.vue')
const UserSongList = () => import('../pages/home/user-space/all-album.vue')
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
        redirect: '/musichall',
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
            {
                path: "musicspace",
                name: "musicspace",
                component: MusicSpace,
                redirect: '/musicspace/songlist',
                children: [
                    {
                        path: "songlist",
                        name: "user-songlist",
                        meta: {
                            keepAlive: false
                        },
                        component: UserSongList
                    },
                ]
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
