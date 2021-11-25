<template>
  <!--begin::Tables ChangeOPRequests -->
  <div :class="widgetClasses" class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bolder fs-3 mb-1">{{
          translate("changeOPRequests")
        }}</span>

        <span class="text-muted mt-1 fw-bold fs-7">{{
          translate("changesNumber") + ": " + changeOPRequestsCount
        }}</span>
      </h3>
      <div class="card-toolbar">
        <!--begin::Menu-->
        <input
          type="text"
          class="form-control"
          name="filter"
          v-bind:placeholder="translate('filterByOp')"
          @keyup="onFilterChange"
        />

        <!--end::Menu-->
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
              class="fw-bold fs-5 text-gray-800 border-bottom-2 border-gray-200"
            >
              <th class="ps-4 min-w-125px rounded-start">
                {{ translate("creationDate") }}
              </th>
              <th class="min-w-200px">{{ translate("operationProgram") }}</th>
              <th class="min-w-150px">{{ translate("title") }}</th>
              <th class="min-w-150px">{{ translate("reason") }}</th>
              <th class="min-w-100px">{{ translate("creator") }}</th>
              <th class="min-w-100px">{{ translate("counterpart") }}</th>
              <th class="min-w-80px">{{ translate("status") }}</th>
              <th class="min-w-80px"></th>
            </tr>
          </thead>
          <!--end::Table head-->

          <!--begin::Table body-->
          <tbody>
            <template v-for="(item, index) in changeOPRequests" :key="index">
              <tr>
                <td>
                  <div class="d-flex align-items-center">
                    <div class="symbol symbol-10px me-5"></div>
                    <div class="d-flex justify-content-start flex-column">
                      <a
                        href=""
                        class="text-dark fw-bolder text-hover-primary mb-1 fs-6"
                        >{{ item.created_at.split("T")[0] }}
                      </a>
                    </div>
                  </div>
                </td>

                <td>
                  <a
                    href="#"
                    class="
                      text-dark
                      fw-bolder
                      text-hover-primary
                      d-block
                      mb-1
                      fs-6
                    "
                    >{{ item.op.start_at }}</a
                  >
                </td>

                <td>
                  <a
                    href="#"
                    class="
                      text-dark
                      fw-bolder
                      text-hover-primary
                      d-block
                      mb-1
                      fs-6
                    "
                    >{{ item.title }}</a
                  >
                </td>
                <td>
                  <a
                    href="#"
                    class="
                      text-dark
                      fw-bolder
                      text-hover-primary
                      d-block
                      mb-1
                      fs-6
                    "
                    >{{ item.reason }}</a
                  >
                </td>

                <td>
                  <a
                    href="#"
                    class="
                      text-dark
                      fw-bolder
                      text-hover-primary
                      d-block
                      mb-1
                      fs-6
                    "
                    >{{
                      item.creator.first_name + " " + item.creator.last_name
                    }}</a
                  >
                </td>

                <td>
                  <a
                    href="#"
                    class="
                      text-dark
                      fw-bolder
                      text-hover-primary
                      d-block
                      mb-1
                      fs-6
                    "
                    >{{ item.counterpart.name }}</a
                  >
                </td>

                <td>
                  <a
                    href="#"
                    class="
                      text-dark
                      fw-bolder
                      text-hover-primary
                      d-block
                      mb-1
                      fs-6
                    "
                    >{{ item.status.name }}</a
                  >
                </td>
                <td>
                  <a
                    v-bind:href="item.url.split('api')[1]"
                    class="
                      btn btn-sm btn-icon btn-bg-light btn-active-color-primary
                    "
                  >
                    <span class="svg-icon svg-icon-2">
                      <inline-svg
                        src="/media/icons/duotune/arrows/arr064.svg"
                      />
                    </span>
                  </a>
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
              <button data-value="-1" @click="onPageChange" class="page-link">
                <i data-value="1" class="previous"></i>
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
                  @click="onPageChange"
                  :data-value="item"
                  class="page-link"
                >
                  {{ item }}
                </button>
              </li>
            </template>
            <li class="page-item next">
              <button data-value="-1" @click="onPageChange" class="page-link">
                <i data-value="-1" class="next"></i>
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
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { Actions } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "change-op-requests-table",
  components: {},
  props: {
    widgetClasses: String,
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
    const store = useStore();
    store.dispatch(Actions.GET_CHANGE_OP_REQUESTS);
    const changeOPRequests = computed(
      () => store.getters.getCurrentChangeOPRequests
    );
    const changeOPRequestsCount = computed(
      () => store.getters.getCurrentChangeOPRequestsCount
    );

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

    return {
      changeOPRequests,
      changeOPRequestsCount,
      translate,
      onFilterChange,
      onPageChange,
    };
  },
});
</script>
