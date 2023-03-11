<template>
  <LvProgressBar :value="value" :showValue="false" color="#e4a2f4" />
</template>

<script>
import LvProgressBar from "lightvue/progress-bar";

export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
  components: {
    LvProgressBar: LvProgressBar,
  },
};
</script>
