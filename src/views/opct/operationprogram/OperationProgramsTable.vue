<template>
  <!--begin::Tables ChangeOPRequests -->
  <div :class="widgetClasses" class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bolder fs-3 mb-1">
          {{ translate("operationPrograms") }}
        </span>
        <span class="text-muted mt-1 fw-bold fs-7">
          {{ translate("operationProgramsNumber") + ": " + operationProgramsCount }}
        </span>
      </h3>
      <div class="card-toolbar">
        <!--begin::Menu-->
        <CreateOperationProgram @update-data="updateData"></CreateOperationProgram>
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
            <tr class="fw-bold fs-5 text-gray-800 border-bottom-2 border-gray-200">
              <th class="ps-4 rounded-start">{{ translate("Id") }}</th>
              <th class="ps-4 rounded-start">{{ translate("operationProgram") }}</th>
              <th class="ps-4 rounded-start">{{ translate("operationProgramType") }}</th>
              <th class="ps-4 align-right">{{ translate("actions") }}</th>
            </tr>
          </thead>
          <!--end::Table head-->

          <!--begin::Table body-->
          <tbody>
            <template v-for="(item, index) in operationPrograms" :key="index">
              <tr>
                <td>
                  <div class="d-flex align-items-center">
                    <div class="symbol symbol-10px me-5"></div>
                    <div class="d-flex justify-content-start flex-column">
                      <div class="text-dark fw-bolder mb-1 fs-6">{{ item.id }}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="d-flex align-items-center">
                    <div class="symbol symbol-10px me-5"></div>
                    <div class="d-flex justify-content-start flex-column">
                      <div class="text-dark fw-bolder mb-1 fs-6">
                        {{ DateTime.fromISO(item.start_at).setLocale(this.$i18n.locale).toLocaleString() }}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="text-dark fw-bolder d-block mb-1 fs-6">
                    <template v-if="item.op_type">
                      {{ item.op_type.name }}
                    </template>
                  </div>
                </td>

                <td>
                  <template v-if="item.op_change_logs.length">
                    <OperationProgramLogModal
                      :id="item.id"
                      :opChangeDataLogs="item.op_change_logs"
                    ></OperationProgramLogModal>
                  </template>
                  <EditOperationProgramModal
                    :id="item.id"
                    :opDate="item.start_at"
                    :opTypeName="item.op_type.name"
                    :url="item.url.split('api')[1]"
                    @update-data="updateData"
                  >
                  </EditOperationProgramModal>
                  <DeleteOperationProgramModal :url="item.url.split('api')[1]" @update-data="updateData">
                  </DeleteOperationProgramModal>
                </td>
              </tr>
            </template>
          </tbody>
          <!--end::Table body-->
        </table>
        <!--end::Table-->
        <div class="d-flex align-items-center">
          <ul class="pagination d-flex align-items-center">
            <li id="previousItem" class="page-item previous disabled">
              <button class="page-link" data-value="-1" @click="onPageChange">
                <i class="previous" data-value="1"></i>
              </button>
            </li>
            <template
              v-for="(item, index) in Array.from({ length: Math.ceil(operationProgramsCount / 10) }, (_, i) => i + 1)"
              :key="index"
            >
              <li class="page-item">
                <button :data-value="item" class="page-link" @click="onPageChange">
                  {{ item }}
                </button>
              </li>
            </template>
            <li class="page-item next">
              <button class="page-link" data-value="-1" @click="onPageChange">
                <i class="next" data-value="-1"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <!--end::Table container-->
    </div>
    <!--end::Body-->
  </div>
  <!--end::Tables Widget 12-->
</template>
<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { Actions } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { DateTime } from "luxon";
import CreateOperationProgram from "@/views/opct/operationprogram/actions/CreateOperationProgram.vue";
import EditOperationProgramModal from "@/views/opct/operationprogram/actions/EditOperationProgram.vue";
import DeleteOperationProgramModal from "@/views/opct/operationprogram/actions/DeleteOperationProgramModal.vue";
import OperationProgramLogModal from "@/views/opct/operationprogram/logs/OperationProgramLogModal.vue";

export default defineComponent({
  name: "operation-program-table",
  components: {
    CreateOperationProgram,
    EditOperationProgramModal,
    DeleteOperationProgramModal,
    OperationProgramLogModal,
  },
  props: {
    widgetClasses: String,
  },
  setup() {
    const { t, te } = useI18n();
    const translate = (text) => (te(text) ? t(text) : text);
    const store = useStore();
    const operationPrograms = computed(() => store.getters.getCurrentOperationPrograms);
    const operationProgramsCount = computed(() => store.getters.getCurrentOperationProgramsCount);

    const onPageChange = (event) => {
      const filter = document.querySelector<HTMLInputElement>('input[name="filter"]');
      let params = {};
      if (filter) {
        params["search"] = filter.value;
      }
      let pageId = event.target.getAttribute("data-value");
      pageId = pageId === "-1" ? String(Math.ceil(operationProgramsCount.value / 10)) : pageId;

      if (pageId === "1") {
        disablePreviousItem();
      } else if (pageId > "1") {
        enablePreviousItem();
      } else if (pageId === "0") {
        disablePreviousItem();
        return;
      }
      params["page"] = pageId;
      store.dispatch(Actions.GET_CHANGE_OP_REQUESTS_WITH_PARAMS, params);
    };

    // Pagination
    const disablePreviousItem = () => {
      const previousItem = document.getElementById("previousItem");
      if (previousItem) {
        previousItem.setAttribute("class", "page-item previous disabled");
      }
    };

    const enablePreviousItem = () => {
      const previousItem = document.getElementById("previousItem");
      if (previousItem) {
        previousItem.setAttribute("class", "page-item previous");
      }
    };

    const updateData = () => {
      store.dispatch(Actions.GET_OPERATION_PROGRAMS);
    };

    onMounted(() => {
      updateData();
    });

    return {
      operationPrograms,
      operationProgramsCount,
      translate,
      onPageChange,
      DateTime,
      updateData,
    };
  },
});
</script>
