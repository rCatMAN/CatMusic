import { defineStore } from "pinia"
import { Howl } from 'howler'
export const useHowlerStore = defineStore('howler', {
    state: () => {
        return {
            isShowPlayerPage: false,
            nowPlayingId: 1,
            howler: null as any,
            volume: 1,
            isPlaying: false,
            isLoaded: false,
            nowPlayTime: 0,
            durationTime: 0,
        }
    },
    actions: {
        newHowl(url: any, store: any) {
            if (this.howler) {
                this.howler.unload()
                this.isPlaying = false
                this.nowPlayTime = 0
            }
            this.howler = new Howl({
                format: 'mp3',
                src: url,
                volume: store.volume,
                html5: true,
                loop: false,
                preload: true,
                autoplay: true,
                mute: false,
                onend() {
                    store.isPlaying = false
                    console.log('播放结束', store.isPlaying)
                },
                onload() {

                    store.durationTime = this.duration()
                    console.log('初始化durationTime', store.durationTime,)
                    store.isLoaded = true
                    console.log('加载完成', store.isLoaded)
                },
                onplay() {
                    store.isPlaying = true
                }
            })
            console.log('加载中', store.isLoaded)
            this.isLoaded = false
        },
        setNowPlayTime() {
            this.nowPlayTime = this.howler.seek()
        }
    }
})
