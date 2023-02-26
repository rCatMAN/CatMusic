export type LyricData = {
  startTime: number;
  duration?: number;
  lineData?: LetterData[];
}[];

export type LetterData = {
  startTime: number;
  duration: number;
  text: string;
};
export type lyricListType = {
  lrc: {
    lyric: string
  }
  yrc: {
    lyric: string
    currentLyric: string
    handleLyric: string[]
  }
}
