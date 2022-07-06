<template>
  <!--button to show modal-->
  <span class="card-label fw-bolder fs-3 me-3">
    <a
      id="kt_toolbar_primary_button"
      class="btn btn-success"
      data-bs-target="#modal_create_change_op_process"
      data-bs-toggle="modal"
      href="#"
    >
      {{ translate("createChangeOPProcess") }}
    </a>
  </span>
  <!--begin::Modal - Create Change OP Request-->
  <div id="modal_create_change_op_process" aria-hidden="true" class="modal fade" tabindex="-1">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-900px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header">
          <!--begin::Modal title-->
          <h2>{{ translate("createChangeOPProcess") }}</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div class="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal">
            <span class="svg-icon svg-icon-1">
              <inline-svg src="/media/icons/duotune/arrows/arr061.svg" />
            </span>
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->

        <!--begin::Modal body-->
        <div class="modal-body py-lg-10 px-lg-10">
          <!--begin::Stepper-->
          <div
            id="modal_create_change_op_process_stepper"
            ref="createChangeOPRef"
            class="stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid"
          >
            <!--begin::Aside-->
            <div class="d-flex justify-content-center justify-content-xl-start flex-row-auto w-100 w-xl-300px">
              <!--begin::Nav-->
              <div class="stepper-nav ps-lg-10">
                <!--begin::Step 1-->
                <div class="stepper-item current" data-kt-stepper-element="nav">
                  <!--begin::Line-->
                  <div class="stepper-line w-40px"></div>
                  <!--end::Line-->
                  <!--begin::Icon-->
                  <div class="stepper-icon w-40px h-40px">
                    <i class="stepper-check fas fa-check"></i> <span class="stepper-number">1</span>
                  </div>
                  <!--end::Icon-->
                  <!--begin::Label-->
                  <div class="stepper-label">
                    <h3 class="stepper-title">{{ translate("initialInformation") }}</h3>
                    <div class="stepper-desc">{{ translate("requestDetailInfo") }}</div>
                  </div>
                  <!--end::Label-->
                </div>
                <!--end::Step 1-->

                <!--begin::Step 2-->
                <div class="stepper-item" data-kt-stepper-element="nav">
                  <!--begin::Line-->
                  <div class="stepper-line w-40px"></div>
                  <!--end::Line-->
                  <!--begin::Icon-->
                  <div class="stepper-icon w-40px h-40px">
                    <i class="stepper-check fas fa-check"></i> <span class="stepper-number">2</span>
                  </div>
                  <!--end::Icon-->
                  <!--begin::Label-->
                  <div class="stepper-label">
                    <h3 class="stepper-title">{{ translate("changeOPRequests") }}</h3>
                    <div class="stepper-desc">{{ translate("changeOPRequestsInfo") }}</div>
                  </div>
                  <!--begin::Label-->
                </div>
                <!--end::Step 2-->

                <!--begin::Step 3-->
                <div class="stepper-item" data-kt-stepper-element="nav">
                  <!--begin::Line-->
                  <div class="stepper-line w-40px"></div>
                  <!--end::Line-->
                  <!--begin::Icon-->
                  <div class="stepper-icon w-40px h-40px">
                    <i class="stepper-check fas fa-check"></i> <span class="stepper-number">3</span>
                  </div>
                  <!--end::Icon-->
                  <!--begin::Label-->
                  <div class="stepper-label">
                    <h3 class="stepper-title">{{ translate("counterpart") }}</h3>
                    <div class="stepper-desc">{{ translate("counterPartInfo") }}</div>
                  </div>
                  <!--begin::Label-->
                </div>
                <!--end::Step 3-->

                <!--begin::Step 4-->
                <div class="stepper-item" data-kt-stepper-element="nav">
                  <!--begin::Line-->
                  <div class="stepper-line w-40px"></div>
                  <!--end::Line-->

                  <!--begin::Icon-->
                  <div class="stepper-icon w-40px h-40px">
                    <i class="stepper-check fas fa-check"></i>
                    <span class="stepper-number">4</span>
                  </div>
                  <!--end::Icon-->

                  <!--begin::Label-->
                  <div class="stepper-label">
                    <h3 class="stepper-title">{{ translate("operationProgram") }}</h3>
                    <div class="stepper-desc">{{ translate("operationProgramInfo") }}</div>
                  </div>
                  <!--end::Label-->
                </div>
                <!--end::Step 4-->

                <!--begin::Step 5-->
                <div class="stepper-item" data-kt-stepper-element="nav">
                  <!--begin::Line-->
                  <div class="stepper-line w-40px"></div>
                  <!--end::Line-->
                  <!--begin::Icon-->
                  <div class="stepper-icon w-40px h-40px">
                    <i class="stepper-check fas fa-check"></i> <span class="stepper-number">5</span>
                  </div>
                  <!--end::Icon-->
                  <!--begin::Label-->
                  <div class="stepper-label">
                    <h3 class="stepper-title">{{ translate("confirmation") }}</h3>
                    <div class="stepper-desc">{{ translate("confirmationInfo") }}</div>
                  </div>
                  <!--end::Label-->
                </div>
                <!--end::Step 5-->
              </div>
              <!--end::Nav-->
            </div>
            <!--begin::Aside-->

            <!--begin::Content-->
            <div class="flex-row-fluid py-lg-5 px-lg-15">
              <!--begin::Form-->
              <form id="modal_create_change_op_request_form" class="form" novalidate="novalidate" @submit="handleStep">
                <!--begin::Step 1-->
                <div class="current" data-kt-stepper-element="content">
                  <div class="w-100">
                    <!--begin::Input group-->
                    <div class="fv-row mb-10">
                      <!--begin::Label-->
                      <label class="d-flex align-items-center fs-5 fw-bold mb-2">
                        <span class="required">{{ translate("title") }}</span>
                        <i
                          :title="`${translate('changeOPRequestTitleLabel')}`"
                          class="fas fa-exclamation-circle ms-2 fs-7"
                          data-bs-toggle="tooltip"
                        ></i>
                      </label>
                      <!--end::Label-->

                      <!--begin::Input-->
                      <Field
                        class="form-control form-control-lg form-control-solid"
                        name="title"
                        placeholder=""
                        type="text"
                        :rules="'required'"
                      />
                      <ErrorMessage class="fv-plugins-message-container invalid-feedback" name="title" />
                      <!--end::Input-->
                    </div>
                    <!--end::Input group-->

                    <!--begin::Input group-->
                    <div class="fv-row mb-10">
                      <form id="message_form" class="ql-quil ql-quil-plain pb-3">
                        <!--begin::Editor-->
                        <div id="message_editor" class="py-6"></div>
                        <!--end::Editor-->
                        <!--begin::Toolbar-->
                        <div id="message_toolbar" class="ql-toolbar d-flex flex-stack py-2"></div>
                        <el-upload
                          :auto-upload="false"
                          :file-list="fileList"
                          :on-change="handleChange"
                          action=""
                          multiple=""
                          :limit="5"
                        >
                          <el-button size="small" type="primary">{{ translate("attachFiles") }} </el-button>
                          <template #tip>
                            <div class="el-upload__tip">
                              {{ translate("attachFilesHelp") }}
                            </div>
                          </template>
                        </el-upload>
                        <!--end::Toolbar-->
                        <div class="separator"></div>
                        <!--end::Input group-->
                      </form>
                    </div>
                  </div>
                </div>
                <!--end::Step 1-->

                <!--begin::Step 2-->
                <div data-kt-stepper-element="content">
                  <div class="w-100">
                    <!--begin::Input group-->
                    <div class="row mb-10">
                      <!--begin::Card-->
                      <div :class="widgetClasses" class="card">
                        <!--begin::Header-->
                        <div class="card-header border-0 pt-5">
                          <!--begin::Card Title-->
                          <h3 class="card-title align-items-start flex-column">
                            <!--begin::Label-->
                            <label class="required fs-6 fw-bold form-label mb-2">{{
                              translate("changeOPRequests")
                            }}</label>
                            <!--end::Label-->
                          </h3>
                          <!--end::Card Title-->
                          <!--begin::Add Button-->
                          <div class="card-toolbar">
                            <button class="btn btn-primary btn-success" type="button" @click="addChangeOPRequest">
                              {{ translate("add") }}
                            </button>

                            <a
                              @click="deleteChangeOPRequest(index)"
                              class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary ml-1"
                              type="button"
                            >
                              <span class="svg-icon svg-icon-2">
                                <inline-svg src="/media/icons/duotune/general/gen027.svg" />
                              </span>
                            </a>
                          </div>
                          <!--end::Add Button-->
                        </div>
                        <!--end::Header-->
                        <!--begin::Body-->
                        <div class="card-body py-3">
                          <!--begin::Table container-->
                          <div class="table-responsive">
                            <!--begin::Table-->
                            <table
                              class="table align-middle gs-0 gy-4 table-rounded table-striped border"
                              id="changeOPRequestsTable"
                            >
                              <!--begin::Table head-->
                              <thead>
                                <tr class="fw-bold fs-5 text-gray-800 border-bottom-2 border-gray-200">
                                  <th class="ps-4 rounded-start">
                                    {{ translate("title") }}
                                  </th>
                                  <th class="ps-4 min-w-125px rounded-start">
                                    {{ translate("reason") }}
                                  </th>
                                  <th class="ps-4 rounded-start"></th>
                                </tr>
                              </thead>
                              <!--end::Table head-->

                              <!--begin::Table body-->
                              <tbody>
                                <template v-for="(item, index) in addedChangeOPRequest" :key="index">
                                  <tr>
                                    <td>
                                      <div class="d-flex align-items-center">
                                        <div class="symbol symbol-10px me-5"></div>
                                        <div class="d-flex justify-content-start flex-column">
                                          <!--begin::Input group-->
                                          <div class="fv-row mb-10">
                                            <!--begin::Input-->
                                            <Field
                                              class="form-control form-control-lg form-control-solid"
                                              :name="'changeoprequest' + index"
                                              placeholder="Título"
                                              type="text"
                                              :id="'changeoprequest' + index"
                                              :value="item[0] !== '0' ? item[0] : ''"
                                            />
                                            <ErrorMessage
                                              class="fv-plugins-message-container invalid-feedback"
                                              :name="'changeoprequest' + index"
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
                                        <div class="d-flex justify-content-start flex-column">
                                          <!--begin::Input group-->
                                          <div class="row mb-10">
                                            <!--begin::Col-->
                                            <div class="col-md-8 fv-row">
                                              <!--end::Label-->

                                              <!--begin::Row-->
                                              <div class="row fv-row">
                                                <!--begin::Col-->
                                                <select
                                                  :id="'reason' + index"
                                                  class="form-select form-select-solid select2-hidden-accessible selected"
                                                >
                                                  <option
                                                    v-for="i in reasonOptions"
                                                    :key="i.value"
                                                    :label="i.label"
                                                    :value="i.value"
                                                  ></option>
                                                </select>
                                                <!--end::Col-->
                                              </div>
                                              <!--end::Row-->
                                            </div>
                                            <!--end::Col-->
                                          </div>
                                          <!--end::Input group-->
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </template>
                              </tbody>
                              <!--end::Table body-->
                            </table>
                            <!--end::Table-->
                          </div>
                          <!--end::Table container-->
                        </div>
                      </div>
                      <!--end::Card-->
                    </div>
                    <!--end::Input group-->
                  </div>
                </div>
                <!--end::Step 2-->

                <!--begin::Step 3-->
                <div data-kt-stepper-element="content">
                  <div class="w-100">
                    <!--begin::Input group-->
                    <div class="row mb-10">
                      <!--begin::Col-->
                      <div class="col-md-8 fv-row">
                        <!--begin::Label-->
                        <label class="required fs-6 fw-bold form-label mb-2">{{ translate("counterpart") }}</label>
                        <ErrorMessage class="fv-plugins-message-container invalid-feedback" name="counterpart" />
                        <!--end::Label-->

                        <!--begin::Row-->
                        <div class="row fv-row">
                          <!--begin::Col-->
                          <select
                            id="counterpart"
                            class="form-select form-select-solid select2-hidden-accessible selected"
                          >
                            <option
                              v-for="i in organizationOptions"
                              :key="i.value"
                              :data-contractType="i.contractType"
                              :label="i.label"
                              :value="i.value"
                            ></option>
                          </select>
                          <!--end::Col-->
                        </div>
                        <!--end::Row-->
                      </div>
                      <!--end::Col-->
                    </div>
                    <!--end::Input group-->
                  </div>
                </div>
                <!--end::Step 3-->

                <!--begin::Step 4-->
                <div data-kt-stepper-element="content">
                  <div class="w-100">
                    <!--begin::Input group-->
                    <div class="row mb-10">
                      <!--begin::Col-->
                      <div class="col-md-8 fv-row">
                        <!--begin::Label-->
                        <label class="required fs-6 fw-bold form-label mb-2">{{ translate("operationProgram") }}</label>
                        <ErrorMessage class="fv-plugins-message-container invalid-feedback" name="op" />
                        <!--end::Label-->

                        <!--begin::Row-->
                        <div class="row fv-row">
                          <!--begin::Col-->
                          <Field
                            id="op"
                            as="select"
                            class="form-select form-select-solid select2-hidden-accessible"
                            name="operation_program"
                          >
                            <option disabled selected value="">
                              {{ translate("selectOP") }}
                            </option>
                            <option
                              v-for="i in OPOptions"
                              :key="i.value"
                              :data-release="i.release"
                              :label="i.label"
                              :value="i.value"
                            ></option>
                          </Field>
                          <!--end::Col-->
                        </div>
                        <!--end::Row-->
                      </div>
                      <!--end::Col-->
                    </div>
                    <!--end::Input group-->
                  </div>
                </div>
                <!--end::Step 4-->

                <!--begin::Step 5-->
                <div data-kt-stepper-element="content">
                  <div class="w-100 text-center">
                    <!--begin::Heading-->
                    <h1 class="fw-bolder text-dark mb-3">
                      {{ translate("confirmData") }}
                    </h1>
                    <!--end::Heading-->

                    <!--begin::Description-->
                    <table class="table align-middle table-rounded table-striped border">
                      <tbody>
                        <template v-for="(item, index) in formDataInfo" :key="index">
                          <tr>
                            <th>
                              <b>{{ translate(index) }}</b>
                            </th>
                            <th>
                              <template v-if="index === 'files'">
                                <template v-for="(subitem, subindex) in item" :key="subindex">
                                  {{ subitem.name }}<br />
                                </template>
                              </template>
                              <template v-else-if="index === 'change_op_requests'">
                                <template v-for="(subitem, subindex) in item" :key="subindex">
                                  {{ subitem }} <br />
                                </template>
                              </template>
                              <template v-else>
                                {{ item }}
                              </template>
                            </th>
                          </tr>
                        </template>
                      </tbody>
                    </table>
                    <!--end::Description-->
                  </div>
                </div>
                <!--end::Step 5-->

                <!--begin::Actions-->
                <div class="d-flex flex-stack pt-10">
                  <!--begin::Wrapper-->
                  <div class="me-2">
                    <button
                      class="btn btn-lg btn-light-primary me-3"
                      data-kt-stepper-action="previous"
                      type="button"
                      @click="previousStep()"
                    >
                      <span class="svg-icon svg-icon-3 me-1">
                        <inline-svg src="/media/icons/duotune/arrows/arr063.svg" />
                      </span>
                      {{ translate("back") }}
                    </button>
                  </div>
                  <!--end::Wrapper-->

                  <!--begin::Wrapper-->
                  <div>
                    <button
                      v-if="currentStepIndex === totalSteps - 1"
                      class="btn btn-lg btn-primary"
                      type="submit"
                      @click="formSubmit()"
                    >
                      <span class="indicator-label">
                        {{ translate("create") }}
                        <span class="svg-icon svg-icon-3 ms-2 me-0">
                          <inline-svg src="/media/icons/duotune/arrows/arr064.svg" />
                        </span>
                      </span>
                      <span class="indicator-progress">
                        {{ translate("pleaseWait") }}
                        <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                      </span>
                    </button>

                    <button v-else class="btn btn-lg btn-primary" type="submit">
                      {{ translate("continue") }}
                      <span class="svg-icon svg-icon-3 ms-1 me-0">
                        <inline-svg src="/media/icons/duotune/arrows/arr064.svg" />
                      </span>
                    </button>
                  </div>
                  <!--end::Wrapper-->
                </div>
                <!--end::Actions-->
              </form>
              <!--end::Form-->
            </div>
            <!--end::Content-->
          </div>
          <!--end::Stepper-->
        </div>
        <!--end::Modal body-->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
  <!--end::Modal - Create App-->
</template>

<style lang="scss" scoped>
.el-input--suffix .el-input__inner {
  background-color: #f5f8fa;
}

.el-input__inner {
  background-color: #f5f8fa;
}
</style>

<script lang="ts">
import { computed, defineComponent, onMounted, Ref, ref, watch, reactive } from "vue";
import { StepperComponent } from "@/assets/ts/components/_StepperComponent";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import { ErrorMessage, Field, useForm } from "vee-validate";
import * as Yup from "yup";
import { hideModal } from "@/core/helpers/dom";
import { useI18n } from "vue-i18n";
import { Actions } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import Quill from "quill/dist/quill.js";

interface Step1Form {
  title: string;
}

interface Step2Form {
  change_op_requests: any[];
}

interface Step3Form {
  counterpart: string;
}

interface Step4Form {
  operation_program: string;
}

interface ChangeOPProcessCreationPayload extends Step1Form, Step2Form, Step3Form, Step4Form {}

interface ReasonOption {
  value: string;
  label: string;
}

interface OperationProgramOption extends ReasonOption {
  release: string;
}

interface OrganizationOption extends ReasonOption {
  contractType: string;
}

export default defineComponent({
  name: "ChangeOPProcessCreate",
  components: {
    Field,
    ErrorMessage,
  },
  props: {
    widgetClasses: String,
  },
  setup: function () {
    const { t, te } = useI18n();
    const translate = (text) => (te(text) ? t(text) : text);
    const store = useStore();

    /********************************************************************
    // Set constants for form
    //*******************************************************************/
    const _stepperObj = ref<StepperComponent | null>(null);
    const createChangeOPRef = ref<HTMLElement | null>(null);
    const createAppModalRef = ref<HTMLElement | null>(null);
    const currentStepIndex = ref(0);
    const currentUser = store.getters.currentUser;
    const isAdminOrganization = computed(() => store.getters.hasChangeStatusOption);
    let fileList = [];
    let relatedChangeOPRequests: Array<string> = [];
    let relatedChangeOPRequestsInfo: Array<string> = [];

    const formData = ref<ChangeOPProcessCreationPayload>({
      title: "",
      change_op_requests: [],
      counterpart: "",
      operation_program: "",
    });

    const formDataInfo = ref<ChangeOPProcessCreationPayload>({
      title: "",
      change_op_requests: [],
      counterpart: "",
      operation_program: "",
    });

    let reasonOptions: Array<ReasonOption> = reactive<Array<ReasonOption>>([]);
    let OPOptions: Array<OperationProgramOption> = reactive<Array<OperationProgramOption>>([]);
    let organizationOptions: Array<OrganizationOption> = reactive<Array<OrganizationOption>>([]);
    /********************************************************************
    // Call actions to get selectors data.
    //*******************************************************************/
    const promise1 = store.dispatch(Actions.GET_CHANGE_OP_REQUEST_REASONS);
    const promise2 = store.dispatch(Actions.GET_ORGANIZATIONS);
    const promise3 = store.dispatch(Actions.GET_OPERATION_PROGRAMS);
    Promise.all([promise1, promise2, promise3]).then(() => {
      /********************************************************************
      // Create selectors.
      //*******************************************************************/
      const reasons: Array<Array<string>> = store.getters.getChangeOPRequestReason;
      if (reasons.length) {
        reasons.forEach((v) => {
          reasonOptions.push({ value: v[0], label: v[1] });
        });
      }

      const operationPrograms = store.getters.getCurrentOperationPrograms;
      if (operationPrograms.length && store.getters.hasChangeStatusOption) {
        operationPrograms.forEach((operationProgram) => {
          OPOptions.push({
            value: operationProgram.url,
            label: operationProgram.start_at + " (" + operationProgram.op_type.name + ")",
            release: operationProgram.start_at,
          });
        });
      }
      OPOptions.push({ value: "None", label: translate("withoutOP"), release: "" });

      const organizations = store.getters.getAllOrganizations;
      if (store.getters.hasChangeStatusOption) {
        organizations.forEach((organization) => {
          if (organization.url !== currentUser.organization.url) {
            organizationOptions.push({
              value: organization.url,
              label: organization.name,
              contractType: organization.contract_type.url,
            });
          }
        });
      } else {
        organizations.some((organization) => {
          if (organization.url === currentUser.organization.default_counterpart) {
            organizationOptions.push({
              value: organization.url,
              label: organization.name,
              contractType: organization.contract_type.url,
            });
            return true;
          }
        });
      }
    });

    const searchChangeOpRequest = (filter) => {
      if (filter.length > 3 && filter.length < 11) {
        store.dispatch(Actions.GET_CHANGE_OP_REQUESTS_WITH_PARAMS, {
          search: filter,
        });
      }
    };

    onMounted(() => {
      _stepperObj.value = StepperComponent.createInsance(createChangeOPRef.value as HTMLElement);
      const editorId = "message_editor";
      // init editor
      const options = {
        modules: {
          toolbar: {
            container: "#message_toolbar",
          },
        },
        placeholder: translate("writeMessage"),
        theme: "snow",
      };

      // Init editor
      new Quill("#" + editorId, options);
    });

    // Set form validators
    const createAppSchema = [
      Yup.object({
        title: Yup.string().required(translate("titleRequired")).label("Title"),
      }),
      // Yup.object({
      //   change_op_requests: Yup.array().required().label("changeOPRequest"),
      // }),
      Yup.object({
        counterpart: Yup.string().required(translate("counterpartRequired")).label("Counterpart"),
      }),
      Yup.object({}),
      Yup.object({
        operation_program: Yup.string().required(translate("operationProgramRequired")).label("OperationProgram"),
      }),
    ];

    // extracts the individual step schema
    const currentSchema = computed(() => {
      return createAppSchema[currentStepIndex.value];
    });

    const totalSteps = computed(() => {
      return !_stepperObj.value ? null : _stepperObj.value.totatStepsNumber;
    });

    const { resetForm, handleSubmit } = useForm<Step1Form | Step2Form | Step3Form | Step4Form>({
      validationSchema: currentSchema,
    });

    const previousStep = () => {
      if (!_stepperObj.value) {
        return;
      }
      currentStepIndex.value--;
      _stepperObj.value.goPrev();
    };

    const handleStep = handleSubmit((values) => {
      console.log("handleSubmit");
      console.log(values);
      formData.value = {
        ...formData.value,
        ...values,
      };

      formDataInfo.value["title"] = formData.value["title"];
      //formDataInfo.value["relatedChangeOPRequests"] =
      //  relatedChangeOPRequestsInfo;

      const changeOPRequestsTable: HTMLTableElement = document.getElementById(
        "changeOPRequestsTable"
      ) as HTMLTableElement;
      formDataInfo.value["change_op_requests"] = [];
      formData.value["change_op_requests"] = [];
      if (changeOPRequestsTable) {
        const tableRows: HTMLCollection = changeOPRequestsTable.tBodies[0].rows as HTMLCollection;
        for (let i = 0; i <= tableRows.length; i++) {
          const row: HTMLTableRowElement = tableRows.item(i) as HTMLTableRowElement;
          if (row) {
            const cells = row.cells;
            const title: HTMLTableCellElement = cells.item(0) as HTMLTableCellElement;
            const titleValue = title.getElementsByTagName("input")[0].value;
            const reason: HTMLTableCellElement = cells.item(1) as HTMLTableCellElement;
            const reasonSelector: HTMLSelectElement = reason.getElementsByTagName("select")[0];
            const reasonValue = reasonSelector.options[reasonSelector.selectedIndex].value;
            const reasonLabel = reasonSelector.options[reasonSelector.selectedIndex].label;
            formDataInfo.value["change_op_requests"].push([titleValue, reasonLabel]);
            formData.value["change_op_requests"].push([titleValue, reasonValue]);
          }
        }
      }

      const counterPartSelector: HTMLSelectElement = document.querySelector("#counterpart") as HTMLSelectElement;
      if (counterPartSelector.selectedIndex !== -1) {
        formData.value["counterpart"] = counterPartSelector.value;
        formData.value["contract_type"] =
          counterPartSelector.options[counterPartSelector.selectedIndex].dataset.contractType;
        formDataInfo.value["counterpart"] = counterPartSelector.options[counterPartSelector.selectedIndex].label;
      }
      const opSelector: HTMLSelectElement = document.querySelector("#op") as HTMLSelectElement;
      if (opSelector) {
        formData.value["op_release_date"] = opSelector.options[opSelector.selectedIndex].dataset.release;
        formDataInfo.value["operation_program"] = opSelector.options[opSelector.selectedIndex].label;
      }

      const container = document.querySelector("#message_editor");
      const quill = Quill.find(container);
      formData.value["message"] = quill.getText();
      formDataInfo.value["message"] = quill.getText();

      currentStepIndex.value++;

      if (!_stepperObj.value) {
        return;
      }

      _stepperObj.value.goNext();
    });

    const formSubmit = () => {
      formData.value["created_at"] = new Date().toISOString();
      formData.value["creator"] = store.getters.currentUserUrl;
      formData.value["base_op"] =
        formData.value["operation_program"] !== "None" ? formData.value["operation_program"] : "";

      const fileFormData = new FormData();
      Object.keys(formData.value).forEach((key) => {
        if (typeof formData.value[key] !== "object") {
          fileFormData.append(key, formData.value[key]);
        } else fileFormData.append(key, JSON.stringify(formData.value[key]));
      });
      fileList.forEach((file) => {
        const file_raw = file["raw"];
        fileFormData.append("files", file_raw, file["name"]);
      });

      const params = {
        params: fileFormData,
        headers: {
          "content-Type": "multipart/form-data",
        },
      };

      store
        .dispatch(Actions.CREATE_CHANGE_OP_PROCESS, params)
        .then((data) => {
          console.log(data);
          // Create change op requests.
          const changeOPRequestsCreationRequests: Array<Promise<any>> = [];
          formData.value["change_op_requests"].forEach((change_op_request) => {
            const params = {
              title: change_op_request[0],
              reason: change_op_request[1],
              contract_type: formData.value["contract_type"],
              operation_program: formData.value["operation_program"],
              change_op_process: data.url,
            };
            changeOPRequestsCreationRequests.push(
              store.dispatch(Actions.CREATE_CHANGE_OP_REQUEST, {
                params: params,
              })
            );
          });
          Promise.all(changeOPRequestsCreationRequests)
            .then(() => {
              Swal.fire({
                text: translate("createChangeOPRequestSuccess"),
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: translate("confirm"),
                customClass: {
                  confirmButton: "btn fw-bold btn-light-primary",
                },
              })
                .then(() => {
                  hideModal(createAppModalRef.value);
                })
                .then(() => location.reload());
            })
            .catch(() => {
              const errors = store.getters.getChangeOPRequestErrors;
              const parsedErrors = Object.entries(errors).map((key) => {
                return `<b>${translate(key[0])}</b>: ${translate(key[1])}<br><br>`;
              });
              Swal.fire({
                icon: "error",
                html: parsedErrors.join(""),
                buttonsStyling: false,
                confirmButtonText: translate("tryAgain"),
                customClass: {
                  confirmButton: "btn fw-bold btn-light-danger",
                },
              });
            });
        })
        .catch(() => {
          const errors = store.getters.getChangeOPProcessErrors;
          const parsedErrors = Object.entries(errors).map((key) => {
            return `<b>${translate(key[0])}</b>: ${translate(key[1])}<br><br>`;
          });
          Swal.fire({
            icon: "error",
            html: parsedErrors.join(""),
            buttonsStyling: false,
            confirmButtonText: translate("tryAgain"),
            customClass: {
              confirmButton: "btn fw-bold btn-light-danger",
            },
          });
        });
    };

    resetForm({
      values: {
        ...formData.value,
      },
    });

    const handleChange = (file, fileListData) => {
      fileList = fileListData;
      formDataInfo.value["files"] = fileListData;
    };

    const onChangeSelectedChangeOPRequests = (changeOPRequests) => {
      relatedChangeOPRequests = [];
      relatedChangeOPRequestsInfo = [];
      for (let key in changeOPRequests.value) {
        let value = changeOPRequests.value[key];
        const info = `${key}: ${value["title"]}`;
        relatedChangeOPRequestsInfo.push(info);
        relatedChangeOPRequests.push(value["url"]);
      }
    };

    let addedChangeOPRequest: Ref<Array<Array<string>>> = ref([]);
    const mutableSelectedChangeOPRequests = computed(() => {
      return addedChangeOPRequest.value;
    });
    const addChangeOPRequest = () => {
      addedChangeOPRequest.value.push(["", ""]);
    };

    const deleteChangeOPRequest = (e) => {
      addedChangeOPRequest.value.forEach((element, index) => {
        const title: HTMLInputElement = document.getElementById(`changeoprequest` + index) as HTMLInputElement;
        const reason: HTMLSelectElement = document.getElementById(`reason` + index) as HTMLSelectElement;
        if (title && reason) {
          addedChangeOPRequest[index] = [title.value, reason.value];
        }
      });
      addedChangeOPRequest.value.splice(0);
    };
    watch(addedChangeOPRequest, (currentValue, oldValue) => {
      console.log(currentValue);
      console.log(oldValue);
    });

    return {
      handleStep,
      formSubmit,
      previousStep,
      createChangeOPRef,
      currentStepIndex,
      totalSteps,
      createAppModalRef,
      translate,
      handleChange,
      fileList,
      isAdminOrganization,
      OPOptions,
      organizationOptions,
      formData,
      formDataInfo,
      searchChangeOpRequest,
      onChangeSelectedChangeOPRequests,
      relatedChangeOPRequestsInfo,
      addChangeOPRequest,
      mutableSelectedChangeOPRequests,
      reasonOptions,
      deleteChangeOPRequest,
      addedChangeOPRequest,
    };
  },
});
</script>
