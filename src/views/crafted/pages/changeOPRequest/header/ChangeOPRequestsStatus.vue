<template>
  <a
    type="button"
    data-bs-toggle="modal"
    data-bs-target="#change_request_status_modal"
    class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
  >
    <span class="svg-icon svg-icon-2">
      <inline-svg src="/media/icons/duotune/art/art005.svg" />
    </span>
  </a>
  <!--begin::ChangeStatus-->
  <div class="modal fade" tabindex="-1" id="change_request_status_modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ translate("changeStatus") }}</h5>

          <!--begin::Close-->
          <div
            class="btn btn-icon btn-sm btn-active-light-primary ms-2"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <span class="svg-icon svg-icon-2x"></span>
          </div>
          <!--end::Close-->
        </div>

        <div class="modal-body">
          <!--begin::Table container-->
          <div class="table-responsive">
            <!--begin::Table-->
            <table
              class="
                table
                align-middle
                gs-0
                gy-4
                table-rounded table-striped
                border
              "
            >
              <!--begin::Table head-->
              <thead>
                <tr
                  class="
                    fw-bold
                    fs-5
                    text-gray-800
                    border-bottom-2 border-gray-200
                  "
                >
                  <th class="ps-4 rounded-start">{{ translate("request") }}</th>
                  <th class="min-w-100px">{{ translate("status") }}</th>
                </tr>
              </thead>
              <!--end::Table head-->
              <!--begin::Table body-->
              <tbody>
                <template
                  v-for="(item, index) in currentChangeOPRequests"
                  :key="index"
                >
                  <tr>
                    <td>
                      {{ item.request.title }}
                    </td>
                    <td>
                      <el-select
                        v-model="statusSelectValues[index]"
                        :placeholder="item.request.status.name"
                        style="margin-left: 10px"
                      >
                        <el-option
                          v-for="status in item.statuses"
                          :key="status.url"
                          :label="status.name"
                          :value="status.url"
                        >
                        </el-option>
                      </el-select>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">
            {{ translate("cancel") }}
          </button>
          <button type="button" class="btn btn-primary" @click="changeStatus">
            {{ translate("send") }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <!--end::ChangeStatus-->
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { Actions } from "@/store/enums/StoreEnums";
import Swal from "sweetalert2/dist/sweetalert2.min.js";

export default defineComponent({
  name: "changeOPRequestsStatus",
  props: {
    widgetClasses: String,
  },
  setup: function () {
    const { t, te } = useI18n();
    const translate = (text) => (te(text) ? t(text) : text);
    const store = useStore();
    const currentStatus = computed(() => {
      const status = store.getters.getCurrentChangeOPProcessStatus;
      return status ? status.name : "";
    });
    onMounted(() => {
      const contractTypeName =
        store.getters.getCurrentChangeOPProcessContractTypeName;
      store.dispatch(
        Actions.GET_CHANGE_OP_PROCESS_STATUSES_WITH_PARAMS,
        contractTypeName
      );
    });
    const statusSelectValues: string[] = reactive([]);
    const currentChangeOPRequests = computed(() => {
      const statuses = store.getters.getCurrentChangeOPProcessStatuses;
      const requests = store.getters.getCurrentChangeOPProcessRequests;
      const requestsWithStatuses: any[] = [];
      if (requests) {
        requests.forEach((request) => {
          let requestStatuses = [...statuses];
          requestStatuses.flatMap((status) => {
            status === request.status
              ? []
              : [{ value: status.url, label: status.name }];
          });
          requestsWithStatuses.push({
            request: request,
            statuses: requestStatuses,
          });
          statusSelectValues.push("");
        });
      }
      requestsWithStatuses.sort(function (a, b) {
        return a["url"] - b["url"];
      }); // TODO: verificar este orden
      return requestsWithStatuses;
    });

    const value = ref("");
    const changeStatus = () => {
      const requestStatus: any[] = [];
      statusSelectValues.forEach((status, index) => {
        let currentStatus: Array<string> = status.split("/");
        currentStatus.pop();
        const statusId: number = parseInt(currentStatus.pop() as string);
        let changeOPRequest =
          currentChangeOPRequests.value[index].request.url.split("/");
        changeOPRequest.pop();
        const changeOPRequestId: number = parseInt(
          changeOPRequest.pop() as string
        );
        const params = {
          params: {
            status: statusId,
          },
          requestId: changeOPRequestId,
        };
        if (statusId) {
          requestStatus.push(params);
        }
      });
      if (requestStatus) {
        requestStatus.forEach((param, index) => {
          store
            .dispatch(Actions.CHANGE_CHANGE_OP_REQUEST_STATUS, {
              resource: param.requestId,
              params: param.params,
            })
            .then(() => {
              if (index == requestStatus.length - 1) {
                Swal.fire({
                  text: translate("changeStatusSuccess"),
                  icon: "success",
                  buttonsStyling: false,
                  confirmButtonText: translate("continue"),
                  customClass: {
                    confirmButton: "btn fw-bold btn-light-success",
                  },
                  allowOutsideClick: false,
                }).then(() => location.reload());
              }
            });
        });
      } else {
        Swal.fire({
          text: translate("changeStatusError"),
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: translate("tryAgain"),
          customClass: {
            confirmButton: "btn fw-bold btn-light-danger",
          },
        });
      }
    };

    return {
      translate,
      value,
      currentStatus,
      changeStatus,
      currentChangeOPRequests,
      statusSelectValues,
    };
  },
});
</script>
b
