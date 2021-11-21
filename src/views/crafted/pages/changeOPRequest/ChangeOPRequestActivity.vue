<template>

  <!--begin::Timeline-->
  <div class="card">
    <div class="card-title  align-items-center">
      <ChangeOPRequestBaseInfo v-bind:changeOpRequestBaseInfo="baseInfo"></ChangeOPRequestBaseInfo>
    </div>
    <div class="separator "></div>
    <!--begin::Card body-->
    <div class="card-body">
      <!--begin::Tab Content-->
      <div class="tab-content">
        <!--begin::Tab panel-->
        <div
            id="kt_activity_today"
            class="card-body p-0 tab-pane fade show active"
            role="tabpanel"
            aria-labelledby="kt_activity_today_tab"
        >
          <!--begin::Timeline-->
          <div class="timeline">
            <ChangeOPRequestTimelineHeader v-bind:changeOpRequestTimelineHeaderInfo="headerInfo"></ChangeOPRequestTimelineHeader>
            <KTActivityItem1></KTActivityItem1>
            <KTActivityItem2></KTActivityItem2>
            <KTActivityItem3></KTActivityItem3>
            <KTActivityItem4></KTActivityItem4>
            <KTActivityItem5></KTActivityItem5>
            <KTActivityItem6></KTActivityItem6>
            <KTActivityItem7></KTActivityItem7>
            <KTActivityItem8></KTActivityItem8>
          </div>
          <!--end::Timeline-->
        </div>
        <!--end::Tab panel-->

        <!--begin::Tab panel-->
        <!--end::Tab panel-->
      </div>
      <!--end::Tab Content-->
    </div>
    <!--end::Card body-->
  </div>
  <!--end::Timeline-->
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";
import KTActivityItem1 from "@/layout/header/partials/activity-timeline/Item1.vue";
import KTActivityItem2 from "@/layout/header/partials/activity-timeline/Item2.vue";
import KTActivityItem3 from "@/layout/header/partials/activity-timeline/Item3.vue";
import KTActivityItem4 from "@/layout/header/partials/activity-timeline/Item4.vue";
import KTActivityItem5 from "@/layout/header/partials/activity-timeline/Item5.vue";
import KTActivityItem6 from "@/layout/header/partials/activity-timeline/Item6.vue";
import KTActivityItem7 from "@/layout/header/partials/activity-timeline/Item7.vue";
import KTActivityItem8 from "@/layout/header/partials/activity-timeline/Item8.vue";
import ChangeOPRequestTimelineHeader from "@/views/crafted/pages/changeOPRequest/ChangeOPRequestTimelineHeader.vue";
import ChangeOPRequestBaseInfo from "@/views/crafted/pages/changeOPRequest/ChangeOPRequestBaseInfo.vue";
import {useI18n} from "vue-i18n";

export default defineComponent({
  inheritAttrs: false,
  name: "changeOPRequestActivity",
  props: ['changeOPRequest', 'id'],
  data() {
    const baseInfo = computed(() => {
      const baseData = {};
      baseData["created_at"] = this.changeOPRequest["created_at"];
      baseData["op"] = this.changeOPRequest["op"]
      baseData["status"] = this.changeOPRequest["status"];
      baseData["change_op_request_files"] = this.changeOPRequest["change_op_request_files"];
      baseData["reason"] = this.changeOPRequest["reason"];
      baseData["creator"] = this.changeOPRequest["creator"];
      baseData["counterpart"] = this.changeOPRequest["reason"];
      return baseData;
    });
    const headerInfo = computed(() => {
      const headerData = {};
      headerData["created_at"] = this.changeOPRequest["created_at"];
      headerData["creator"] = this.changeOPRequest["creator"];
      headerData["message"] = this.changeOPRequest["message"];
      headerData["change_op_request_files"] = this.changeOPRequest["change_op_request_files"];
      return headerData;
    });

    return {
      headerInfo: headerInfo,
      baseInfo: baseInfo,
    }
  },
  components: {
    KTActivityItem1,
    KTActivityItem2,
    KTActivityItem3,
    KTActivityItem4,
    KTActivityItem5,
    KTActivityItem6,
    KTActivityItem7,
    KTActivityItem8,
    ChangeOPRequestTimelineHeader,
    ChangeOPRequestBaseInfo
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
    }
  }
});
</script>
