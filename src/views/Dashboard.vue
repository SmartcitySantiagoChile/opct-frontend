<template>
  <ChangeOPRequestsTable
    widget-classes="card-xxl-stretch mb-5 mb-xl-8"
  ></ChangeOPRequestsTable>
</template>
<script lang="ts">
import { defineComponent, onMounted, onUpdated } from "vue";
import {
  setCurrentCreateButton,
  setCurrentPageTitle,
} from "@/core/helpers/breadcrumb";
import ChangeOPRequestsTable from "@/components/widgets/tables/ChangeOPRequestsTable.vue";

export default defineComponent({
  name: "dashboard",
  components: {
    ChangeOPRequestsTable,
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
