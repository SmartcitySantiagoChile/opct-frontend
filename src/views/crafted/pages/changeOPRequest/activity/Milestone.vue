<template>
  <!--begin::ChangeOPRequestTimelineMilestone item-->
  <div class="timeline-item">
    <!--begin::Timeline line-->
    <div class="timeline-line w-40px"></div>
    <!--end::Timeline line-->

    <!--begin::Timeline icon-->
    <div class="timeline-icon symbol symbol-circle symbol-40px">
      <div class="symbol-label bg-light">
        <span class="svg-icon svg-icon-2 svg-icon-gray-500">
          <inline-svg src="/media/icons/duotune/communication/com009.svg" />
        </span>
      </div>
    </div>
    <!--end::Timeline icon-->

    <!--begin::Timeline content-->
    <div class="timeline-content mb-10 mt-n1">
      <!--begin::Timeline heading-->
      <div class="pe-3 mb-5">
        <!--begin::Title-->
        <div class="fs-5 fw-bold mb-2">
          <template v-if="changeOPProcessTimelineMilestone.new_status">
            {{ translate("changeStatusInfo") }}
            <span :class="`badge-light-primary`" class="badge fs-4 fw-bolder">
              {{ changeOPProcessTimelineMilestone.previous_status.name }}
            </span>
            {{ translate("to") }}
            <span :class="`badge-light-primary`" class="badge fs-4 fw-bolder">
              {{ changeOPProcessTimelineMilestone.new_status.name }}
            </span>
          </template>
          <template
            v-if="
              changeOPProcessTimelineMilestone.previous_op ||
              changeOPProcessTimelineMilestone.new_op
            "
          >
            {{ translate("changeOPInfo") }}
            <span class="badge badge-light-warning fs-4 fw-bolder">
              <template v-if="changeOPProcessTimelineMilestone.previous_op">
                {{
                  DateTime.fromISO(
                      changeOPProcessTimelineMilestone.previous_op.start_at
                  )
                    .setLocale(this.$i18n.locale)
                    .toLocaleString()
                }}
                ({{
                  changeOPProcessTimelineMilestone.previous_op.op_type.name
                }})
              </template>
              <template v-else>
                {{ translate("withoutAssign") }}
              </template>
            </span>
            {{ translate("to") }}
            <span class="badge badge-light-warning fs-4 fw-bolder">
              <template v-if="changeOPProcessTimelineMilestone.new_op">
                {{
                  DateTime.fromISO(
                      changeOPProcessTimelineMilestone.new_op.start_at
                  )
                    .setLocale(this.$i18n.locale)
                    .toLocaleString()
                }}
                ({{ changeOPProcessTimelineMilestone.new_op.op_type.name }})
              </template>
              <template v-else>
                {{ translate("withoutAssign") }}
              </template>
            </span>
          </template>
          <template v-if="changeOPProcessTimelineMilestone.time_threshold">
            <span :class="`badge-light-danger`" class="badge fs-4 fw-bolder">
              {{
                changeOPProcessTimelineMilestone.time_threshold
                  ? translate("endOf") +
                    " " +
                    changeOPProcessTimelineMilestone.name
                  : ""
              }}
            </span>
          </template>
        </div>
        <!--end::Title-->
      </div>
      <!--end::Timeline heading-->

      <!--begin::Timeline details-->
      <div class="overflow-auto pb-5">
        <!--begin::Description-->
        <div class="d-flex align-items-center mt-1 fs-6">
          <!--begin::Info-->
          <div class="text-muted me-2 fs-7">
            <!--begin::OPStatusCase-->
            <template v-if="changeOPProcessTimelineMilestone.time_threshold">
              {{
                DateTime.now().diff(
                  DateTime.fromISO(
                      changeOPProcessTimelineMilestone.dead_line
                  )
                ) > 0
                  ? translate("finishedOn")
                  : translate("finishOn")
              }}
              {{
                changeOPProcessTimelineMilestone.dead_line
                  ? DateTime.fromISO(
                        changeOPProcessTimelineMilestone.dead_line
                    )
                      .setLocale(this.$i18n.locale)
                      .toLocaleString()
                  : ""
              }}
              {{ translate("atTime") }} 23:59
            </template>
            <!--end::OPStatusCase-->
            <!--begin::ChangeOPCase and ChangeStatusCase-->
            <template
              v-if="
                changeOPProcessTimelineMilestone.new_op ||
                changeOPProcessTimelineMilestone.previous_op ||
                changeOPProcessTimelineMilestone.new_status
              "
            >
              {{ translate("addedAt") }}
              {{
                changeOPProcessTimelineMilestone.created_at
                  ? DateTime.fromISO(
                      changeOPProcessTimelineMilestone.created_at
                    )
                      .setLocale(this.$i18n.locale)
                      .toLocaleString()
                  : ""
              }}
              {{ translate("atTime") }}
              {{
                changeOPProcessTimelineMilestone.created_at
                  ? DateTime.fromISO(
                        changeOPProcessTimelineMilestone.created_at
                    )
                      .setLocale(this.$i18n.locale)
                      .toLocaleString(DateTime.TIME_SIMPLE)
                  : ""
              }}
            </template>
            <!--end::ChangeOPCase and ChangeStatusCase-->
          </div>
          <!--begin::OPStatus Deadline-->
          <template v-if="changeOPProcessTimelineMilestone.update_deadlines">
            <div class="text-muted me-2 fs-7">
              -
              {{
                changeOPProcessTimelineMilestone.update_deadlines
                  ? translate("deadlinesUpdated")
                  : ""
              }}
            </div>
          </template>
          <!--begin::OPStatus Deadline-->
          <!--end::Info-->
          <!--begin::User-->
          <template v-if="changeOPProcessTimelineMilestone.new_status">
            {{ translate("by") + "&nbsp;" }}
            <a class="text-primary fw-bolder me-1" href="#">
              {{
                changeOPProcessTimelineMilestone.user
                  ? changeOPProcessTimelineMilestone.user.first_name +
                    " " +
                    changeOPProcessTimelineMilestone.user.last_name
                  : ""
              }}
              {{
                changeOPProcessTimelineMilestone.creator
                  ? changeOPProcessTimelineMilestone.creator.first_name +
                    " " +
                    changeOPProcessTimelineMilestone.creator.last_name
                  : ""
              }}
            </a>
          </template>
        </div>
        <!--end::User-->
        <!--end::Description-->
      </div>
      <!--end::Timeline details-->
    </div>
    <!--end::Timeline content-->
  </div>
  <!--end::Timeline item-->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { DateTime } from "luxon";

export default defineComponent({
  name: "ChangeOPProcessTimelineMilestone",
  props: ["changeOPProcessTimelineMilestone"],
  components: {},
  setup() {
    const { t, te } = useI18n();
    const translate = (text) => (te(text) ? t(text) : text);
    return {
      translate,
      DateTime,
    };
  },
});
</script>
