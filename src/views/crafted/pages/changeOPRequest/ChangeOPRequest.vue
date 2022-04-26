<template>
  <!--begin::Timeline-->
  <div class="card">
    <!--begin::Base Info-->
    <div class="card-title align-items-center">
      <changeOPProcessBaseInfo
        v-bind:changeOPProcessBaseInfo="changeOPProcess"
        v-bind:changeOpProcessId="id"
      ></changeOPProcessBaseInfo>
    </div>
    <!--end::Base Info-->
    <div class="separator"></div>
    <ChangeOPProcessActivity
      v-bind:changeOPProcess="changeOPProcess"
      widget-classes="card-xxl-stretch mb-5 mb-xl-8"
    ></ChangeOPProcessActivity>
    <Reply></Reply>
    <!--end::Card body-->
  </div>
  <!--end::Timeline-->
</template>
<script lang="ts">
import { computed, defineComponent, onUpdated, ref } from "vue";
import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";
import ChangeOPProcessActivity from "@/views/crafted/pages/changeOPRequest/activity/Activity.vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import ChangeOPProcessBaseInfo from "@/views/crafted/pages/changeOPRequest/header/BaseInfo.vue";
import Reply from "@/views/crafted/pages/changeOPRequest/Reply.vue";


export default defineComponent({
  name: "changeOPRequest",
  props: ["id"],
  components: {
    ChangeOPProcessBaseInfo,
    ChangeOPProcessActivity,
    Reply,
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
