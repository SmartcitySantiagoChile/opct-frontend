<template>
  <ChangeOPProcessesTable
    widget-classes="card-xxl-stretch mb-5 mb-xl-8"
  ></ChangeOPProcessesTable>
</template>
<script lang="ts">
import { defineComponent, onMounted, onUpdated } from "vue";
import {
  setCurrentCreateButton,
  setCurrentPageTitle,
} from "@/core/helpers/breadcrumb";
import ChangeOPProcessesTable from "@/components/widgets/tables/ChangeOPProcessesTable.vue";

export default defineComponent({
  name: "dashboard",
  components: {
    ChangeOPProcessesTable,
  },
  setup() {
    onMounted(() => {
      setCurrentPageTitle("Panel de Administración");
      setCurrentCreateButton("createChangeOPRequest");
    });
    onUpdated(() => {
      return setCurrentPageTitle("Panel de Administración");
    });
  },
});
</script>
