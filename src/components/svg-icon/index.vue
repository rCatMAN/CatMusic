<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" ></use>
  </svg>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
export default defineComponent({
  props: {
    iconClass: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: '',
    },
   
  },
  setup(props) {
    return {
      iconName: computed(() => `#icon-${props.iconClass}`),
      svgClass: computed(() => {
        if (props.className) {
          return `svg-icon ${props.className}`;
        }
        return 'svg-icon';
      }),
    };
  },
});
</script>

<style scope>
.svg-icon {
  width: 2em;
  height: 2em;
  fill: currentColor;
  vertical-align: middle;
}
</style>