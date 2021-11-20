<template>
  {{changeOPRequest}}
  <ChangeOPRequestActivity
      widget-classes="card-xxl-stretch mb-5 mb-xl-8"
  ></ChangeOPRequestActivity>
</template>
<script lang="ts">
import {computed, defineComponent, onMounted, ref} from "vue";
import {setCurrentPageTitle} from "@/core/helpers/breadcrumb";
import ChangeOPRequestActivity from "@/views/crafted/pages/changeOPRequest/ChangeOPRequestActivity.vue";
import {useStore} from "vuex";
import {Actions} from "@/store/enums/StoreEnums";

export default defineComponent({
  name: "changeOPrequest",
  props: ['id'],
  components: {
    ChangeOPRequestActivity,
  },
  setup(props) {
    const store = useStore();
    store.dispatch(Actions.GET_CHANGE_OP_REQUEST, props.id);
    const changeOPRequest = computed(() => store.getters.changeOPRequest);\onMounted(() => {
      return setCurrentPageTitle("Solicitud de Cambio de PO");
    });
    return {
      changeOPRequest
    };
  },
});
</script>
