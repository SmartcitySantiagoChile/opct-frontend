<template>
  <!--begin::ChangeOPRequestBaseInfo-->
  <div :class="widgetClasses" class="card">
    <!--begin::Body-->
    <div class="card-body">
      <div class="tab-content">
        <!--begin::Tap pane-->

        <!--begin::Table container-->
        <h2>{{ changeOpRequestBaseInfo.title }}</h2>
        <div class="table-responsive">
          <!--begin::Table-->
          <table class="table align-middle gs-0 gy-3">
            <!--begin::Table head-->
            <thead>
              <tr>
                <th class="p-0 mw-auto"></th>
                <th class="p-0 mw-auto"></th>
                <th class="p-0 mw-auto"></th>
                <th class="p-0 mw-auto"></th>
                <th class="p-0 mw-auto"></th>
                <th class="p-0 mw-auto"></th>
              </tr>
            </thead>
            <!--end::Table head-->

            <!--begin::Table body-->
            <tbody>
              <tr>
                <td>
                  <span class="text-muted fw-bold d-block fs-5">{{
                    translate("creationDate")
                  }}</span>
                  <span class="text-dark fw-bolder d-block fs-3">{{
                    changeOpRequestBaseInfo.created_at
                      ? changeOpRequestBaseInfo.created_at.split("T")[0]
                      : ""
                  }}</span>
                </td>
                <td>
                  <span class="text-muted fw-bold d-block fs-5">
                    {{ translate("operationProgram") }}</span
                  >
                  <span class="text-dark fw-bolder d-block fs-3">
                    {{
                      changeOpRequestBaseInfo.op
                        ? changeOpRequestBaseInfo.op.start_at
                        : ""
                    }}</span
                  >
                </td>
                <td>
                  <span class="text-muted fw-bold d-block fs-5">
                    {{ translate("reason") }}</span
                  >
                  <span class="text-dark fw-bolder d-block fs-3">
                    {{ changeOpRequestBaseInfo.reason }}</span
                  >
                </td>
                <td>
                  <span class="text-muted fw-bold d-block fs-5">
                    {{ translate("creator") }}</span
                  >
                  <span class="text-dark fw-bolder d-block fs-3">
                    {{
                      changeOpRequestBaseInfo.creator
                        ? changeOpRequestBaseInfo.creator.first_name +
                          " " +
                          changeOpRequestBaseInfo.creator.last_name
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
                      changeOpRequestBaseInfo.counterpart
                        ? changeOpRequestBaseInfo.counterpart.name
                        : ""
                    }}</span
                  >
                </td>
                <td>
                  <span class="text-muted fw-bold d-block fs-5">
                    {{ translate("status") }}</span
                  >
                  <span
                    :class="`badge-light-success`"
                    class="badge fs-4 fw-bolder"
                    >{{
                      changeOpRequestBaseInfo.status
                        ? changeOpRequestBaseInfo.status.name
                        : ""
                    }}</span
                  >
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
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "changeOPRequestBaseInfo",
  components: {},
  props: {
    widgetClasses: String,
    changeOpRequestBaseInfo: {},
  },
  setup() {
    const { t, te } = useI18n();
    const translate = (text) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };
    return {
      translate,
    };
  },
});
</script>
