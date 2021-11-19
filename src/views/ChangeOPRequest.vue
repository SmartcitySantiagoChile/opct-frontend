<template>
<div></div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";

export default defineComponent({
  name: "changeOPrequest",
  components: {
  },
  setup() {
    onMounted(() => {
      setCurrentPageTitle("Programa de Operación");
    });
  },
});
</script>
