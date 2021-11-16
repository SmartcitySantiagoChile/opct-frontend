<template>
  <!--begin::Tables ChangeOPRequests -->
  <div :class="widgetClasses" class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bolder fs-3 mb-1">{{ translate("changeOPRequests") }}</span>

        <span
            class="text-muted mt-1 fw-bold fs-7">{{
            translate("changesNumber") + ": " + changeOPRequestsCount
          }}</span>
      </h3>
      <div class="card-toolbar">
        <!--begin::Menu-->
        <input type="text" class="form-control" v-bind:placeholder="translate('filterByOp')" @keyup="onFilterChange"/>

        <!--end::Menu-->
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body py-3">
      <!--begin::Table container-->
      <div class="table-responsive">
        <!--begin::Table-->
        <table class="table align-middle gs-0 gy-4 table-rounded table-striped border">
          <!--begin::Table head-->
          <thead>
          <tr
              class="fw-bold fs-5 text-gray-800 border-bottom-2 border-gray-200"
          >
            <th class="ps-4 min-w-125px rounded-start">{{ translate("creationDate") }}</th>
            <th class="min-w-200px">{{ translate("operationProgram") }}</th>
            <th class="min-w-125px">{{ translate("title") }}</th>
            <th class="min-w-125px">{{ translate("creator") }}</th>
            <th class="min-w-200px">{{ translate("counterpart") }}</th>
            <th class="min-w-150px">{{ translate("status") }}</th>
          </tr>
          </thead>
          <!--end::Table head-->

          <!--begin::Table body-->
          <tbody>
          <template v-for="(item, index) in changeOPRequests" :key="index">
            <tr>
              <td>
                <div class="d-flex align-items-center">
                  <div class="symbol symbol-10px me-5">
                  </div>
                  <div class="d-flex justify-content-start flex-column">
                    <a
                        href="#"
                        class="text-dark fw-bolder text-hover-primary mb-1 fs-6"
                    >{{ item.created_at.split("T")[0] }}</a>
                  </div>
                </div>
              </td>

              <td>
                <a
                    href="#"
                    class="
                      text-dark
                      fw-bolder
                      text-hover-primary
                      d-block
                      mb-1
                      fs-6
                    "
                >{{ item.op.start_at }}</a
                >
              </td>

              <td>
                <a
                    href="#"
                    class="
                      text-dark
                      fw-bolder
                      text-hover-primary
                      d-block
                      mb-1
                      fs-6
                    "
                >{{ item.title }}</a
                >
              </td>

              <td>
                <a
                    href="#"
                    class="
                      text-dark
                      fw-bolder
                      text-hover-primary
                      d-block
                      mb-1
                      fs-6
                    "
                >{{ item.creator.first_name + " " + item.creator.last_name }}</a
                >
              </td>

              <td>
                <a
                    href="#"
                    class="
                      text-dark
                      fw-bolder
                      text-hover-primary
                      d-block
                      mb-1
                      fs-6
                    "
                >{{ item.counterpart.name }}</a
                >
              </td>

              <td>
                <a
                    href="#"
                    class="
                      text-dark
                      fw-bolder
                      text-hover-primary
                      d-block
                      mb-1
                      fs-6
                    "
                >{{ item.status.name }}</a>
              </td>
            </tr>
          </template>
          </tbody>
          <!--end::Table body-->
        </table>
        <!--end::Table-->
        <div class="d-flex align-items-center">
          <ul class="pagination d-flex align-items-center ">
            <li class="page-item previous "><button  @click="onPageChange" value="0" class="page-link"><i class="previous"></i></button></li>
            <template
                v-for="(item, index) in Array.from({length: Math.ceil(changeOPRequestsCount/10)}, (_, i) => i + 1)"
                :key="index">
              <li class="page-item  "><button  @click="onPageChange" :value="item" class="page-link">{{ item }}</button></li>
            </template>
            <li class="page-item next"><button :value="Math.ceil(changeOPRequestsCount/10)" @click="onPageChange" class="page-link"><i class="next"></i></button></li>

          </ul>
        </div>
      </div>
      <!--end::Table container-->
    </div>
    <!--begin::Body-->
  </div>
  <!--end::Tables Widget 12-->
</template>
<script lang="ts">
import {computed, defineComponent} from "vue";
import {Actions} from "@/store/enums/StoreEnums";
import {useStore} from "vuex";
import {useI18n} from "vue-i18n";
import {mapActions} from 'vuex'

export default defineComponent({
  name: "change-op-requests-table",
  components: {},
  props: {
    widgetClasses: String,
  },
  setup() {
    const {t, te} = useI18n();
    const translate = (text) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };
    const store = useStore()
    store.dispatch(Actions.GET_CHANGE_OP_REQUESTS);
    const changeOPRequests = computed(() => store.getters.getCurrentChangeOPRequests);
    const changeOPRequestsCount = computed(() => store.getters.getCurrentChangeOPRequestsCount)
    const onFilterChange = (event) => {
      const filter = String(event.target.value);
      if (filter.length > 3 && filter.length < 11) {
        store.dispatch(Actions.GET_CHANGE_OP_REQUESTS_BY_OP, filter);
      } else if (filter.length === 0) {
        store.dispatch(Actions.GET_CHANGE_OP_REQUESTS);
      }
    };
    const onPageChange = (event) => {
      console.log(event.target.value);
    };
    return {
      changeOPRequests,
      changeOPRequestsCount,
      translate,
      onFilterChange,
      onPageChange
    };
  },
});
</script>
