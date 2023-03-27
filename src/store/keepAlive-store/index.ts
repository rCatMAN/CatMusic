import { defineStore } from "pinia";

export const usekeepAliveStore = defineStore('keepAliveStore', {
    state: () => ({
            name: '',
            artist: [{ name: '' }],
            picUrl: ''
        }),
    actions: {
        addState(name: string, artist: Array<{ name: string }>, picUrl: string) {
            this.name = name
            this.artist = artist
            this.picUrl = picUrl
        },
    }
})
