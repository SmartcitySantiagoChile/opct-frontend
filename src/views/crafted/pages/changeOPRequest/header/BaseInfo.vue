<template>
  <!--begin::ChangeOPRequestBaseInfo-->
  <div :class="widgetClasses" class="card">
    <!--begin::Body-->
    <div class="card-body">
      <div class="tab-content">
        <!--begin::Tap pane-->

        <!--begin::Table container-->
        <h2>{{ changeOPProcessBaseInfo.title }}</h2>
        <div class="table-responsive">
          <!--begin::Table-->
          <table class="table align-middle gs-0 gy-3">
            <!--begin::Table head-->
            <thead>
              <tr>
                <th class="p-0"></th>
                <th class="p-0"></th>
                <th class="p-0"></th>
                <th class="p-0"></th>
                <th class="p-0"></th>
                <th class="p-0"></th>
                <th class="p-0"></th>
              </tr>
            </thead>
            <!--end::Table head-->

            <!--begin::Table body-->
            <tbody>
              <tr>
                <td>
                  <span class="text-muted fw-bold d-block fs-5">Id </span>
                  <span class="text-dark fw-bolder d-block fs-3">
                    {{ changeOpProcessId }}
                  </span>
                </td>
                <td>
                  <span class="text-muted fw-bold d-block fs-5"
                    >{{ translate("creationDate") }}
                  </span>
                  <span class="text-dark fw-bolder d-block fs-3">
                    {{
                      changeOPProcessBaseInfo.created_at
                        ? DateTime.fromISO(changeOPProcessBaseInfo.created_at)
                            .setLocale(this.$i18n.locale)
                            .toLocaleString()
                        : ""
                    }}
                  </span>
                </td>
                <td>
                  <span class="text-muted fw-bold d-block fs-5">
                    {{ translate("operationProgram") }}
                    <template v-if="hasChangeStatusOption">
                      <ChangeOP></ChangeOP>
                    </template>
                  </span>
                  <span class="text-dark fw-bolder d-block fs-3">
                    <template v-if="changeOPProcessBaseInfo.base_op">
                      {{
                        DateTime.fromISO(changeOPProcessBaseInfo.base_op.start_at)
                          .setLocale(this.$i18n.locale)
                          .toLocaleString()
                      }}
                      ({{ changeOPProcessBaseInfo.base_op.op_type.name }})
                    </template>
                    <template v-else>
                      {{ translate("withoutAssign") }}
                    </template>
                  </span>
                </td>
                <td>
                  <span class="text-muted fw-bold d-block fs-5">
                    {{ translate("contractType") }}</span
                  >
                  <span class="text-dark fw-bolder d-block fs-3">
                    {{
                      changeOPProcessBaseInfo.contract_type
                        ? changeOPProcessBaseInfo.contract_type.name
                        : ""
                    }}</span
                  >
                </td>
                <td>
                  <span class="text-muted fw-bold d-block fs-5">
                    {{ translate("creator") }}</span
                  >
                  <span class="text-dark fw-bolder d-block fs-3">
                    {{
                      changeOPProcessBaseInfo.creator
                        ? changeOPProcessBaseInfo.creator.first_name +
                          " " +
                          changeOPProcessBaseInfo.creator.last_name
                        : ""
                    }}</span
                  >
                </td>
                <td>
                  <span class="text-muted fw-bold d-block fs-5">
                    {{ translate("counterpart") }}</span
                  >
                  <span class="text-dark fw-bolder d-block fs-3">
                    {{
                      changeOPProcessBaseInfo.counterpart
                        ? changeOPProcessBaseInfo.counterpart.name
                        : ""
                    }}</span
                  >
                </td>
                <td>
                  <span class="text-muted fw-bold d-block fs-5">
                    {{ translate("status") }}
                    <template v-if="hasChangeStatusOption">
                      <ChangeStatus></ChangeStatus>
                    </template>
                  </span>
                  <span
                    :class="`badge-light-success`"
                    class="badge fs-4 fw-bolder"
                    >{{
                      changeOPProcessBaseInfo.status
                        ? changeOPProcessBaseInfo.status.name
                        : ""
                    }}</span
                  >
                </td>
                <td>
                  <span class="text-muted fw-bold d-block fs-5">
                    {{ translate("requests") }}
                    <template v-if="hasChangeStatusOption">
                      <ChangeOPRequestsEditInputTable
                        :id="id"
                        @onChangeSelectedChangeOPRequests="
                          onChangeSelectedChangeOPRequests
                        "
                      >
                      </ChangeOPRequestsEditInputTable>
                    </template>
                  </span>
                  <a
                    class="
                      btn btn-sm btn-icon btn-bg-light btn-active-color-primary
                    "
                    data-bs-target="#selectChangeOPRequest"
                    data-bs-toggle="modal"
                    type="button"
                  >
                    <span class="svg-icon svg-icon-2">
                      <inline-svg src="/media/icons/duotune/art/art005.svg" />
                    </span>
                  </a>
                  <template
                    v-for="(
                      subItem, subIndex
                    ) in changeOPProcessBaseInfo.change_op_requests"
                    :key="subIndex"
                  >
                    <a
                      class="text-dark fw-bolder text-hover-primary mb-1 fs-6"
                      >{{
                        subItem.title
                      }}</a
                    >&nbsp;
                  </template>
                </td>
              </tr>
            </tbody>
            <!--end::Table body-->
          </table>
        </div>
        <!--end::Table-->
        <!--end::Tap pane-->
      </div>
    </div>
    <!--end::Body-->
  </div>
  <!--end::Tables Widget 7-->
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import ChangeStatus from "@/views/crafted/pages/changeOPRequest/header/ChangeStatus.vue";
import { useStore } from "vuex";
import ChangeOP from "@/views/crafted/pages/changeOPRequest/header/ChangeOP.vue";
import { DateTime } from "luxon";
import ChangeOPRequestsEditInputTable from "@/components/widgets/tables/ChangeOPRequestsEditInputTable.vue";
import { Actions } from "@/store/enums/StoreEnums";

export default defineComponent({
  name: "ChangeOPProcessBaseInfo",
  components: { ChangeStatus, ChangeOP, ChangeOPRequestsEditInputTable },
  props: {
    widgetClasses: String,
    changeOPProcessBaseInfo: Object,
    changeOpProcessId: String,
  },
  setup() {
    const store = useStore();
    const { t, te } = useI18n();
    const translate = (text) => (te(text) ? t(text) : text);
    const hasChangeStatusOption = computed(
      () => store.getters.hasChangeStatusOption
    );
    let relatedChangeOPRequests: Array<string> = [];
    let relatedChangeOPRequestsInfo: Array<string> = [];
    const onChangeSelectedChangeOPRequests = (changeOPRequests) => {
      relatedChangeOPRequests = [];
      relatedChangeOPRequestsInfo = [];
      for (let key in changeOPRequests.value) {
        let value = changeOPRequests.value[key];
        const info = `${key}: ${value["title"]}`;
        relatedChangeOPRequestsInfo.push(info);
        relatedChangeOPRequests.push(value["url"]);
      }
    };
    return {
      translate,
      hasChangeStatusOption,
      DateTime,
      onChangeSelectedChangeOPRequests,
    };
  },
});
</script>
