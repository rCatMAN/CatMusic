<template>
    <div class="w-full  bg-white ">
        <div class=" container relative" style="width: 90%;left: 50%;transform: translateX(-50%);aspect-ratio: 3/1;">
            <div id="slide">
                <div class="item" style="background-image: url('src/picture/harbor/Ep5_3_Harbor_Endcard_3.png');">
                    <div class="content">
                        <div class="name">
                            哈珀
                        </div>
                        <div class="des">
                            控场者
                        </div>
                        <button class="bg-red-300">See More</button>
                    </div>
                </div>
                <div class="item" style="background-image: url('src/picture/viper/VALORANT_Viper.jpg');">
                    <div class="content">
                        <div class="name">
                            薇蝮
                        </div>
                        <div class="des">
                            控场者
                        </div>
                        <button class="bg-red-300">See More</button>
                    </div>
                </div>
                <div class="item" style="background-image: url('src/picture/sova/VALORANT_Sova_Dark.jpg');">
                    <div class="content">
                        <div class="name">
                            稣法
                        </div>
                        <div class="des">
                            先锋
                        </div>
                        <button class="bg-red-300">See More</button>
                    </div>
                </div>
                <div class="item" style="background-image: url('src/picture/killjoy.jpg');">
                    <div class="content">
                        <div class="name">
                            愷宙
                        </div>
                        <div class="des">
                            哨位
                        </div>
                        <button class="bg-red-300">See More</button>
                    </div>
                </div>
                <div class="item" style="background-image: url('src/picture/yoru.png');">
                    <div class="content">
                        <div class="name">
                            夜戮
                        </div>
                        <div class="des">
                            决斗者
                        </div>
                        <button class="">See More</button>
                    </div>
                </div>
                <div class="item" style="background-image: url('src/picture/skye/Skye_KeyArt_PR_3.jpg');">
                    <div class="content">
                        <div class="name">
                            丝凯
                        </div>
                        <div class="des">
                            控场者
                        </div>
                        <button class="bg-red-300">See More</button>
                    </div>
                </div>

            </div>
            <div class="buttons flex items-center justify-center">
                <div @click="next()" class="icon-box bg-white " style="width:30px;height:30px">
                    <SvgIcon icon-class="back" style="width:15px" />
                </div>
                <div @click="last()" class="icon-box bg-white ml-3" style="width:30px;height:30px">
                    <SvgIcon icon-class="front" style="width:15px" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>

const next = () => {
    let lists = document.querySelectorAll('.item')
    document.getElementById('slide')?.appendChild(lists[0])
}
const last = () => {
    let lists = document.querySelectorAll('.item')
    document.getElementById('slide')?.prepend(lists[lists.length - 1])
}
</script>

<style scoped>
#slide {
    width: max-content;
}

.item {
    width: 200px;
    height: 300px;
    background-position: 50%, 50%;
    display: inline-block;
    transition: 0.5s;
    background-size: cover;
    position: absolute;
    z-index: 10;
    top: 50%;
    /* transform: translateY(-10%); */
    border-radius: 20px;
    box-shadow: 0 30px 50px #505050;
    overflow: hidden;
}

.item:nth-child(1) {
    left: 0;
    top: 0;
    transform: translate(0, 0);
    background-position: top;
    border-radius: 0;
    width: 100%;
    height: 100%;
    box-shadow: none;
    aspect-ratio: 16/9;
}

.item:nth-child(2) {
    left: 0;
    top: 0;
    transform: translate(0, 0);
    background-position: top;
    border-radius: 0;
    width: 100%;
    height: 100%;
    box-shadow: none;
    aspect-ratio: 16/9;
}

.item:nth-child(3) {
    left: 60%;
}

.item:nth-child(4) {
    left: calc(55% + 220px);


}

.item:nth-child(5) {
    left: calc(50% + 440px);


}

.item:nth-child(n+6) {
    left: calc(50% + 660px);

    opacity: 0;
}

.item .content {
    position: absolute;
    top: 50%;
    left: 10%;
    width: 300px;
    text-align: left;
    padding: 0px;
    color: #eee;
    transform: translate(0, -50%);
    display: none;
}

.item:nth-child(2) .content {
    display: block;
    z-index: 100;
}

.item .name {
    font-weight: 600;
    font-size: 40px;
    opacity: 0;
    animation: showcontent 1s ease-in-out 1 forwards;
}

.item .des {
    opacity: 0;
    margin: 20px 0;
    animation: showcontent 1s ease-in-out 0.3s 1 forwards;
}

.item button {
    transition: 1s all;
    padding: 10px 20px;
    border: none;
    opacity: 0;
    backdrop-filter: saturate(200%) blur(2px);
    background-color: hsla(0, 0%, 100%, 0.183);
    animation: showcontent 1s ease-in-out 0.6s 1 forwards;
}

.item button:hover {
    transition: 1s all;
    backdrop-filter: blur(3px) saturate(200%);
}

@keyframes showcontent {
    from {
        opacity: 0;
        transform: translate(0, 100px);
        filter: blur(33px);
    }

    to {
        opacity: 1;
        transform: translate(0, 0);
        filter: blur(0px);
    }
}

.buttons {
    position: absolute;
    bottom: 30px;
    z-index: 100;
    width: 100%;
}
</style>  