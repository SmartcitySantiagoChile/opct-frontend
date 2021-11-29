<template>
  <!--begin::Timeline-->
  <div class="card">
    <div class="card-title align-items-center">
      <ChangeOPRequestBaseInfo
          v-bind:changeOpRequestBaseInfo="baseInfo"
      ></ChangeOPRequestBaseInfo>
    </div>
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
            <ChangeOPRequestTimelineMessage
                v-bind:changeOpRequestTimelineMessage="headerInfo"
            ></ChangeOPRequestTimelineMessage>
            <template v-for="(item, index) in orderedLogs" :key="index">
              <template v-if="item.type === 'changeOPRequestMessage'">
                <ChangeOPRequestTimelineMessage
                    v-bind:changeOpRequestTimelineMessage="item.data"
                ></ChangeOPRequestTimelineMessage>
              </template>
              <template
                  v-if="item.type === 'statusLog' || item.type === 'opChangeLog'"
              >
                <ChangeOPRequestTimelineMilestone
                    v-bind:changeOPRequestTimelineMilestoneLog="item.data"
                ></ChangeOPRequestTimelineMilestone>
              </template>
            </template>
          </div>
          <!--end::Timeline-->
        </div>
        <!--end::Tab panel-->
      </div>
      <!--end::Tab Content-->
    </div>
    <div class="separator"></div>
    <Reply></Reply>
    <template v-if="hasChangeStatusOption">
      <ChangeStatus></ChangeStatus>
    </template>
    <!--end::Card body-->
  </div>
  <!--end::Timeline-->
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";
import {useStore} from "vuex";
import {useI18n} from "vue-i18n";
import ChangeOPRequestBaseInfo from "@/views/crafted/pages/changeOPRequest/BaseInfo.vue";
import ChangeOPRequestTimelineMessage from "@/views/crafted/pages/changeOPRequest/Message.vue";
import ChangeOPRequestTimelineMilestone from "@/views/crafted/pages/changeOPRequest/Milestone.vue";
import ChangeStatus from "@/views/crafted/pages/changeOPRequest/ChangeStatus.vue";
import Reply from "@/views/crafted/pages/changeOPRequest/Reply.vue";

export default defineComponent({
  inheritAttrs: false,
  name: "changeOPRequestActivity",
  props: ["changeOPRequest", "id"],
  data() {
    const baseInfo = computed(() => {
      const baseData = {};
      baseData["created_at"] = this.changeOPRequest["created_at"];
      baseData["op"] = this.changeOPRequest["op"];
      baseData["status"] = this.changeOPRequest["status"];
      baseData["change_op_request_files"] =
          this.changeOPRequest["change_op_request_files"];
      baseData["reason"] = this.changeOPRequest["reason"];
      baseData["creator"] = this.changeOPRequest["creator"];
      baseData["counterpart"] = this.changeOPRequest["counterpart"];
      baseData["title"] = this.changeOPRequest["title"];
      return baseData;
    });
    const headerInfo = computed(() => {
      const headerData = {};
      headerData["created_at"] = this.changeOPRequest["created_at"];
      headerData["creator"] = this.changeOPRequest["creator"];
      headerData["message"] = this.changeOPRequest["message"];
      headerData["change_op_request_files"] =
          this.changeOPRequest["change_op_request_files"];
      return headerData;
    });
    const orderedLogs = computed(() => {
      let orderedLogsData = [] as any;
      if (this.changeOPRequest) {
        if (this.changeOPRequest["change_op_request_messages"]) {
          this.changeOPRequest["change_op_request_messages"].forEach(
              (message) => {
                let changeOPRequestData = {
                  dateTime: message["created_at"],
                  type: "changeOPRequestMessage",
                  data: message,
                };
                orderedLogsData.push(changeOPRequestData);
              }
          );
        }
        if (this.changeOPRequest["op_change_logs"]) {
          this.changeOPRequest["op_change_logs"].forEach((changeLog) => {
            let opChangeLogData = {
              dateTime: changeLog["created_at"],
              type: "opChangeLog",
              data: changeLog,
            };
            orderedLogsData.push(opChangeLogData);
          });
        }
        if (this.changeOPRequest["status_logs"]) {
          this.changeOPRequest["status_logs"].forEach((statusLog) => {
            let changeOPRequestStatusLofData = {
              dateTime: statusLog["created_at"],
              type: "statusLog",
              data: statusLog,
            };
            orderedLogsData.push(changeOPRequestStatusLofData);
          });
        }
      }
      orderedLogsData.sort(function (a, b) {
        const date_a = Date.parse(a.data.created_at);
        const date_b = Date.parse(b.data.created_at);
        return date_a - date_b;
      });
      return orderedLogsData;
    });
    return {
      headerInfo,
      baseInfo,
      orderedLogs,
    };
  },
  components: {
    ChangeOPRequestBaseInfo,
    ChangeOPRequestTimelineMessage,
    ChangeOPRequestTimelineMilestone,
    Reply,
    ChangeStatus
  },
  computed: {
    hasChangeStatusOption() {
      const store = useStore();
      return store.getters.hasChangeStatusOption
    },
  },
  setUp() {
    const {t, te} = useI18n();
    const translate = (text) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };
    return {
      translate
    };
  },
});
</script>
