<template>
  <ChangeOPRequestActivity
    v-bind:changeOPRequest="changeOPRequest"
    v-bind:id="id"
    widget-classes="card-xxl-stretch mb-5 mb-xl-8"
  ></ChangeOPRequestActivity>
</template>
<script lang="ts">
import { computed, defineComponent, onUpdated, ref } from "vue";
import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";
import ChangeOPRequestActivity from "@/views/crafted/pages/changeOPRequest/activity/Activity.vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";

export default defineComponent({
  name: "changeOPRequest",
  props: ["id"],
  components: {
    ChangeOPRequestActivity,
  },
  setup(props) {
    const store = useStore();
    store.dispatch(Actions.GET_CHANGE_OP_REQUEST, props.id);
    const changeOPRequest = ref(
      computed(() => store.getters.getCurrentChangeOPRequest)
    );
    onUpdated(() => {
      return setCurrentPageTitle("Solicitud de cambio de PO");
    });
    return {
      changeOPRequest,
    };
  },
});
</script>
