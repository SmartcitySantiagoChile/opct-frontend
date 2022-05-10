<template>
  <div id="selectChangeOPRequest" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">{{ translate('addChangeOPRequest') }}:</h3>

          <!--begin::Close-->
          <div
              aria-label="Close"
              class="btn btn-icon btn-sm btn-active-light-primary ms-2"
              data-bs-dismiss="modal"
          >
            <span class="svg-icon svg-icon-2x"></span>
          </div>
          <!--end::Close-->
        </div>
        <div class="modal-body">
          <!--begin::Tables ChangeOPRequests -->
          <div :class="widgetClasses" class="card">
            <!--begin::Header-->
            <div class="card-header border-0 pt-5">
              <h3 class="card-title align-items-start flex-column">
                <span class="card-label fw-bolder fs-3 mb-1">
                  {{ translate('changeOPRequests') }}:
                </span>
                <span class="text-muted mt-1 fw-bold fs-7">
                  <template
                      v-for="(
                      requestItem, requestIndex
                    ) in mutableSelectedChangeOPRequests"
                      :key="requestIndex"
                  >
                    #{{ requestIndex }}: {{ requestItem.title }},
                    {{ requestItem.reason }},
                    {{ requestItem.op ? requestItem.op.start_at : '' }} <br/>
                  </template>
                </span>
              </h3>
              <div class="card-toolbar align-items-start">
                <button
                    class="btn btn-primary btn-success"
                    type="button"
                    @click="addChangeOPRequest"
                >
                  {{ translate('addRequest') }}
                </button>
              </div>
            </div>
            <!--end::Header-->

            <!--begin::Body-->
            <div class="card-body py-3">
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
                    <th class="ps-4 rounded-start">
                      {{ translate('title') }}
                    </th>
                    <th class="ps-4 min-w-125px rounded-start">
                      {{ translate('reason') }}
                    </th>
                    <th class="min-w-80px"></th>
                  </tr>
                  </thead>
                  <!--end::Table head-->

                  <!--begin::Table body-->
                  <tbody>
                  <template
                      v-for="(item, index) in mutableSelectedChangeOPRequests"
                      :key="index"
                  >
                    <tr>
                      <td>
                        <div class="d-flex align-items-center">
                          <div class="symbol symbol-10px me-5"></div>
                          <div
                              class="d-flex justify-content-start flex-column"
                          >
                            <!--begin::Input group-->
                            <div class="fv-row mb-10">
                              <!--begin::Label-->
                              <label
                                  class="
                                    d-flex
                                    align-items-center
                                    fs-5
                                    fw-bold
                                    mb-2
                                  "
                              >
                                  <span class="required">{{
                                      translate('title')
                                    }}</span>
                                <i
                                    :title="`${translate(
                                      'changeOPRequestTitleLabel'
                                    )}`"
                                    class="fas fa-exclamation-circle ms-2 fs-7"
                                    data-bs-toggle="tooltip"
                                ></i>
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <Field
                                  class="
                                    form-control
                                    form-control-lg
                                    form-control-solid
                                  "
                                  name="title"
                                  placeholder=""
                                  type="text"
                              />
                              <ErrorMessage
                                  class="
                                    fv-plugins-message-container
                                    invalid-feedback
                                  "
                                  name="title"
                              />
                              <!--end::Input-->
                            </div>
                            <!--end::Input group-->
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="d-flex align-items-center">
                          <div class="symbol symbol-10px me-5"></div>
                          <div
                              class="d-flex justify-content-start flex-column"
                          >
                            <!--begin::Input group-->
                            <div class="fv-row mb-10">
                              <!--begin::Label-->
                              <label
                                  class="
                                    d-flex
                                    align-items-center
                                    fs-5
                                    fw-bold
                                    mb-2
                                  "
                              >
                                  <span class="required">{{
                                      translate('title')
                                    }}</span>
                                <i
                                    :title="`${translate(
                                      'changeOPRequestTitleLabel'
                                    )}`"
                                    class="fas fa-exclamation-circle ms-2 fs-7"
                                    data-bs-toggle="tooltip"
                                ></i>
                              </label>
                              <!--end::Label-->

                              <!--begin::Input-->
                              <Field
                                  class="
                                    form-control
                                    form-control-lg
                                    form-control-solid
                                  "
                                  name="title"
                                  placeholder=""
                                  type="text"
                              />
                              <ErrorMessage
                                  class="
                                    fv-plugins-message-container
                                    invalid-feedback
                                  "
                                  name="title"
                              />
                              <!--end::Input-->
                            </div>
                            <!--end::Input group-->
                          </div>
                        </div>
                      </td>

                      <td>
                        <div class="mb-10">
                          <div
                              class="
                                form-check form-check-custom form-check-solid
                              "
                          >
                            <input
                                :checked="isChecked(JSON.stringify(item))"
                                :data-change-op-request="JSON.stringify(item)"
                                class="form-check-input"
                                type="checkbox"
                                @change="onCheckboxChange"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  </template>
                  </tbody>
                  <!--end::Table body-->
                </table>
                <!--end::Table-->
                <div class="d-flex align-items-center">
                  <ul class="pagination d-flex align-items-center">
                    <li id="previousItem" class="page-item previous disabled">
                      <button
                          class="page-link"
                          data-value="-1"
                          @click="onPageChange"
                      >
                        <i class="previous" data-value="1"></i>
                      </button>
                    </li>
                    <template
                        v-for="(item, index) in Array.from(
                        { length: Math.ceil(changeOPRequestsCount / 10) },
                        (_, i) => i + 1
                      )"
                        :key="index"
                    >
                      <li class="page-item">
                        <button
                            :data-value="item"
                            class="page-link"
                            @click="onPageChange"
                        >
                          {{ item }}
                        </button>
                      </li>
                    </template>
                    <li class="page-item next">
                      <button
                          class="page-link"
                          data-value="-1"
                          @click="onPageChange"
                      >
                        <i class="next" data-value="-1"></i>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <!--end::Table container-->
            </div>
            <!--begin::Body-->
          </div>
          <!--end::Tables Widget 12-->
        </div>

        <div class="modal-footer">
          <button class="btn btn-light" data-bs-dismiss="modal" type="button">
            {{ translate('cancel') }}
          </button>
          <button
              class="btn btn-primary"
              data-bs-dismiss="modal"
              type="button"
              @click="saveSelectedChangeOPRequests"
          >
            {{ translate('save') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {computed, defineComponent, Ref, ref} from "vue";
import {Actions} from "@/store/enums/StoreEnums";
import {useStore} from "vuex";
import {useI18n} from "vue-i18n";
import {DateTime} from "luxon";

export default defineComponent({
  name: "change-op-requests-input-table",
  props: {
    widgetClasses: String,
  },
  emits: ["onChangeSelectedChangeOPRequests"],
  setup: function (props, context) {
    const {t, te} = useI18n();
    const translate = (text) => (te(text) ? t(text) : text);
    const store = useStore();
    store.dispatch(Actions.GET_CHANGE_OP_REQUESTS);
    const changeOPRequests = computed(
        () => store.getters.getCurrentChangeOPRequests
    );
    const changeOPRequestsCount = computed(
        () => store.getters.getCurrentChangeOPRequestsCount
    );

    // Manage new requests
    const mutableSelectedChangeOPRequests: Ref<any[]> = ref([]);
    let currentRequestCounter = 0;

    // Events
    const onFilterChange = (event) => {
      const filter = String(event.target.value);
      if (filter.length > 3 && filter.length < 11) {
        store.dispatch(Actions.GET_CHANGE_OP_REQUESTS_WITH_PARAMS, {
          search: filter,
        });
      } else if (filter.length === 0) {
        store.dispatch(Actions.GET_CHANGE_OP_REQUESTS);
      }
    };

    const onPageChange = (event) => {
      const filter = document.querySelector<HTMLInputElement>(
          'input[name="filter"]'
      );
      let params = {};
      if (filter) {
        params["search"] = filter.value;
      }
      let pageId = event.target.getAttribute("data-value");
      pageId =
          pageId === "-1"
              ? String(Math.ceil(changeOPRequestsCount.value / 10))
              : pageId;

      if (pageId === "1") {
        disablePreviousItem();
      } else if (pageId > "1") {
        enablePreviousItem();
      } else if (pageId === "0") {
        disablePreviousItem();
        return;
      }
      params["page"] = pageId;
      store.dispatch(Actions.GET_CHANGE_OP_REQUESTS_WITH_PARAMS, params);
    };

    // Pagination
    const disablePreviousItem = () => {
      const previousItem = document.getElementById("previousItem");
      if (previousItem) {
        previousItem.setAttribute("class", "page-item previous disabled");
      }
    };

    const enablePreviousItem = () => {
      const previousItem = document.getElementById("previousItem");
      if (previousItem) {
        previousItem.setAttribute("class", "page-item previous");
      }
    };

    const onCheckboxChange = (event) => {
      const changeOPRequest = JSON.parse(event.target.dataset.changeOpRequest);
      const changeOPRequestId = changeOPRequest.url
          .split("/change-op-requests/")[1]
          .split("/")[0];
      if (event.target.checked) {
        //mutableSelectedChangeOPRequests.value[changeOPRequestId] =
        //  changeOPRequest;
      } else {
        delete mutableSelectedChangeOPRequests.value[changeOPRequestId];
      }
    };

    const isChecked = (event) => {
      const changeOPRequest = JSON.parse(event);
      const changeOPRequestId = changeOPRequest.url
          .split("/change-op-requests/")[1]
          .split("/")[0];
      return !!mutableSelectedChangeOPRequests.value[changeOPRequestId];
    };

    const saveSelectedChangeOPRequests = () => {
      context.emit(
          "onChangeSelectedChangeOPRequests",
          mutableSelectedChangeOPRequests
      );
    };

    const addChangeOPRequest = () => {
      console.log("addChangeOPRequest");
      mutableSelectedChangeOPRequests.value.push(["title", "reason"]);
      console.log(mutableSelectedChangeOPRequests);
      currentRequestCounter += 1;
    };

    return {
      changeOPRequests,
      changeOPRequestsCount,
      translate,
      onFilterChange,
      onPageChange,
      DateTime,
      onCheckboxChange,
      isChecked,
      mutableSelectedChangeOPRequests,
      saveSelectedChangeOPRequests,
      addChangeOPRequest,
    };
  },
});
</script>
