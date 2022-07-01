<template>
  <router-view />
</template>

<style lang="scss">
@import "~bootstrap-icons/font/bootstrap-icons.css";
@import "~quill/dist/quill.snow.css";
@import "~animate.css";
@import "~sweetalert2/dist/sweetalert2.css";
@import "~@fortawesome/fontawesome-free/css/all.min.css";
@import "~line-awesome/dist/line-awesome/css/line-awesome.css";
@import "~@yaireo/tagify/src/tagify.scss";
@import "~@vueform/multiselect/themes/default.css";

// Main demo style scss
@import "assets/sass/plugins";
@import "assets/sass/style";

// Dark mode demo style scss
//@import "assets/sass/plugins.dark";
//@import "assets/sass/style.dark";

//RTL version styles
//@import "assets/css/style.rtl.css";
</style>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  name: "app",
  setup() {
    onMounted(() => {
      console.log("mounted app");
    });
  },
});
</script>
