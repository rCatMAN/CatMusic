import { defineStore } from "pinia"
import { Howl } from 'howler'
export const useHowlerStore = defineStore('howler', {
    state: () => {
        return {
            nowPlayingId: 1,
            howler: null as any,
            volume: 1,
            isPlaying: false,
            isLoaded: false,
        }
    },
    actions: {
        newHowl(url: any) {
            if (this.howler) {
                console.log('清除上一个howl')
                this.howler.unload()
            }
            console.log('在store里newHowl')
            this.howler = new Howl({
                format: 'mp3',
                src: url,
                volume: this.volume,
                html5: true,
                loop: false,
                preload: true,
                autoplay: false,
                mute: false,
                onend() {
                    this.isPlaying = false
                },
                onload() {
                    console.log('加载完成')
                    this.isLoaded = true
                },
            })
            console.log('加载中')
            this.isLoaded = false
        },
    }
})
