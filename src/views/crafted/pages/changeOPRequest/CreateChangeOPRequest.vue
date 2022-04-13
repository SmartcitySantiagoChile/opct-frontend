<template>
  <!--begin::Modal - Create Change OP Request-->
  <span class="card-label fw-bolder fs-3 me-3">
    <a
        id="kt_toolbar_primary_button"
        class="btn btn-success"
        data-bs-target="#modal_create_change_op_request"
        data-bs-toggle="modal"
        href="#"
    >
      {{ translate("createChangeOPRequest") }}
    </a>
  </span>
  <div
      id="modal_create_change_op_request"
      ref="createChangeOPRequestModalRef"
      aria-hidden="true"
      class="modal fade"
      tabindex="-1"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-900px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header">
          <!--begin::Modal title-->
          <h2>{{ translate("createChangeOPRequest") }}</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
              class="btn btn-sm btn-icon btn-active-color-primary"
              data-bs-dismiss="modal"
          >
            <span class="svg-icon svg-icon-1">
              <inline-svg src="/media/icons/duotune/arrows/arr061.svg"/>
            </span>
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->

        <!--begin::Modal body-->
        <div class="modal-body py-lg-10 px-lg-10">
          <!--begin::Stepper-->
          <div
              id="modal_create_change_op_request_stepper"
              ref="createChangeOPRef"
              class="
              stepper stepper-pills stepper-column
              d-flex
              flex-column flex-xl-row flex-row-fluid
            "
          >
            <!--begin::Aside-->
            <div
                class="
                d-flex
                justify-content-center justify-content-xl-start
                flex-row-auto
                w-100 w-xl-300px
              "
            >
              <!--begin::Nav-->
              <div class="stepper-nav ps-lg-10">
                <!--begin::Step 1-->
                <div class="stepper-item current" data-kt-stepper-element="nav">
                  <!--begin::Line-->
                  <div class="stepper-line w-40px"></div>
                  <!--end::Line-->

                  <!--begin::Icon-->
                  <div class="stepper-icon w-40px h-40px">
                    <i class="stepper-check fas fa-check"></i>
                    <span class="stepper-number">1</span>
                  </div>
                  <!--end::Icon-->

                  <!--begin::Label-->
                  <div class="stepper-label">
                    <h3 class="stepper-title">
                      {{ translate("initialInformation") }}
                    </h3>

                    <div class="stepper-desc">
                      {{ translate("requestDetailInfo") }}
                    </div>
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
                    <i class="stepper-check fas fa-check"></i>
                    <span class="stepper-number">2</span>
                  </div>
                  <!--end::Icon-->

                  <!--begin::Label-->
                  <div class="stepper-label">
                    <h3 class="stepper-title">
                      {{ translate("counterpart") }}
                    </h3>

                    <div class="stepper-desc">
                      {{ translate("counterPartInfo") }}
                    </div>
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
                    <i class="stepper-check fas fa-check"></i>
                    <span class="stepper-number">3</span>
                  </div>
                  <!--end::Icon-->

                  <!--begin::Label-->
                  <div class="stepper-label">
                    <h3 class="stepper-title">
                      {{ translate("operationProgram") }}
                    </h3>

                    <div class="stepper-desc">
                      {{ translate("operationProgramInfo") }}
                    </div>
                  </div>
                  <!--end::Label-->
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
                    <h3 class="stepper-title">
                      {{ translate("confirmation") }}
                    </h3>

                    <div class="stepper-desc">
                      {{ translate("confirmationInfo") }}
                    </div>
                  </div>
                  <!--end::Label-->
                </div>
                <!--end::Step 4-->
              </div>
              <!--end::Nav-->
            </div>
            <!--begin::Aside-->

            <!--begin::Content-->
            <div class="flex-row-fluid py-lg-5 px-lg-15">
              <!--begin::Form-->
              <form
                  id="modal_create_change_op_request_form"
                  class="form"
                  novalidate="novalidate"
                  @submit="handleStep"
              >
                <!--begin::Step 1-->
                <div class="current" data-kt-stepper-element="content">
                  <div class="w-100">
                    <!--begin::Input group-->
                    <div class="fv-row mb-10">
                      <!--begin::Label-->
                      <label
                          class="d-flex align-items-center fs-5 fw-bold mb-2"
                      >
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
                      />
                      <ErrorMessage
                          class="fv-plugins-message-container invalid-feedback"
                          name="title"
                      />
                      <!--end::Input-->
                    </div>
                    <!--end::Input group-->

                    <!--begin::Input group-->
                    <div class="row mb-10">
                      <!--begin::Col-->
                      <div class="col-md-8 fv-row">
                        <!--begin::Label-->
                        <label class="required fs-6 fw-bold form-label mb-2">{{
                            translate("reason")
                          }}</label>
                        <!--end::Label-->

                        <!--begin::Row-->
                        <div class="row fv-row">
                          <!--begin::Col-->
                          <Field
                              id="reason"
                              as="select"
                              class="
                              form-select form-select-solid
                              select2-hidden-accessible
                            "
                              name="reason"
                          >
                            <option
                                v-for="i in reasonOptions"
                                :key="i.value"
                                :label="i.label"
                                :value="i.value"
                            ></option>
                          </Field>
                          <ErrorMessage
                              class="
                              fv-plugins-message-container
                              invalid-feedback
                            "
                              name="reason"
                          />
                          <!--end::Col-->
                        </div>
                        <!--end::Row-->
                      </div>
                      <!--end::Col-->
                    </div>
                    <!--end::Input group-->

                    <!--begin::Input group-->
                    <div class="fv-row mb-10">
                      <form
                          id="message_form"
                          class="ql-quil ql-quil-plain pb-3"
                      >
                        <!--begin::Editor-->
                        <div id="message_editor" class="py-6"></div>
                        <!--end::Editor-->
                        <!--begin::Toolbar-->
                        <div
                            id="message_toolbar"
                            class="ql-toolbar d-flex flex-stack py-2"
                        ></div>
                        <el-upload
                            :auto-upload="false"
                            :file-list="fileList"
                            :on-change="handleChange"
                            action=""
                        >
                          <el-button size="small" type="primary"
                          >{{ translate("attachFiles") }}
                          </el-button>
                        </el-upload>
                        <!--end::Toolbar-->
                        <div class="separator"></div>
                        <!--end::Input group-->
                      </form>
                    </div>

                    <!--begin::Input group-->
                    <template v-if="isAdminOrganization">
                      <div class="row mb-10">
                        <!--begin::Col-->
                        <div class="col-md-8 fv-row">
                          <!--begin::Row-->
                          <div class="row fv-row">
                            <!--begin::Col-->
                            <div class="col-md-8 fv-row">
                              <a
                                  class="btn btn-bg-light btn-active-color-primary"
                                  data-bs-target="#selectChangeOPRequest"
                                  data-bs-toggle="modal"
                                  type="button"
                              >
                                {{ translate("assignChangeOPRequests") }}
                              </a>
                            </div>
                            <!--end::Col-->
                          </div>
                          <!--end::Row-->
                        </div>
                        <!--end::Col-->
                      </div>
                    </template>
                    <!--end::Input group-->
                  </div>
                </div>
                <!--end::Step 1-->

                <!--begin::Step 2-->
                <div data-kt-stepper-element="content">
                  <div class="w-100">
                    <!--begin::Input group-->
                    <div class="row mb-10">
                      <!--begin::Col-->
                      <div class="col-md-8 fv-row">
                        <!--begin::Label-->
                        <label class="required fs-6 fw-bold form-label mb-2">{{
                            translate("counterpart")
                          }}</label>
                        <!--end::Label-->

                        <!--begin::Row-->
                        <div class="row fv-row">
                          <!--begin::Col-->
                          <select
                              id="counterpart"
                              class="
                              form-select form-select-solid
                              select2-hidden-accessible
                              selected
                            "
                          >
                            <template v-if="isAdminOrganization">
                              <option
                                  v-for="i in organizationsOptions"
                                  :key="i.value"
                                  :data-contracttype="i.contracttype"
                                  :label="i.label"
                                  :value="i.value"
                              ></option>
                            </template>
                            <template v-else>
                              <option
                                  :key="adminOrganizationOption.value"
                                  :data-contracttype="
                                  adminOrganizationOption.contracttype
                                "
                                  :label="adminOrganizationOption.label"
                                  :value="adminOrganizationOption.value"
                                  disabled
                                  selected
                              ></option>
                            </template>
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
                <!--end::Step 2-->

                <!--begin::Step 3-->
                <div data-kt-stepper-element="content">
                  <div class="w-100">
                    <!--begin::Input group-->
                    <div class="row mb-10">
                      <!--begin::Col-->
                      <div class="col-md-8 fv-row">
                        <!--begin::Label-->
                        <label class="required fs-6 fw-bold form-label mb-2">{{
                            translate("operationProgram")
                          }}</label>
                        <!--end::Label-->

                        <!--begin::Row-->
                        <div class="row fv-row">
                          <!--begin::Col-->
                          <Field
                              id="op"
                              as="select"
                              class="
                              form-select form-select-solid
                              select2-hidden-accessible
                            "
                              name="op"
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
                <!--end::Step 3-->

                <!--begin::Step 4-->
                <div data-kt-stepper-element="content">
                  <div class="w-100 text-center">
                    <!--begin::Heading-->
                    <h1 class="fw-bolder text-dark mb-3">
                      {{ translate("confirmData") }}
                    </h1>
                    <!--end::Heading-->

                    <!--begin::Description-->
                    <table
                        class="
                        table
                        align-middle
                        table-rounded table-striped
                        border
                      "
                    >
                      <tbody>
                      <template
                          v-for="(item, index) in formDataInfo"
                          :key="index"
                      >
                        <tr>
                          <th>
                            <b>{{ translate(index) }}</b>
                          </th>
                          <th>
                            <template v-if="index === 'files' ">
                              <template
                                  v-for="(subitem, subindex) in item"
                                  :key="subindex"
                              >
                                {{ subitem.name }}<br/>
                              </template>
                            </template>
                            <template v-else-if="index === 'relatedChangeOPRequests'">
                              <template
                                  v-for="(subitem, subindex) in item"
                                  :key="subindex"
                              >
                                {{ subitem }}<br/>
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

                    <!--begin::Illustration-->
                    <div class="text-center px-4 py-15">
                      <img
                          alt=""
                          class="w-100 mh-300px"
                          src="/media/illustrations/sketchy-1/9.png"
                      />
                    </div>
                    <!--end::Illustration-->
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
                        <inline-svg
                            src="/media/icons/duotune/arrows/arr063.svg"
                        />
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
                          <inline-svg
                              src="/media/icons/duotune/arrows/arr064.svg"
                          />
                        </span>
                      </span>
                      <span class="indicator-progress">
                        {{ translate("pleaseWait") }}
                        <span
                            class="
                            spinner-border spinner-border-sm
                            align-middle
                            ms-2
                          "
                        ></span>
                      </span>
                    </button>

                    <button v-else class="btn btn-lg btn-primary" type="submit">
                      {{ translate("continue") }}
                      <span class="svg-icon svg-icon-3 ms-1 me-0">
                        <inline-svg
                            src="/media/icons/duotune/arrows/arr064.svg"
                        />
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
  <ChangeOPRequestsInputTable @onChangeSelectedChangeOPRequests="onChangeSelectedChangeOPRequests">
  </ChangeOPRequestsInputTable>
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
import {computed, defineComponent, onMounted, ref} from "vue";
import {StepperComponent} from "@/assets/ts/components/_StepperComponent";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import {ErrorMessage, Field, useForm} from "vee-validate";
import * as Yup from "yup";
import {hideModal} from "@/core/helpers/dom";
import {useI18n} from "vue-i18n";
import {Actions} from "@/store/enums/StoreEnums";
import {useStore} from "vuex";
import Quill from "quill/dist/quill.js";
import ChangeOPRequestsInputTable from "@/components/widgets/tables/ChangeOPRequestsInputTable.vue";

interface Step1 {
  title: string;
  reason: string;
}

interface Step2 {
  counterpart: string;
}

interface Step3 {
  op: string;
}

interface KTCreateApp extends Step1, Step2, Step3 {
}

export default defineComponent({
  name: "CreateChangeOpRequest",
  components: {
    Field,
    ErrorMessage,
    ChangeOPRequestsInputTable,
  },
  setup: function () {
    const _stepperObj = ref<StepperComponent | null>(null);
    const createChangeOPRef = ref<HTMLElement | null>(null);
    const createAppModalRef = ref<HTMLElement | null>(null);
    const currentStepIndex = ref(0);
    const {t, te} = useI18n();
    const translate = (text) => (te(text) ? t(text) : text);
    const store = useStore();
    const isAdminOrganization = computed(
        () => store.getters.hasChangeStatusOption
    );
    let fileList = [];
    let relatedChangeOPRequests: Array<string> = [];
    let relatedChangeOPRequestsInfo: Array<string> = [];
    store.dispatch(Actions.GET_CHANGE_OP_REQUEST_REASONS);
    store.dispatch(Actions.GET_ORGANIZATIONS);
    store.dispatch(Actions.GET_OPERATION_PROGRAMS);

    const reasonOptions = computed(() => {
      let options: Array<any> = [];
      const reasons: Array<Array<string>> =
          store.getters.getChangeOPRequestReason;
      if (reasons.length) {
        reasons.forEach((v) => {
          const option: string = v[1];
          options.push({
            value: option,
            label: option,
          });
        });
      }
      return options;
    });

    const OPOptions = computed(() => {
      const operationPrograms = store.getters.getCurrentOperationPrograms;
      let options: Array<any> = [];

      if (operationPrograms.length && store.getters.hasChangeStatusOption) {
        operationPrograms.forEach((operationProgram) => {
          options.push({
            value: operationProgram.url,
            label:
                operationProgram.start_at +
                " (" +
                operationProgram.op_type.name +
                ")",
            release: operationProgram.start_at,
          });
        });
      }
      options.push({value: "None", label: translate("withoutOP"), release: ""});
      return options;
    });

    const organizationsOptions = computed(() => {
      const organizations = store.getters.getAllOrganizations;
      const currentOrganizationName = store.getters.getOrganizationName;
      let options: Array<any> = [];
      if (store.getters.hasChangeStatusOption) {
        organizations.forEach((organization) => {
          if (organization.name !== currentOrganizationName) {
            options.push({
              value: organization.url,
              label: organization.name,
              contracttype: organization.contract_type.url,
            });
          }
        });
      } else {
        options = organizations.flatMap((organization) =>
            organization.name === "DTPM"
                ? [
                  {
                    value: organization.url,
                    label: organization.name,
                    contracttype: organization.contract_type.url,
                  },
                ]
                : []
        );
      }
      return options;
    });
    const adminOrganizationOption = computed(() => {
      let option = {};
      const organizations = store.getters.getAllOrganizations;
      if (!store.getters.hasChangeStatusOption && organizations) {
        organizations.forEach((organization) => {
          if (organization.name === "DTPM") {
            option = {
              value: organization.url,
              label: organization.name,
              contracttype: organization.contract_type.url,
            };
          }
        });
      }
      return option;
    });

    const searchChangeOpRequest = (filter) => {
      if (filter.length > 3 && filter.length < 11) {
        store.dispatch(Actions.GET_CHANGE_OP_REQUESTS_WITH_PARAMS, {
          search: filter,
        });
      }
    };

    const formData = ref<KTCreateApp>({
      title: "",
      reason: "1",
      counterpart: "1",
      op: "",
    });

    const formDataInfo = ref<KTCreateApp>({
      title: "",
      reason: "1",
      counterpart: "1",
      op: "",
    });

    onMounted(() => {
      _stepperObj.value = StepperComponent.createInsance(
          createChangeOPRef.value as HTMLElement
      );
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

    const createAppSchema = [
      Yup.object({
        title: Yup.string().required(translate("titleRequired")).label("Title"),
        reason: Yup.string()
            .required(translate("reasonRequired"))
            .label("Reason"),
      }),
      Yup.object({
        counterpart: Yup.string().required().label("counterpart"),
      }),
      Yup.object({
        op: Yup.string().required().label("OperationProgram"),
      }),
    ];

    // extracts the individual step schema
    const currentSchema = computed(() => {
      return createAppSchema[currentStepIndex.value];
    });

    const totalSteps = computed(() => {
      if (!_stepperObj.value) {
        return;
      }

      return _stepperObj.value.totatStepsNumber;
    });

    const {resetForm, handleSubmit} = useForm<Step1 | Step2 | Step3>({
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
      formData.value = {
        ...formData.value,
        ...values,
      };

      formDataInfo.value["title"] = formData.value["title"];
      formDataInfo.value["relatedChangeOPRequests"] = relatedChangeOPRequestsInfo;
      const reasonSelector: HTMLSelectElement = document.querySelector(
          "#reason"
      ) as HTMLSelectElement;
      if (reasonSelector) {
        formDataInfo.value["reason"] =
            reasonSelector.options[reasonSelector.selectedIndex].label;
      }

      const counterPartSelector: HTMLSelectElement = document.querySelector(
          "#counterpart"
      ) as HTMLSelectElement;
      if (counterPartSelector) {
        formData.value["counterpart"] = counterPartSelector.value;
        formData.value["contract_type"] =
            counterPartSelector.options[
                counterPartSelector.selectedIndex
                ].dataset.contracttype;
        formDataInfo.value["counterpart"] =
            counterPartSelector.options[counterPartSelector.selectedIndex].label;
      }
      const opSelector: HTMLSelectElement = document.querySelector(
          "#op"
      ) as HTMLSelectElement;
      if (opSelector) {
        formData.value["op_release_date"] =
            opSelector.options[opSelector.selectedIndex].dataset.release;
        formDataInfo.value["op"] =
            opSelector.options[opSelector.selectedIndex].label;
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
      formData.value["op"] =
          formData.value["op"] !== "None" ? formData.value["op"] : "";

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

      if (relatedChangeOPRequests) {
        relatedChangeOPRequests.forEach((url) => {
          fileFormData.append("related_requests", url)
        })
      } else {
        fileFormData.append("related_requests", "");
      }
      const params = {
        params: fileFormData,
        headers: {
          "content-Type": "multipart/form-data",
        },
      };

      store
          .dispatch(Actions.CREATE_CHANGE_OP_REQUEST, params)
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
    }
    return {
      handleStep,
      formSubmit,
      previousStep,
      createChangeOPRef,
      currentStepIndex,
      totalSteps,
      createAppModalRef,
      reasonOptions,
      translate,
      handleChange,
      fileList,
      isAdminOrganization,
      OPOptions,
      organizationsOptions,
      adminOrganizationOption,
      formData,
      formDataInfo,
      searchChangeOpRequest,
      onChangeSelectedChangeOPRequests,
      relatedChangeOPRequestsInfo
    };
  },
});
</script>
