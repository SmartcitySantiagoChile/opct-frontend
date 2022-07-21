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
            <!--begin::Ordered Logs-->
            <template v-for="(item, index) in orderedLogs" :key="index">
              <!--begin::ChangeOPProcessTimelineMessages-->
              <template v-if="item.type === LOG_TYPE.USER_MESSAGE">
                <ChangeOPProcessTimelineMessage
                  v-bind:changeOPProcessTimelineMessage="item.data"
                ></ChangeOPProcessTimelineMessage>
              </template>
              <template v-else-if="item.type === LOG_TYPE.OPERATION_PROGRAM_CHANGE">
                <ChangeOPProcessTimelineOperationProgramLog
                  :data="item.data"
                ></ChangeOPProcessTimelineOperationProgramLog>
              </template>
              <template v-else-if="item.type === LOG_TYPE.OPERATION_PROGRAM_STAGE">
                <ChangeOPProcessTimelineMilestone
                  :changeOPProcessTimelineMilestone="item.data"
                ></ChangeOPProcessTimelineMilestone>
              </template>
              <template v-else-if="item.type === LOG_TYPE.CHANGE_OP_PROCESS_CHANGE">
                <ChangeOPProcessTimelineChangeOPProcessLog
                  :data="item.data"
                ></ChangeOPProcessTimelineChangeOPProcessLog>
              </template>
              <template v-else-if="item.type === LOG_TYPE.CHANGE_OP_REQUEST_CHANGE">
                <!--
                <ChangeOPProcessTimelineMilestone
                  :changeOPProcessTimelineMilestone="item.data"
                ></ChangeOPProcessTimelineMilestone>
                -->
              </template>
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
import ChangeOPProcessTimelineMessage from "@/views/opct/changeopprocess/detail/timeline/Message.vue";
import ChangeOPProcessTimelineMilestone from "@/views/opct/changeopprocess/detail/timeline/Milestone.vue";
import ChangeOPProcessTimelineOperationProgramLog from "@/views/opct/changeopprocess/detail/timeline/OperationProgramLog.vue";
import ChangeOPProcessTimelineChangeOPProcessLog from "@/views/opct/changeopprocess/detail/timeline/ChangeOPProcessLog.vue";
import { Actions } from "@/store/enums/StoreEnums";

export default defineComponent({
  inheritAttrs: false,
  name: "ChangeOPProcessActivity",
  props: ["changeOPProcess"],
  components: {
    ChangeOPProcessTimelineMessage,
    ChangeOPProcessTimelineMilestone,
    ChangeOPProcessTimelineOperationProgramLog,
    ChangeOPProcessTimelineChangeOPProcessLog,
  },
  setup(props) {
    const { t, te } = useI18n();
    const translate = (text) => (te(text) ? t(text) : text);
    const store = useStore();
    const LOG_TYPE = {
      USER_MESSAGE: "changeOPProcessMessage",
      OPERATION_PROGRAM_STAGE: "operationProgramStage",
      OPERATION_PROGRAM_CHANGE: "operationProgramChange",
      CHANGE_OP_REQUEST_CHANGE: "changeOPRequestChange",
      CHANGE_OP_PROCESS_CHANGE: "changeOPProcessChange",
    };
    store.dispatch(Actions.GET_OPERATION_PROGRAM_STATUSES);

    const opStatuses = ref(computed(() => store.getters.getCurrentOperationProgramStatuses));
    const orderedLogs = computed(() => {
      let orderedLogsData = [] as any;
      if (opStatuses.value) {
        opStatuses.value.forEach((opStatus) => {
          if (props.changeOPProcess.contract_type && props.changeOPProcess.op_release_date) {
            const releaseDate = new Date(props.changeOPProcess.op_release_date + " 00:00");
            if (opStatus.contract_type.name === props.changeOPProcess.contract_type.name) {
              let deadLineDate = new Date(JSON.parse(JSON.stringify(releaseDate)));
              deadLineDate.setDate(deadLineDate.getDate() - opStatus.time_threshold);
              const deadLineStringDate = JSON.parse(JSON.stringify(deadLineDate));
              opStatus["dead_line"] = deadLineStringDate;
              let opStatusData = {
                dateTime: JSON.parse(JSON.stringify(deadLineStringDate)),
                type: LOG_TYPE.OPERATION_PROGRAM_STAGE,
                data: opStatus,
              };
              orderedLogsData.push(opStatusData);
            }
          }
        });
      }

      if (props.changeOPProcess) {
        if (props.changeOPProcess.change_op_process_messages) {
          props.changeOPProcess.change_op_process_messages.forEach((message) => {
            let changeOPProcessData = {
              dateTime: message.created_at,
              type: LOG_TYPE.USER_MESSAGE,
              data: message,
            };
            orderedLogsData.push(changeOPProcessData);
          });
        }

        if (props.changeOPProcess.operation_program) {
          props.changeOPProcess.operation_program.op_change_logs.forEach((changeLog) => {
            let opChangeLogData = {
              dateTime: changeLog.created_at,
              type: LOG_TYPE.OPERATION_PROGRAM_CHANGE,
              data: changeLog,
            };
            orderedLogsData.push(opChangeLogData);
          });
        }

        if (props.changeOPProcess.change_op_requests?.length) {
          props.changeOPProcess.change_op_requests.forEach((changeOPRequest) => {
            if (changeOPRequest.change_op_requests_logs) {
              changeOPRequest.change_op_requests_logs.forEach((changeOPRequestLog) => {
                let logData = {
                  dateTime: changeOPRequestLog.created_at,
                  type: LOG_TYPE.CHANGE_OP_REQUEST_CHANGE,
                  data: changeOPRequestLog,
                };
                orderedLogsData.push(logData);
              });
            }
          });
        }
        if (props.changeOPProcess.change_op_process_logs) {
          props.changeOPProcess.change_op_process_logs.forEach((changeOPProcessLog) => {
            let logData = {
              dateTime: changeOPProcessLog.created_at,
              type: LOG_TYPE.CHANGE_OP_PROCESS_CHANGE,
              data: changeOPProcessLog,
            };
            orderedLogsData.push(logData);
          });
        }
      }

      orderedLogsData.sort(function (a, b) {
        const date_a = Date.parse(a.dateTime);
        const date_b = Date.parse(b.dateTime);
        return date_a - date_b;
      });
      return orderedLogsData;
    });

    return {
      translate,
      orderedLogs,
      LOG_TYPE,
    };
  },
});
</script>
