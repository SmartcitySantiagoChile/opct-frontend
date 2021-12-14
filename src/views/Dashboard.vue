<template>
  <CreateChangeOPRequest></CreateChangeOPRequest>
  <ChangeOPRequestsTable
    widget-classes="card-xxl-stretch mb-5 mb-xl-8"
  ></ChangeOPRequestsTable>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";
import ChangeOPRequestsTable from "@/components/widgets/tables/ChangeOPRequestsTable.vue";
import CreateChangeOPRequest from "@/views/crafted/pages/CreateChangeOPRequest.vue";

export default defineComponent({
  name: "dashboard",
  components: {
    ChangeOPRequestsTable,
    CreateChangeOPRequest,
  },
  setup() {
    onMounted(() => {
      setCurrentPageTitle("Panel de Administración");
    });
  },
});
</script>
