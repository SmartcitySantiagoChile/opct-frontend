<template>
  <!--begin::ChangeOPRequestBaseInfo-->
  <div :class="widgetClasses" class="card">
    <!--begin::Body-->
    <div class="card-body">
      <div class="tab-content">
        <!--begin::Tap pane-->

        <!--begin::Table container-->
        <h2>{{ changeOPProcess.title }}</h2>
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
                    {{ changeOPProcess.id }}
                  </span>
                </td>
                <td>
                  <span class="text-muted fw-bold d-block fs-5">{{ translate("creationDate") }} </span>
                  <span class="text-dark fw-bolder d-block fs-3">
                    {{
                      changeOPProcess.created_at
                        ? DateTime.fromISO(changeOPProcess.created_at).setLocale(this.$i18n.locale).toLocaleString()
                        : ""
                    }}
                  </span>
                </td>
                <td>
                  <span class="text-muted fw-bold d-block fs-5">
                    {{ translate("operationProgram") }}
                    <template v-if="hasChangeStatusOption">
                      <ChangeOP @operation-program-updated="$emit('operation-program-updated')"></ChangeOP>
                    </template>
                  </span>
                  <span class="text-dark fw-bolder d-block fs-3">
                    <template v-if="changeOPProcess.operation_program">
                      {{
                        DateTime.fromISO(changeOPProcess.operation_program.start_at)
                          .setLocale(this.$i18n.locale)
                          .toLocaleString()
                      }}
                      ({{ changeOPProcess.operation_program.op_type.name }})
                    </template>
                    <template v-else>
                      {{ translate("withoutAssign") }}
                    </template>
                  </span>
                </td>
                <td>
                  <span class="text-muted fw-bold d-block fs-5"> {{ translate("contractType") }}</span>
                  <span class="text-dark fw-bolder d-block fs-3">
                    {{ changeOPProcess.contract_type ? changeOPProcess.contract_type.name : "" }}</span
                  >
                </td>
                <td>
                  <span class="text-muted fw-bold d-block fs-5"> {{ translate("creator") }}</span>
                  <span class="text-dark fw-bolder d-block fs-3">
                    {{
                      changeOPProcess.creator
                        ? changeOPProcess.creator.first_name + " " + changeOPProcess.creator.last_name
                        : ""
                    }}</span
                  >
                </td>
                <td>
                  <span class="text-muted fw-bold d-block fs-5"> {{ translate("counterpart") }}</span>
                  <span class="text-dark fw-bolder d-block fs-3">
                    {{ changeOPProcess.counterpart ? changeOPProcess.counterpart.name : "" }}</span
                  >
                </td>
                <td>
                  <span class="text-muted fw-bold d-block fs-5">
                    {{ translate("status") }}
                    <template v-if="hasChangeStatusOption">
                      <ChangeStatus @status-updated="$emit('status-updated')"></ChangeStatus>
                    </template>
                  </span>
                  <span :class="`badge-light-success`" class="badge fs-4 fw-bolder">{{
                    changeOPProcess.status ? changeOPProcess.status.name : ""
                  }}</span>
                </td>
                <td>
                  <span class="text-muted fw-bold d-block fs-5">
                    {{ translate("changeOPRequests") }}
                  </span>
                  <ChangeOPRequestsEditor
                    @change-op-requests-updated="$emit('change-op-requests-updated')"
                    :enable-edition="hasChangeStatusOption"
                  ></ChangeOPRequestsEditor>
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
import { computed, defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { DateTime } from "luxon";
import ChangeOP from "@/views/opct/changeopprocess/detail/edit/ChangeOP.vue";
import ChangeStatus from "@/views/opct/changeopprocess/detail/edit/ChangeStatus.vue";
import ChangeOPRequestsEditor from "@/views/opct/changeopprocess/detail/edit/ChangeOPRequestsEditor.vue";

export default defineComponent({
  name: "ChangeOPProcessDetailHeader",
  components: { ChangeStatus, ChangeOP, ChangeOPRequestsEditor },
  props: {
    widgetClasses: String,
    changeOPProcess: Object,
  },
  emits: ["status-updated", "operation-program-updated", "change-op-requests-updated"],
  setup() {
    const store = useStore();
    const { t, te } = useI18n();
    const translate = (text) => (te(text) ? t(text) : text);
    const hasChangeStatusOption = computed(() => store.getters.hasChangeStatusOption);
    return {
      translate,
      hasChangeStatusOption,
      DateTime,
    };
  },
});
</script>
