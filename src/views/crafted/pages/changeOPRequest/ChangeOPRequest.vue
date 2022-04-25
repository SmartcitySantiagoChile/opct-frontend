<template>
  <!--begin::Timeline-->
  <div class="card">
    <div class="card-title align-items-center">
      <ChangeOPRequestBaseInfo
        v-bind:changeOpRequestBaseInfo="changeOPProcess"
        v-bind:changeOpProcessId="id"
      ></ChangeOPRequestBaseInfo>
    </div>
    <div class="separator"></div>
    <!--end::Card body-->
  </div>
  <!--end::Timeline-->
  <!--  <ChangeOPRequestActivity-->
  <!--      v-bind:changeOPRequest="changeOPProcess"-->
  <!--      v-bind:id="id"-->
  <!--      widget-classes="card-xxl-stretch mb-5 mb-xl-8"-->
  <!--  ></ChangeOPRequestActivity>-->
</template>
<script lang="ts">
import { computed, defineComponent, onUpdated, ref } from "vue";
import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";
import ChangeOPRequestActivity from "@/views/crafted/pages/changeOPRequest/activity/Activity.vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import ChangeOPRequestBaseInfo from "@/views/crafted/pages/changeOPRequest/header/BaseInfo.vue";

export default defineComponent({
  name: "changeOPRequest",
  props: ["id"],
  components: {
    ChangeOPRequestBaseInfo,
    // ChangeOPRequestActivity,
  },
  setup(props) {
    const store = useStore();
    store.dispatch(Actions.GET_CHANGE_OP_PROCESS, props.id);
    const changeOPProcess = ref(
      computed(() => store.getters.getCurrentChangeOPProcess)
    );
    onUpdated(() => {
      return setCurrentPageTitle("Proceso de cambio de PO");
    });
    return {
      changeOPProcess,
    };
  },
});
</script>
