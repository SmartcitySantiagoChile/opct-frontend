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
  <div id="modal_create_change_op_process" aria-hidden="true" class="modal fade" tabindex="-1" ref="createAppModalRef">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered modal-xl">
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
                          :title="`${translate('changeOPProcessTitleLabel')}`"
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
                          :file-list="messageData.files"
                          :on-change="handleChange"
                          action=""
                          multiple=""
                          :limit="5"
                        >
                          <el-button size="small" type="primary">{{ translate("attachFiles") }}</el-button>
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
                        <FieldArray name="change_op_requests" v-slot="{ fields, push, remove }">
                          <!--begin::Header-->
                          <div class="card-header border-0 pt-5">
                            <!--begin::Card Title-->
                            <h3 class="card-title align-items-start flex-column">
                              <!--begin::Label-->
                              <label class="required fs-6 fw-bold form-label mb-2">{{
                                translate("changeOPRequests")
                              }}</label>
                              <!--end::Label-->
                              <ErrorMessage
                                class="fv-plugins-message-container invalid-feedback"
                                :name="`change_op_requests`"
                              />
                            </h3>
                            <!--end::Card Title-->
                            <!--begin::Add Button-->
                            <div class="card-toolbar">
                              <button
                                class="btn btn-primary btn-success"
                                type="button"
                                @click="
                                  push({
                                    title: '',
                                    related_routes: [],
                                    related_requests: [],
                                    reason: '',
                                  })
                                "
                              >
                                {{ translate("add") }}
                              </button>
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
                                    <th class="ps-4 rounded-start">{{ translate("title") }}</th>
                                    <th class="ps-4 min-w-125px rounded-start">{{ translate("relatedRoutes") }}</th>
                                    <th class="ps-4 min-w-125px rounded-start">{{ translate("reason") }}</th>
                                    <th class="ps-4 rounded-start"></th>
                                  </tr>
                                </thead>
                                <!--end::Table head-->

                                <!--begin::Table body-->
                                <tbody>
                                  <template v-for="(item, index) in fields" :key="item.key">
                                    <tr>
                                      <td>
                                        <Field
                                          :id="`title_${index}`"
                                          :name="`change_op_requests[${index}].title`"
                                          v-slot="{ value, field }"
                                        >
                                          <el-input
                                            v-bind="field"
                                            :model-value="value"
                                            :validate-event="false"
                                            class="form-control form-control-lg form-control-solid"
                                            :placeholder="translate('title')"
                                          ></el-input>
                                        </Field>
                                        <ErrorMessage
                                          class="fv-plugins-message-container invalid-feedback"
                                          :name="`change_op_requests[${index}].title`"
                                        />
                                      </td>
                                      <td>
                                        <Field
                                          :id="`related_routes_${index}`"
                                          :name="`change_op_requests[${index}].related_routes`"
                                          v-slot="{ value, field }"
                                        >
                                          <el-select
                                            v-bind="field"
                                            :model-value="value"
                                            :validate-event="false"
                                            multiple
                                            filterable
                                            :placeholder="translate('selectPlaceholder')"
                                          >
                                            <el-option
                                              v-for="route in routeDefinitionsOption"
                                              :key="route.value"
                                              :label="route.label"
                                              :value="route.value"
                                            ></el-option>
                                          </el-select>
                                        </Field>
                                        <ErrorMessage
                                          class="fv-plugins-message-container invalid-feedback"
                                          :name="`change_op_requests[${index}].related_routes`"
                                        />
                                      </td>
                                      <td>
                                        <Field
                                          :id="`reason_${index}`"
                                          :name="`change_op_requests[${index}].reason`"
                                          v-slot="{ value, field }"
                                        >
                                          <el-select
                                            v-bind="field"
                                            :model-value="value"
                                            :validate-event="false"
                                            :placeholder="translate('selectPlaceholder')"
                                          >
                                            <el-option
                                              v-for="reason in reasonOptions"
                                              :key="reason.value"
                                              :label="reason.label"
                                              :value="reason.value"
                                            ></el-option>
                                          </el-select>
                                        </Field>
                                        <ErrorMessage
                                          class="fv-plugins-message-container invalid-feedback"
                                          :name="`change_op_requests[${index}].reason`"
                                        />
                                      </td>
                                      <td>
                                        <a
                                          @click="remove(index)"
                                          class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary ml-1"
                                          type="button"
                                        >
                                          <span class="svg-icon svg-icon-2">
                                            <inline-svg src="/media/icons/duotune/general/gen027.svg" />
                                          </span>
                                        </a>
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
                        </FieldArray>
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
                        <!--end::Label-->

                        <!--begin::Row-->
                        <div class="row fv-row">
                          <!--begin::Col-->
                          <Field
                            as="select"
                            ref="counterpart"
                            id="counterpart"
                            name="counterpart"
                            class="form-select form-select-solid select2-hidden-accessible selected"
                          >
                            <option
                              v-for="i in organizationOptions"
                              :key="i.value"
                              :data-contractType="i.contractType"
                              :label="i.label"
                              :value="i.value"
                            ></option>
                          </Field>
                          <ErrorMessage class="fv-plugins-message-container invalid-feedback" name="counterpart" />
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
                          <ErrorMessage
                            class="fv-plugins-message-container invalid-feedback"
                            name="operation_program"
                          />
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
import { computed, defineComponent, onMounted, ref } from "vue";
import { StepperComponent } from "@/assets/ts/components/_StepperComponent";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import { ErrorMessage, Field, useForm, FieldArray } from "vee-validate";
import * as Yup from "yup";
import { hideModal } from "@/core/helpers/dom";
import { useI18n } from "vue-i18n";
import { Actions } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import Quill from "quill/dist/quill.js";
import {
  ChangeOPRequest,
  MessageData,
  OperationProgramOption,
  OrganizationOption,
  SelectOption,
} from "@/typings/globals";

interface Step1Form {
  title: string;
}

interface Step2Form {
  change_op_requests: Array<ChangeOPRequest>;
}

interface Step3Form {
  counterpart: string;
}

interface Step4Form {
  operation_program: string | undefined;
}

interface Step2FormPresentation {
  change_op_requests: Array<Array<string>>;
}

interface ChangeOPProcessPresentationForm extends Step1Form, Step2FormPresentation, Step3Form, Step4Form {}

export default defineComponent({
  name: "ChangeOPProcessCreate",
  components: {
    Field,
    FieldArray,
    ErrorMessage,
  },
  props: {
    widgetClasses: String,
  },
  emits: ["change-op-process-created"],
  setup: function (props, { emit }) {
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
    const isAdminOrganization = computed(() => store.getters.hasChangeStatusOption);

    const formData = ref<Step1Form | Step2Form | Step3Form | Step4Form>({
      title: "",
      change_op_requests: [],
      counterpart: "",
      operation_program: "",
    });

    const formDataInfo = ref<ChangeOPProcessPresentationForm>({
      title: "",
      change_op_requests: [],
      counterpart: "",
      operation_program: "",
    });

    const messageData = ref<MessageData>({
      message: "",
      files: [],
    });

    /********************************************************************
     // Call actions to get selectors data.
     //*******************************************************************/
    store.dispatch(Actions.GET_CHANGE_OP_REQUEST_REASONS);
    store.dispatch(Actions.GET_ORGANIZATIONS);
    store.dispatch(Actions.GET_OPERATION_PROGRAMS);
    store.dispatch(Actions.GET_ROUTE_DEFINITIONS);

    const reasonOptions = computed(() => {
      const reasons: Array<Array<string>> = store.getters.getChangeOPRequestReason;
      if (reasons.length) {
        return reasons.map((v) => ({ value: v[0], label: v[1] }));
      }
      return [];
    });

    const OPOptions = computed(() => {
      const operationPrograms = store.getters.getCurrentOperationPrograms;
      let options: Array<OperationProgramOption> = [];
      if (operationPrograms.length && store.getters.hasChangeStatusOption) {
        operationPrograms.forEach((operationProgram) => {
          options.push({
            value: operationProgram.url,
            label: operationProgram.start_at + " (" + operationProgram.op_type.name + ")",
            release: operationProgram.start_at,
          });
        });
      }
      options.push({ value: "withoutOP", label: translate("withoutOP"), release: "" });
      return options;
    });

    const organizationOptions = computed(() => {
      const organizations = store.getters.getAllOrganizations;
      const currentUser = store.getters.currentUser;
      let options: Array<OrganizationOption> = [];
      if (store.getters.hasChangeStatusOption) {
        organizations.forEach((organization) => {
          if (organization.url !== currentUser.organization.url) {
            options.push({
              value: organization.url,
              label: organization.name,
              contractType: organization.contract_type.url,
            });
          }
        });
      } else {
        organizations.some((organization) => {
          if (organization.url === currentUser.organization.default_counterpart) {
            options.push({
              value: organization.url,
              label: organization.name,
              contractType: organization.contract_type.url,
            });
            return true;
          }
        });
      }
      return options;
    });

    const routeDefinitionsOption = computed(() => {
      const routeDefinitions = store.getters.getAllRouteDefinitions;
      let options: Array<SelectOption> = [];
      routeDefinitions.forEach((routeDefinition) => {
        options.push({ value: routeDefinition.auth_route_code, label: routeDefinition.auth_route_code });
      });
      return options;
    });

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
      Yup.object({
        change_op_requests: Yup.array(
          Yup.object().shape({
            title: Yup.string().required(translate("titleRequired")),
            related_routes: Yup.array().of(Yup.string()),
            //related_requests: Yup.array().of(Yup.string()).ensure(),
            reason: Yup.string().required(translate("reasonRequired")),
          })
        )
          .required(translate("changeOPRequestRequired"))
          .min(1, translate("changeOPRequestRequired"))
          .label("changeOPRequest"),
      }),
      Yup.object({
        counterpart: Yup.string().required(translate("counterpartRequired")).label("Counterpart"),
      }),
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

    const { handleSubmit } = useForm<Step1Form | Step2Form | Step3Form | Step4Form>({
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
      formData.value = values;

      formDataInfo.value["title"] = formData.value["title"];
      formDataInfo.value["change_op_requests"] = [];
      if (formData.value["change_op_requests"]) {
        formData.value["change_op_requests"].forEach((changeOPRequest) => {
          let reasonLabel: string | undefined = reasonOptions?.value?.find(
            (el) => el.value === changeOPRequest.reason
          )?.label;
          reasonLabel = reasonLabel === undefined ? "" : reasonLabel;
          formDataInfo.value["change_op_requests"].push([
            changeOPRequest.title,
            `(${changeOPRequest.related_routes.join(", ")})`,
            reasonLabel,
          ]);
        });
      }

      if (formData.value["counterpart"]) {
        let counterpartLabel: string | undefined = organizationOptions?.value?.find(
          (el) => el.value === formData.value["counterpart"]
        )?.label;
        formDataInfo.value["counterpart"] = counterpartLabel ? counterpartLabel : "";
      }

      if (formData.value["operation_program"]) {
        let operationProgramLabel: string | undefined = OPOptions?.value?.find(
          (el) => el.value === formData.value["operation_program"]
        )?.label;
        formDataInfo.value["operation_program"] = operationProgramLabel ? operationProgramLabel : "";
      }

      const container: HTMLSelectElement = document.querySelector("#message_editor") as HTMLSelectElement;
      const quill = Quill.find(container);
      let quillContent: string = quill.getText();
      if (quillContent === "\n") {
        quillContent = "";
      }
      messageData.value.message = quillContent;
      formDataInfo.value["message"] = quillContent;

      currentStepIndex.value++;

      if (!_stepperObj.value) {
        return;
      }

      _stepperObj.value.goNext();
    });

    const formSubmit = () => {
      if (formData.value["operation_program"] === "withoutOP") {
        delete formData.value["operation_program"];
      }

      const messageFormData = new FormData();
      messageFormData.append("message", messageData.value.message);
      messageData.value.files.forEach((file) => {
        const file_raw = file["raw"];
        messageFormData.append("files", file_raw, file["name"]);
      });

      const messageParams = {
        resource: null,
        payload: {
          params: messageFormData,
          headers: {
            "content-Type": "multipart/form-data",
          },
        },
      };

      const processErrorResponse = (response) => {
        console.log(response);
        const errors = response.data;
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
      };

      const processSucessResponse = () => {
        Swal.fire({
          text: translate("createChangeOPRequestSuccess"),
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          hideModal(createAppModalRef.value);
          emit("change-op-process-created");
        });
      };

      store
        .dispatch(Actions.CHANGE_OP_PROCESSES.CREATE, formData.value)
        .then((data) => {
          if (messageData.value.message === "" && messageData.value.files.length === 0) {
            processSucessResponse();
          } else {
            messageParams.resource = data.id;
            let related_requests_to_send: Array<string> = [];
            data.change_op_requests.forEach((el) => {
              related_requests_to_send.push(el.id.toString());
            });
            messageParams.payload.params.append("related_requests", JSON.stringify(related_requests_to_send));

            store
              .dispatch(Actions.CHANGE_OP_PROCESSES.ADD_MESSAGE, messageParams)
              .then(() => {
                processSucessResponse();
              })
              .catch((response) => {
                processErrorResponse(response);
              });
          }
        })
        .catch((response) => {
          processErrorResponse(response);
        });
    };

    const handleChange = (file, fileListData) => {
      messageData.value.files = fileListData;
      formDataInfo.value["files"] = fileListData;
    };

    return {
      handleStep,
      formSubmit,
      previousStep,
      createChangeOPRef,
      createAppModalRef,
      currentStepIndex,
      totalSteps,
      translate,
      handleChange,
      messageData,
      isAdminOrganization,
      OPOptions,
      organizationOptions,
      routeDefinitionsOption,
      formData,
      formDataInfo,
      reasonOptions,
    };
  },
});
</script>
