<template>
  <!--begin::Timeline-->
  <div class="card">
    <!--begin::Base Info-->
    <div class="card-title align-items-center">
      <ChangeOPProcessDetailHeader
        :changeOPProcess="changeOPProcess"
        @operation-program-updated="updateTimeline"
        @status-updated="updateTimeline"
      ></ChangeOPProcessDetailHeader>
    </div>
    <!--end::Base Info-->
    <div class="separator"></div>
    <ChangeOPProcessActivity
      v-bind:changeOPProcess="changeOPProcess"
      widget-classes="card-xxl-stretch mb-5 mb-xl-8"
    ></ChangeOPProcessActivity>
    <ChangeOPProcessDetailReplay
      :changeOPProcess="changeOPProcess"
      @message-added="updateTimeline"
    ></ChangeOPProcessDetailReplay>
    <!--end::Card body-->
  </div>
  <!--end::Timeline-->
</template>

<script lang="ts">
import { computed, defineComponent, onUpdated, ref } from "vue";
import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";
import ChangeOPProcessActivity from "@/views/opct/changeopprocess/detail/timeline/Activity.vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import ChangeOPProcessDetailHeader from "@/views/opct/changeopprocess/detail/ChangeOPProcessDetailHeader.vue";
import ChangeOPProcessDetailReplay from "@/views/opct/changeopprocess/detail/ChangeOPProcessDetailReplay.vue";

export default defineComponent({
  name: "changeOPRequest",
  props: ["id"],
  components: {
    ChangeOPProcessDetailHeader,
    ChangeOPProcessActivity,
    ChangeOPProcessDetailReplay,
  },
  setup(props) {
    const store = useStore();
    const changeOPProcess = ref(computed(() => store.getters.getCurrentChangeOPProcess));

    const updateTimeline = () => {
      console.log("update timeline");
      store.dispatch(Actions.CHANGE_OP_PROCESSES.DETAIL, props.id);
    };
    updateTimeline();

    onUpdated(() => {
      return setCurrentPageTitle("Proceso de cambio de PO");
    });

    return {
      changeOPProcess,
      updateTimeline,
    };
  },
});
</script>
