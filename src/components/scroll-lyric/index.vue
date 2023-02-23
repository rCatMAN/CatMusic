<template>
  <div id="scroll" class=" absolute w-full h-full overflow-hidden select-none">
    <div>
      <div class="w-full" style="height: 50%;">
      </div>
      <div v-for="(line, lineIndex) in data" @click="clickToPage(lineIndex)"
        class="line-background h-12  rounded-xl flex items-center justify-center cursor-pointer duration-500 ease-out"
        style="">
        <div v-for="{ text, duration, startTime } in line.lineData" class="relative">
          <!-- 歌词原字体元素 -->
          <div class="lyric-text" :class="isActiveText(lineIndex, startTime) ? 'active' : ''" :style="{
            transition: `all ${lineIndex === currentLineIndex ? duration / 1000 : 0.2
              }s ease-out`,
          }">{{ text }}</div>
          <!-- 歌词播放填充字体元素 -->
          <div class="lyric-text fill-color" :style="{
            transition: `all ${lineIndex === currentLineIndex ? duration / 1000 : 0.2
              }s ease-out`,
          }" :class="isActiveText(lineIndex, startTime) ? 'active' : ''">
            {{ text }}
          </div>
        </div>
      </div>
      <div class="w-full" style="height: 50%;">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IScroll from 'iscroll/build/iscroll'
import { songLyricApi } from '@/request/api/detail'
import { useHowlerStore } from '@/store/howler-store';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref, reactive, watch, onActivated } from "vue";
import { LyricData, lyricListType } from "./types";
const howlerStore = useHowlerStore()
const { nowPlayingId } = storeToRefs(howlerStore)
const data = ref<LyricData>()
const myScroll = ref()
const lyricList = reactive<lyricListType>({
  lrc: {
    lyric: ''
  },
  yrc: {
    lyric: '',
    handleLyric: [],
    currentLyric: ''
  },
})
// 当前播放时间
const currentTime = computed(() => {
  return (howlerStore.nowPlayTime * 1000) + 350
});
// onMounted(async () => {
//   const { data: lyricRes } = await songLyricApi(nowPlayingId.value)
//   if (lyricRes.yrc.lyric) {
//     lyricList.yrc.lyric = lyricRes.yrc.lyric
//     lyricList.yrc.handleLyric = lyricList.yrc.lyric.split('}')
//     lyricList.yrc.currentLyric = lyricList.yrc.handleLyric[lyricList.yrc.handleLyric.length - 1]
//     data.value = praseData(lyricList.yrc.currentLyric);
//     setTimeout(() => {
//       myScroll.value = new IScroll('#scroll', {
//         mouseWheel: true,
//         scrollbars: false,
//         scrollX: true,
//         bounce: true,
//         mouseWheelSpeed: 3,
//         snap: '.line-background',
//       });
//       console.log('初始化myscroll', myScroll.value)
//     }, 100);
//   }

// })
watch(nowPlayingId, async () => {
  const { data: lyricRes } = await songLyricApi(nowPlayingId.value)
  lyricList.yrc.lyric = lyricRes.yrc.lyric
  lyricList.yrc.handleLyric = lyricList.yrc.lyric.split('}')
  lyricList.yrc.currentLyric = lyricList.yrc.handleLyric[lyricList.yrc.handleLyric.length - 1]
  data.value = praseData(lyricList.yrc.currentLyric);
  setTimeout(() => {
    myScroll.value = new IScroll('#scroll', {
      mouseWheel: true,
      scrollbars: false,
      scrollX: true,
      bounce: true,
      mouseWheelSpeed: 3,
      snap: '.line-background',
    });
    console.log('刷新myscroll', myScroll.value)
  }, 100);
})
const clickToPage = (lineIndex: number) => {
  if (!myScroll.value.moved) {
    myScroll.value.goToPage(0, lineIndex - 6, 3000)
  }
}

// 解析歌词数据
const praseData = (data: string) => {
  // 将歌词字符串分割为一行行
  const lines = data.split("[").map((line) => {
    // 从行中的数据取出行的时间数据 lineTime 和歌词数据 duration
    const [time, lyric] = line.split("]");

    // 从时间中获取开始时间 startTime 和持续时间 duration
    const [startTime, lineDuration] = time.split(",");

    let lineData;

    if (lyric) {
      // 将单行歌词解析单个字的数据
      lineData = lyric.split("(").map((item) => {
        // 获取单字数据的文本数据 text 和时间数据 time
        const [time, text] = item.split(")");
        let startTime, TextDuration;

        if (time) {
          // 从时间中获取开始时间 startTime 和持续时间 duration
          [startTime, TextDuration] = time.split(",");
        }

        return {
          text,
          startTime: parseInt(startTime || ""),
          duration: parseInt(TextDuration || ""),
        };
      });
    }
    return { startTime: parseInt(startTime), duration: parseInt(lineDuration), lineData };
  });

  return lines as LyricData;
};

// 计算当前播放的行数
const currentLineIndex = computed(() =>
  data.value?.findIndex((line, index) => {
    if (line && line.startTime && line.duration) {
      const { startTime, duration } = line;
      const endTime = startTime + duration;
      if (startTime <= currentTime.value && currentTime.value <= endTime) {
        return true;
      }
      return false;
    }
    return false;
  })
);

watch(currentLineIndex, () => {
  if (!(lyricList.yrc.currentLyric === '')) {
    if (currentLineIndex.value && currentLineIndex.value > 0) {
      if (myScroll.value && !myScroll.value.moved) {
        myScroll.value.goToPage(0, currentLineIndex.value - 6, 2000)
      }
    }
  }

})
// 判断歌词是否需要触发激活效果
const isActiveText = (lineIndex: number, startTime?: number) => {
  if (startTime && lineIndex === currentLineIndex.value) {
    if (startTime <= currentTime.value) {
      return true;
    }
    return false;
  }
  return false;
};

</script>

<style scoped>
.lyric-text {
  position: relative;
  font-size: 22px;
  color: rgba(230, 230, 230, 0.728);
  background-clip: text;
  letter-spacing: 6px;
  transform: translateY(0);
}

.lyric-text.active {

  transform: translateY(-3px);
}

.lyric-text.fill-color {
  position: absolute;
  top: 0;
  left: 0;
  color: transparent;
  background: linear-gradient(0deg, #7028e4 0%, #e5b2ca 100%);
  -webkit-background-clip: text;
  width: 0%;
  overflow: hidden;
}

.lyric-text.fill-color.active {
  width: 100%;
  z-index: 10;
  transform: translateY(-3px);
}

.line-background:hover {

  background-color: rgba(128, 128, 128, 0.11);
}
</style>
