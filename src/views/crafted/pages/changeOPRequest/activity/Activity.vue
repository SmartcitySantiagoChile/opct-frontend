<template>
  <!--begin::Timeline-->
  <div class="card">
    <div class="separator"></div>
    <!--begin::Card body-->
    <div class="card-body">
      <!--begin::Tab Content-->
      <div class="tab-content">
        <!--begin::Tab panel-->
        <div
          id="kt_activity_today"
          aria-labelledby="kt_activity_today_tab"
          class="card-body p-0 tab-pane fade show active"
          role="tabpanel"
        >
          <!--begin::Timeline-->
          <div class="timeline">
            <!--begin::ChangeOPProcessTimelineMessage - First message-->
            <ChangeOPProcessTimelineMessage
              v-bind:changeOPProcessTimelineMessage="changeOPProcess"
            ></ChangeOPProcessTimelineMessage>
            <!--end::ChangeOPProcessTimelineMessage - First message-->
            <!--begin::Ordered Logs-->
            <template v-for="(item, index) in orderedLogs" :key="index">
              <!--begin::ChangeOPProcessTimelineMessages-->
              <template v-if="item.type === 'changeOPProcessMessage'">
                <ChangeOPProcessTimelineMessage
                  v-bind:changeOPProcessTimelineMessage="item.data"
                ></ChangeOPProcessTimelineMessage>
              </template>
              <!--end::ChangeOPProcessTimelineMessages-->
              <!--begin::ChangeOPProcessTimelineMilestones-->
              <template
                v-if="
                  item.type === 'statusLog' ||
                  item.type === 'opChangeLog' ||
                  item.type === 'opStatus'
                "
              >
                <ChangeOPProcessTimelineMilestone
                  v-bind:changeOPProcessTimelineMilestone="item.data"
                ></ChangeOPProcessTimelineMilestone>
              </template>
              <!--end::ChangeOPProcessTimelineMilestones-->
            </template>
            <!--end::Ordered Logs-->
          </div>
          <!--end::Timeline-->
        </div>
        <!--end::Tab panel-->
      </div>
      <!--end::Tab Content-->
    </div>
    <!--end::Card body-->
  </div>
  <!--end::Timeline-->
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import ChangeOPProcessTimelineMessage from "@/views/crafted/pages/changeOPRequest/activity/Message.vue";
import ChangeOPProcessTimelineMilestone from "@/views/crafted/pages/changeOPRequest/activity/Milestone.vue";
import { Actions } from "@/store/enums/StoreEnums";

export default defineComponent({
  inheritAttrs: false,
  name: "ChangeOPProcessActivity",
  props: ["changeOPProcess"],
  components: {
    ChangeOPProcessTimelineMessage,
    ChangeOPProcessTimelineMilestone,
  },
  setup(props) {
    const store = useStore();
    store.dispatch(Actions.GET_OPERATION_PROGRAM_STATUSES);

    const opStatuses = ref(
      computed(() => store.getters.getCurrentOperationProgramStatuses)
    );
    const orderedLogs = computed(() => {
      let orderedLogsData = [] as any;
      if (opStatuses.value) {
        opStatuses.value.forEach((opStatus) => {
          if (
            props.changeOPProcess["contract_type"] &&
            props.changeOPProcess["op_release_date"]
          ) {
            const releaseDate = new Date(
              props.changeOPProcess["op_release_date"] + " 00:00"
            );
            if (
              opStatus.contract_type.name ==
              props.changeOPProcess["contract_type"]["name"]
            ) {
              let deadLineDate = new Date(
                JSON.parse(JSON.stringify(releaseDate))
              );
              deadLineDate.setDate(
                deadLineDate.getDate() - opStatus.time_threshold
              );
              const deadLineStringDate = JSON.parse(
                JSON.stringify(deadLineDate)
              );
              opStatus["dead_line"] = deadLineStringDate;
              let opStatusData = {
                dateTime: JSON.parse(JSON.stringify(deadLineStringDate)),
                type: "opStatus",
                data: opStatus,
              };
              orderedLogsData.push(opStatusData);
            }
          }
        });
      }
      if (props.changeOPProcess) {
        if (props.changeOPProcess["change_op_process_messages"]) {
          props.changeOPProcess["change_op_process_messages"].forEach(
            (message) => {
              let changeOPProcessData = {
                dateTime: message["created_at"],
                type: "changeOPProcessMessage",
                data: message,
              };
              orderedLogsData.push(changeOPProcessData);
            }
          );
        }
        if (props.changeOPProcess["change_op_requests"]) {
          props.changeOPProcess["change_op_requests"].forEach(
            (change_op_request) => {
              if (change_op_request["status_logs"]) {
                change_op_request["status_logs"].forEach((status_log) => {
                  let statusLogData = {
                    dateTime: status_log["created_at"],
                    type: "opChangeLog",
                    data: status_log,
                  };
                  orderedLogsData.push(statusLogData);
                });
              }
              if (change_op_request["op_change_logs"]) {
                change_op_request["op_change_logs"].forEach((changeLog) => {
                  let opChangeLogData = {
                    dateTime: changeLog["created_at"],
                    type: "opChangeLog",
                    data: changeLog,
                  };
                  orderedLogsData.push(opChangeLogData);
                });
              }
            }
          );
        }
        if (props.changeOPProcess["change_op_process_status_logs"]) {
          props.changeOPProcess["change_op_process_status_logs"].forEach(
            (statusLog) => {
              let changeOPProcessStatusLogData = {
                dateTime: statusLog["created_at"],
                type: "statusLog",
                data: statusLog,
              };
              orderedLogsData.push(changeOPProcessStatusLogData);
            }
          );
        }
      }
      orderedLogsData.sort(function (a, b) {
        const date_a = Date.parse(a.dateTime);
        const date_b = Date.parse(b.dateTime);
        return date_a - date_b;
      });
      return orderedLogsData;
    });
    const { t, te } = useI18n();
    const translate = (text) => (te(text) ? t(text) : text);
    return {
      translate,
      orderedLogs,
    };
  },
});
</script>
