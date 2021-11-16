<template>
  <!--begin::Tables Widget 13-->
  <div :class="widgetClasses" class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bolder fs-3 mb-1">{{ translate("changeOPRequests") }}</span>

        <span
            class="text-muted mt-1 fw-bold fs-7">{{
            translate("changesNumber") + ": " + changeOPRequests.length
          }}</span>
      </h3>
      <div class="card-toolbar">
        <!--begin::Menu-->
        <button
            type="button"
            class="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end"
            data-kt-menu-flip="top-end"
        >
          <span class="svg-icon svg-icon-2">
            <inline-svg src="media/icons/duotune/general/gen024.svg"/>
          </span>
        </button>
        <Dropdown2></Dropdown2>
        <!--end::Menu-->
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body py-3">
      <!--begin::Table container-->
      <Datatable :table-header="tableHeader" :table-data="changeOPRequests" >
        <template v-slot:cell-created_at="{ row: data }">
          {{ data.created_at }}
        </template>
     </Datatable>


     <!--end::Table container-->
    </div>
    <!--begin::Body-->
  </div>
  <!--end::Tables Widget 13-->
</template>

<script lang="ts">
import {computed, defineComponent, ref} from "vue";
import {useStore} from "vuex";
import {Actions} from "@/store/enums/StoreEnums";
import {useI18n} from "vue-i18n";
import Dropdown2 from "@/components/dropdown/Dropdown2.vue";
import Datatable from "@/components/kt-datatable/KTDatatable.vue"

export default defineComponent({
  name: "change-op-widget",
  components: {
    Dropdown2,
    Datatable
  },
  props: {
    widgetClasses: String,
  },
  watch: {},
  setup() {
    const store = useStore();
    const {t, te} = useI18n();
    const translate = (text) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };
    store.dispatch(Actions.GET_CHANGE_OP_REQUESTS);
    const changeOPRequests = ref(computed(() => store.getters.getCurrentChangeOPRequests));
    //const changeOPRequests = ref([]);

    const tableHeader = ref([
      {
        name: translate("creationDate"),
        key: "created_at",
      }
    ]);
    const loading = ref(false);
    return {
      translate,
      changeOPRequests,
      tableHeader,
      loading
    };
  },
});
</script>
