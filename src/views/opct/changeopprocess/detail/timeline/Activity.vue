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
                <TimelineMessage :data="item.data"></TimelineMessage>
              </template>
              <template v-else-if="item.type === LOG_TYPE.OPERATION_PROGRAM_CHANGE">
                <TimelineOperationProgramLog :data="item.data"></TimelineOperationProgramLog>
              </template>
              <template v-else-if="item.type === LOG_TYPE.OPERATION_PROGRAM_STAGE">
                <TimelineMilestone :data="item.data"></TimelineMilestone>
              </template>
              <template v-else-if="item.type === LOG_TYPE.CHANGE_OP_PROCESS_CHANGE">
                <TimelineChangeOPProcessLog :data="item.data"></TimelineChangeOPProcessLog>
              </template>
              <template v-else-if="item.type === LOG_TYPE.CHANGE_OP_REQUEST_CHANGE">
                <TimelineChangeOPRequestLog :data="item.data"></TimelineChangeOPRequestLog>
              </template>
              <template v-else-if="item.type === LOG_TYPE.CHANGE_OP_PROCESS_CREATION">
                <TimelineChangeOPProcessCreation :data="item.data"></TimelineChangeOPProcessCreation>
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
import { computed, defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import TimelineMessage from "@/views/opct/changeopprocess/detail/timeline/Message.vue";
import TimelineMilestone from "@/views/opct/changeopprocess/detail/timeline/Milestone.vue";
import TimelineOperationProgramLog from "@/views/opct/changeopprocess/detail/timeline/OperationProgramLog.vue";
import TimelineChangeOPProcessLog from "@/views/opct/changeopprocess/detail/timeline/ChangeOPProcessLog.vue";
import TimelineChangeOPProcessCreation from "@/views/opct/changeopprocess/detail/timeline/ChangeOPProcessCreation.vue";
import TimelineChangeOPRequestLog from "@/views/opct/changeopprocess/detail/timeline/ChangeOPRequestLog.vue";

export default defineComponent({
  inheritAttrs: false,
  name: "ChangeOPProcessActivity",
  props: ["changeOPProcess"],
  components: {
    TimelineMessage,
    TimelineMilestone,
    TimelineOperationProgramLog,
    TimelineChangeOPProcessLog,
    TimelineChangeOPRequestLog,
    TimelineChangeOPProcessCreation,
  },
  setup(props) {
    const { t, te } = useI18n();
    const translate = (text) => (te(text) ? t(text) : text);
    const LOG_TYPE = {
      USER_MESSAGE: "changeOPProcessMessage",
      OPERATION_PROGRAM_STAGE: "operationProgramStage",
      OPERATION_PROGRAM_CHANGE: "operationProgramChange",
      CHANGE_OP_REQUEST_CHANGE: "changeOPRequestChange",
      CHANGE_OP_PROCESS_CHANGE: "changeOPProcessChange",
      CHANGE_OP_PROCESS_CREATION: "changeOPProcessCreation",
    };

    const orderedLogs = computed(() => {
      let orderedLogsData = [] as any;

      if (props.changeOPProcess) {
        let changeOPProcessCreation = {
          dateTime: props.changeOPProcess.created_at,
          type: LOG_TYPE.CHANGE_OP_PROCESS_CREATION,
          data: props.changeOPProcess,
        };
        orderedLogsData.push(changeOPProcessCreation);

        if (props.changeOPProcess.deadlines) {
          props.changeOPProcess.deadlines.forEach((deadline) => {
            let deadlineData = {
              dateTime: deadline.deadline,
              type: LOG_TYPE.OPERATION_PROGRAM_STAGE,
              data: deadline,
            };
            orderedLogsData.push(deadlineData);
          });
        }

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
