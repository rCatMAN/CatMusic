<template>
  <div style="height: 50vh" class="overflow-scroll" ref="containerRef">
    <div v-for="(line, lineIndex) in data" class="h-10 flex">
      <div v-for="{ text, duration, startTime } in line.lineData" class="relative">
        <div class="lyric-text">{{ text }}</div>
        <div
          class="lyric-text fill-color"
          :style="{
            transition: `all ${
              lineIndex === currentLineIndex ? duration / 1000 : 0.2
            }s ease-in-out`,
          }"
          :class="isActiveText(lineIndex, startTime) ? 'active' : ''"
        >
          {{ text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { yrc } from "./test.json";
import { reactive } from "vue";
import { LetterData, LyricData } from "./types";

const containerRef = ref<HTMLDivElement>();

// defineProps<{
//   height: string;
//   data: unknown[];
//   currentData: string;
// }>();
const currentTime = ref(10000);

const tempTimeRecord = () => {
  setInterval(() => {
    currentTime.value += 100;
    // console.log("currentTime.value: ", currentTime.value);
  }, 100);
};

onMounted(() => {
  tempTimeRecord();
  console.log("containerRef: ", containerRef.value?.scrollHeight);
});
// const data = reactive([testData.yrc.lyric]);

// 解析歌词数据
const praseData = (data: string) => {
  // 将歌词字符串分割为一行行
  const lines = data.split("[").map((line) => {
    // 从行中的数据取出行的时间数据 lineTime 和歌词数据 duration
    const [time, lyric] = line.split("]");

    // 从时间中获取开始时间 startTime 和持续时间 duration
    const [startTime, lineDuration] = time.split(",");

    let lineData;
    let lastTextDuration = 100;
    let tempLineDuration = +lineDuration;

    if (lyric) {
      // 将单行歌词解析单个字的数据
      lineData = lyric.split("(").map((item) => {
        // 获取单字数据的文本数据 text 和时间数据 time
        const [time, text] = item.split(")");
        let startTime, TextDuration;

        if (time) {
          // 从时间中获取开始时间 startTime 和持续时间 duration
          [startTime, TextDuration] = time.split(",");
          tempLineDuration -= +TextDuration;
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

const data = praseData(yrc.lyric);

const currentLineIndex = computed(() =>
  data.findIndex((line, index) => {
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

const isActiveText = (lineIndex: number, startTime?: number) => {
  if (startTime && lineIndex === currentLineIndex.value) {
    if (startTime <= currentTime.value) {
      return true;
    }
    return false;
  }
  return false;
};

console.log("yrc.lyric: ", yrc.lyric);
</script>

<style scoped>
.lyric-text {
  position: relative;
  font-size: 20px;
  color: rgb(230, 230, 230);
  background-clip: text;
  letter-spacing: 6px;
  transform: translateY(0);
}

.lyric-text.fill-color {
  position: absolute;
  top: 0;
  left: 0;
  color: transparent;
  background: linear-gradient(to right, gray, rgb(230, 230, 230));
  -webkit-background-clip: text;
  width: 0%;
  overflow: hidden;
}

.lyric-text.fill-color.active {
  width: 100%;
  font-weight: bold;
  transform: translateY(-3px);
}
</style>
