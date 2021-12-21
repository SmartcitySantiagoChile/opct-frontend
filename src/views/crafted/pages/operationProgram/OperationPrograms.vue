<template>
  <OperationProgramsTable> </OperationProgramsTable>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";
import OperationProgramsTable from "@/components/widgets/tables/OperationProgramsTable.vue";

export default defineComponent({
  name: "dashboard",
  components: { OperationProgramsTable },
  setup() {
    onMounted(() => {
      setCurrentPageTitle("Administrador de PO");
    });
  },
});
</script>
