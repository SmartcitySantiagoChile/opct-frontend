<template>
  <ChangeOPRequestsTable
    widget-classes="card-xxl-stretch mb-5 mb-xl-8"
  ></ChangeOPRequestsTable>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";
import ChangeOPRequestsTable from "@/components/widgets/tables/ChangeOPRequestsTable.vue";

export default defineComponent({
  name: "changeOPrequest",
  components: {
    ChangeOPRequestsTable,
  },
  setup() {
    onMounted(() => {
      setCurrentPageTitle("Programa de Operación");
    });
  },
});
</script>
