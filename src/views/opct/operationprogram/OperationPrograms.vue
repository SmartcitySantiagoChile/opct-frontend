<template>
  <OperationProgramsTable> </OperationProgramsTable>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";
import OperationProgramsTable from "@/views/opct/operationprogram/OperationProgramsTable.vue";

export default defineComponent({
  name: "OperationPrograms",
  components: { OperationProgramsTable },
  setup() {
    onMounted(() => {
      setCurrentPageTitle("Administrador de PO");
    });
  },
});
</script>
