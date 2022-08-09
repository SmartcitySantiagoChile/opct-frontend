<template>
  <!--begin::Tables ChangeOPProcesses -->
  <div :class="widgetClasses" class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bolder fs-3 mb-1">
          {{ translate("changeOPProcesses") }}
        </span>
        <span class="text-muted mt-1 fw-bold fs-7">
          {{ translate("changesNumber") + ": " + changeOPProcessesCount }}
        </span>
      </h3>
      <div class="card-toolbar align-items-start">
        <!--begin::Menu-->
        <span class="card-label fw-bolder fs-3 me-3">
          <input
            class="form-control"
            name="filter"
            type="text"
            v-bind:placeholder="translate('filterByOp')"
            @keyup="onFilterChange"
          />
        </span>

        <CreateChangeOPProcess @change-op-process-created="updateData"></CreateChangeOPProcess>

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
              <th class="ps-4 rounded-start">Id</th>
              <th class="ps-4 min-w-125px rounded-start">
                {{ translate("creationDate") }}
              </th>
              <th class="min-w-150px">{{ translate("operationProgram") }}</th>
              <th class="min-w-100px">{{ translate("creator") }}</th>
              <th class="max-w-100px">{{ translate("creatorOrganization") }}</th>
              <th class="max-w-100px">{{ translate("counterpart") }}</th>
              <th class="min-w-100px">{{ translate("contractType") }}</th>
              <th class="min-w-100px">{{ translate("title") }}</th>
              <th class="min-w-80px">{{ translate("status") }}</th>
              <th class="max-w-80px">{{ translate("change_op_requests") }}</th>
              <th class="min-w-80px"></th>
            </tr>
          </thead>
          <!--end::Table head-->

          <!--begin::Table body-->
          <tbody>
            <template v-for="(item, index) in changeOPProcesses" :key="index">
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
                        {{ DateTime.fromISO(item.created_at).setLocale(this.$i18n.locale).toLocaleString() }}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="text-dark fw-bolder d-block mb-1 fs-6">
                    <template v-if="item.operation_program">
                      {{
                        DateTime.fromISO(item.operation_program.start_at).setLocale(this.$i18n.locale).toLocaleString()
                      }}
                      ({{ item.operation_program.op_type.name }})
                    </template>
                    <template v-else>
                      {{ translate("withoutAssign") }}
                    </template>
                  </div>
                </td>
                <td>
                  <div class="text-dark fw-bolder d-block mb-1 fs-6">
                    {{ item.creator.first_name + " " + item.creator.last_name }}
                  </div>
                </td>
                <td>
                  <div class="text-dark fw-bolder d-block mb-1 fs-6">{{ item.creator.organization.name }}</div>
                </td>
                <td>
                  <div class="text-dark fw-bolder d-block mb-1 fs-6">{{ item.counterpart.name }}</div>
                </td>
                <td>
                  <div class="text-dark fw-bolder d-block mb-1 fs-6">
                    {{ item.contract_type ? item.contract_type.name : "" }}
                  </div>
                </td>
                <td>
                  <div class="text-dark fw-bolder d-block mb-1 fs-6">{{ item.title }}</div>
                </td>
                <td>
                  <div class="text-dark fw-bolder d-block mb-1 fs-6">{{ item.status.name }}</div>
                </td>
                <td>
                  <div class="text-center text-dark fw-bolder d-block mb-1 fs-6">
                    {{ item.change_op_requests_count }}
                  </div>
                </td>
                <td>
                  <a
                    class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
                    v-bind:href="item.url.split('api')[1]"
                  >
                    <span class="svg-icon svg-icon-2">
                      <inline-svg src="/media/icons/duotune/arrows/arr064.svg" />
                    </span>
                  </a>
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
              v-for="(item, index) in Array.from({ length: Math.ceil(changeOPProcessesCount / 10) }, (_, i) => i + 1)"
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
    <!--begin::Body-->
  </div>
  <!--end::Tables Widget 12-->
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { Actions } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { DateTime } from "luxon";
import CreateChangeOPProcess from "@/views/opct/changeopprocess/ChangeOPProcessCreate.vue";

export default defineComponent({
  name: "change-op-processes-table",
  components: { CreateChangeOPProcess },
  props: {
    widgetClasses: String,
  },
  setup() {
    const { t, te } = useI18n();
    const translate = (text) => (te(text) ? t(text) : text);
    const store = useStore();

    const updateData = () => {
      store.dispatch(Actions.CHANGE_OP_PROCESSES.LIST);
    };

    updateData();
    const changeOPProcesses = computed(() => store.getters.getCurrentChangeOPProcesses);
    const changeOPProcessesCount = computed(() => store.getters.getCurrentChangeOPProcessesCount);

    // Events
    const onFilterChange = (event) => {
      const filter = String(event.target.value);
      if (filter.length > 3 && filter.length < 11) {
        store.dispatch(Actions.CHANGE_OP_PROCESSES.LIST_WiTH_PARAMS, {
          search: filter,
        });
      } else if (filter.length === 0) {
        store.dispatch(Actions.CHANGE_OP_PROCESSES.LIST);
      }
    };

    const onPageChange = (event) => {
      const filter = document.querySelector<HTMLInputElement>('input[name="filter"]');
      let params = {};
      if (filter) {
        params["search"] = filter.value;
      }
      let pageId = event.target.getAttribute("data-value");
      pageId = pageId === "-1" ? String(Math.ceil(changeOPProcessesCount.value / 10)) : pageId;

      if (pageId === "1") {
        disablePreviousItem();
      } else if (pageId > "1") {
        enablePreviousItem();
      } else if (pageId === "0") {
        disablePreviousItem();
        return;
      }
      params["page"] = pageId;
      store.dispatch(Actions.CHANGE_OP_PROCESSES.LIST_WiTH_PARAMS, params);
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
    return {
      changeOPProcesses,
      changeOPProcessesCount,
      translate,
      onFilterChange,
      onPageChange,
      DateTime,
      updateData,
    };
  },
});
</script>
