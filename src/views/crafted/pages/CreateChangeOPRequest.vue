<template>
  <!--begin::Modal - Create Change OP REquest-->
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
                    <i class="stepper-check fas fa-check"></i>
                    <span class="stepper-number">2</span>
                  </div>
                  <!--end::Icon-->

                  <!--begin::Label-->
                  <div class="stepper-label">
                    <h3 class="stepper-title">{{ translate("counterpart") }}</h3>

                    <div class="stepper-desc">{{ translate("counterPartInfo") }}</div>
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
                    <h3 class="stepper-title">{{ translate("operationProgram") }}</h3>

                    <div class="stepper-desc">{{ translate("operationProgramInfo") }}</div>
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
                    <h3 class="stepper-title">{{ translate("confirmation") }}</h3>

                    <div class="stepper-desc">{{ translate("confirmationInfo") }}</div>
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
                    <i class="stepper-check fas fa-check"></i>
                    <span class="stepper-number">5</span>
                  </div>
                  <!--end::Icon-->

                  <!--begin::Label-->
                  <div class="stepper-label">
                    <h3 class="stepper-title">Release</h3>

                    <div class="stepper-desc">Review and Submit</div>
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
                        <label class="required fs-6 fw-bold form-label mb-2"
                        >{{ translate("reason") }}</label
                        >
                        <!--end::Label-->

                        <!--begin::Row-->
                        <div class="row fv-row">
                          <!--begin::Col-->
                          <Field
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
                      <form id="message_form" class="ql-quil ql-quil-plain pb-3">
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
                            <el-button size="small" type="primary">{{
                                translate("attachFiles")
                              }}
                            </el-button>
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
                    <div class="fv-row">
                      <!--begin::Label-->
                      <label
                          class="d-flex align-items-center fs-5 fw-bold mb-4"
                      >
                        <span class="required">Select Framework</span>
                        <i
                            class="fas fa-exclamation-circle ms-2 fs-7"
                            data-bs-toggle="tooltip"
                            title="Specify your apps framework"
                        ></i>
                      </label>
                      <!--end::Label-->

                      <!--begin:Option-->
                      <label class="d-flex flex-stack cursor-pointer mb-5">
                        <!--begin:Label-->
                        <span class="d-flex align-items-center me-2">
                          <!--begin:Icon-->
                          <span class="symbol symbol-50px me-6">
                            <span class="symbol-label bg-light-warning">
                              <i class="fab fa-html5 text-warning fs-2x"></i>
                            </span>
                          </span>
                          <!--end:Icon-->

                          <!--begin:Info-->
                          <span class="d-flex flex-column">
                            <span class="fw-bolder fs-6">HTML5</span>

                            <span class="fs-7 text-muted">Base Web Projec</span>
                          </span>
                          <!--end:Info-->
                        </span>
                        <!--end:Label-->

                        <!--begin:Input-->
                        <span
                            class="form-check form-check-custom form-check-solid"
                        >
                          <Field
                              checked
                              class="form-check-input"
                              name="framework"
                              type="radio"
                              value="1"
                          />
                        </span>
                        <!--end:Input-->
                      </label>
                      <!--end::Option-->

                      <!--begin:Option-->
                      <label class="d-flex flex-stack cursor-pointer mb-5">
                        <!--begin:Label-->
                        <span class="d-flex align-items-center me-2">
                          <!--begin:Icon-->
                          <span class="symbol symbol-50px me-6">
                            <span class="symbol-label bg-light-success">
                              <i class="fab fa-react text-success fs-2x"></i>
                            </span>
                          </span>
                          <!--end:Icon-->

                          <!--begin:Info-->
                          <span class="d-flex flex-column">
                            <span class="fw-bolder fs-6">ReactJS</span>
                            <span class="fs-7 text-muted"
                            >Robust and flexible app framework</span
                            >
                          </span>
                          <!--end:Info-->
                        </span>
                        <!--end:Label-->

                        <!--begin:Input-->
                        <span
                            class="form-check form-check-custom form-check-solid"
                        >
                          <input
                              class="form-check-input"
                              name="framework"
                              type="radio"
                              value="2"
                          />
                        </span>
                        <!--end:Input-->
                      </label>
                      <!--end::Option-->

                      <!--begin:Option-->
                      <label class="d-flex flex-stack cursor-pointer mb-5">
                        <!--begin:Label-->
                        <span class="d-flex align-items-center me-2">
                          <!--begin:Icon-->
                          <span class="symbol symbol-50px me-6">
                            <span class="symbol-label bg-light-danger">
                              <i class="fab fa-angular text-danger fs-2x"></i>
                            </span>
                          </span>
                          <!--end:Icon-->

                          <!--begin:Info-->
                          <span class="d-flex flex-column">
                            <span class="fw-bolder fs-6">Angular</span>
                            <span class="fs-7 text-muted"
                            >Powerful data mangement</span
                            >
                          </span>
                          <!--end:Info-->
                        </span>
                        <!--end:Label-->

                        <!--begin:Input-->
                        <span
                            class="form-check form-check-custom form-check-solid"
                        >
                          <Field
                              class="form-check-input"
                              name="framework"
                              type="radio"
                              value="3"
                          />
                        </span>
                        <!--end:Input-->
                      </label>
                      <!--end::Option-->

                      <!--begin:Option-->
                      <label class="d-flex flex-stack cursor-pointer">
                        <!--begin:Label-->
                        <span class="d-flex align-items-center me-2">
                          <!--begin:Icon-->
                          <span class="symbol symbol-50px me-6">
                            <span class="symbol-label bg-light-primary">
                              <i class="fab fa-vuejs text-primary fs-2x"></i>
                            </span>
                          </span>
                          <!--end:Icon-->

                          <!--begin:Info-->
                          <span class="d-flex flex-column">
                            <span class="fw-bolder fs-6">Vue</span>
                            <span class="fs-7 text-muted"
                            >Lightweight and responsive framework</span
                            >
                          </span>
                          <!--end:Info-->
                        </span>
                        <!--end:Label-->

                        <!--begin:Input-->
                        <span
                            class="form-check form-check-custom form-check-solid"
                        >
                          <Field
                              class="form-check-input"
                              name="framework"
                              type="radio"
                              value="4"
                          />
                        </span>
                        <!--end:Input-->
                      </label>
                      <!--end::Option-->

                      <ErrorMessage
                          class="fv-plugins-message-container invalid-feedback"
                          name="framework"
                      />
                    </div>
                    <!--end::Input group-->
                  </div>
                </div>
                <!--end::Step 2-->

                <!--begin::Step 3-->
                <div data-kt-stepper-element="content">
                  <div class="w-100">
                    <!--begin::Input group-->
                    <div class="fv-row mb-10">
                      <!--begin::Label-->
                      <label class="required fs-5 fw-bold mb-2">
                        Database Name
                      </label>
                      <!--end::Label-->

                      <!--begin::Input-->
                      <Field
                          class="form-control form-control-lg form-control-solid"
                          name="dbName"
                          placeholder=""
                          type="text"
                      />
                      <ErrorMessage
                          class="fv-plugins-message-container invalid-feedback"
                          name="dbName"
                      />
                      <!--end::Input-->
                    </div>
                    <!--end::Input group-->

                    <!--begin::Input group-->
                    <div class="fv-row">
                      <!--begin::Label-->
                      <label
                          class="d-flex align-items-center fs-5 fw-bold mb-4"
                      >
                        <span class="required">Select Database Engine</span>

                        <i
                            class="fas fa-exclamation-circle ms-2 fs-7"
                            data-bs-toggle="tooltip"
                            title="Select your app database engine"
                        ></i>
                      </label>
                      <!--end::Label-->

                      <!--begin:Option-->
                      <label class="d-flex flex-stack cursor-pointer mb-5">
                        <!--begin::Label-->
                        <span class="d-flex align-items-center me-2">
                          <!--begin::Icon-->
                          <span class="symbol symbol-50px me-6">
                            <span class="symbol-label bg-light-success">
                              <i class="fas fa-database text-success fs-2x"></i>
                            </span>
                          </span>
                          <!--end::Icon-->

                          <!--begin::Info-->
                          <span class="d-flex flex-column">
                            <span class="fw-bolder fs-6">MySQL</span>

                            <span class="fs-7 text-muted"
                            >Basic MySQL database</span
                            >
                          </span>
                          <!--end::Info-->
                        </span>
                        <!--end::Label-->

                        <!--begin::Input-->
                        <span
                            class="form-check form-check-custom form-check-solid"
                        >
                          <Field
                              class="form-check-input"
                              name="dbType"
                              type="radio"
                              value="1"
                          />
                        </span>
                        <!--end::Input-->
                      </label>
                      <!--end::Option-->

                      <!--begin:Option-->
                      <label class="d-flex flex-stack cursor-pointer mb-5">
                        <!--begin::Label-->
                        <span class="d-flex align-items-center me-2">
                          <!--begin::Icon-->
                          <span class="symbol symbol-50px me-6">
                            <span class="symbol-label bg-light-danger">
                              <i class="fab fa-google text-danger fs-2x"></i>
                            </span>
                          </span>
                          <!--end::Icon-->

                          <!--begin::Info-->
                          <span class="d-flex flex-column">
                            <span class="fw-bolder fs-6">Firebase</span>

                            <span class="fs-7 text-muted"
                            >Google based app data management</span
                            >
                          </span>
                          <!--end::Info-->
                        </span>
                        <!--end::Label-->

                        <!--begin::Input-->
                        <span
                            class="form-check form-check-custom form-check-solid"
                        >
                          <Field
                              class="form-check-input"
                              name="dbType"
                              type="radio"
                              value="2"
                          />
                        </span>
                        <!--end::Input-->
                      </label>
                      <!--end::Option-->

                      <!--begin:Option-->
                      <label class="d-flex flex-stack cursor-pointer">
                        <!--begin::Label-->
                        <span class="d-flex align-items-center me-2">
                          <!--begin::Icon-->
                          <span class="symbol symbol-50px me-6">
                            <span class="symbol-label bg-light-warning">
                              <i class="fab fa-amazon text-warning fs-2x"></i>
                            </span>
                          </span>
                          <!--end::Icon-->

                          <!--begin::Info-->
                          <span class="d-flex flex-column">
                            <span class="fw-bolder fs-6">DynamoDB</span>

                            <span class="fs-7 text-muted"
                            >Amazon Fast NoSQL Database</span
                            >
                          </span>
                          <!--end::Info-->
                        </span>
                        <!--end::Label-->

                        <!--begin::Input-->
                        <span
                            class="form-check form-check-custom form-check-solid"
                        >
                          <Field
                              class="form-check-input"
                              name="dbType"
                              type="radio"
                              value="3"
                          />
                        </span>
                        <!--end::Input-->
                      </label>
                      <!--end::Option-->

                      <ErrorMessage
                          class="fv-plugins-message-container invalid-feedback"
                          name="dbType"
                      />
                    </div>
                    <!--end::Input group-->
                  </div>
                </div>
                <!--end::Step 3-->

                <!--begin::Step 4-->
                <div data-kt-stepper-element="content">
                  <div class="w-100">
                    <!--begin::Input group-->
                    <div class="d-flex flex-column mb-7 fv-row">
                      <!--begin::Label-->
                      <label
                          class="
                          d-flex
                          align-items-center
                          fs-6
                          fw-bold
                          form-label
                          mb-2
                        "
                      >
                        <span class="required">Name On Card</span>
                        <i
                            class="fas fa-exclamation-circle ms-2 fs-7"
                            data-bs-toggle="tooltip"
                            title="Specify a card holder's name"
                        ></i>
                      </label>
                      <!--end::Label-->

                      <Field
                          class="form-control form-control-solid"
                          name="nameOnCard"
                          placeholder=""
                          type="text"
                      />
                      <ErrorMessage
                          class="fv-plugins-message-container invalid-feedback"
                          name="nameOnCard"
                      />
                    </div>
                    <!--end::Input group-->

                    <!--begin::Input group-->
                    <div class="d-flex flex-column mb-7 fv-row">
                      <!--begin::Label-->
                      <label class="required fs-6 fw-bold form-label mb-2"
                      >Card Number</label
                      >
                      <!--end::Label-->

                      <!--begin::Input wrapper-->
                      <div class="position-relative">
                        <!--begin::Input-->
                        <Field
                            class="form-control form-control-solid"
                            name="cardNumber"
                            placeholder="Enter card number"
                            type="text"
                        />
                        <ErrorMessage
                            class="fv-plugins-message-container invalid-feedback"
                            name="cardNumber"
                        />
                        <!--end::Input-->

                        <!--begin::Card logos-->
                        <div
                            class="
                            position-absolute
                            translate-middle-y
                            top-50
                            end-0
                            me-5
                          "
                        >
                          <img
                              alt=""
                              class="h-25px"
                              src="/media/svg/card-logos/visa.svg"
                          />
                          <img
                              alt=""
                              class="h-25px"
                              src="/media/svg/card-logos/mastercard.svg"
                          />
                          <img
                              alt=""
                              class="h-25px"
                              src="/media/svg/card-logos/american-express.svg"
                          />
                        </div>
                        <!--end::Card logos-->
                      </div>
                      <!--end::Input wrapper-->
                    </div>
                    <!--end::Input group-->

                    <!--begin::Input group-->
                    <div class="row mb-10">
                      <!--begin::Col-->
                      <div class="col-md-8 fv-row">
                        <!--begin::Label-->
                        <label class="required fs-6 fw-bold form-label mb-2"
                        >Expiration Date</label
                        >
                        <!--end::Label-->

                        <!--begin::Row-->
                        <div class="row fv-row">
                          <!--begin::Col-->
                          <div class="col-6">
                            <Field
                                as="select"
                                class="
                                form-select form-select-solid
                                select2-hidden-accessible
                              "
                                name="cardExpiryMonth"
                                placeholder="Month"
                            >
                              <option
                                  v-for="i in 12"
                                  :key="i"
                                  :label="i"
                                  :value="i"
                              ></option>
                            </Field>
                            <ErrorMessage
                                class="
                                fv-plugins-message-container
                                invalid-feedback
                              "
                                name="cardExpiryMonth"
                            />
                          </div>
                          <!--end::Col-->

                          <!--begin::Col-->
                          <div class="col-6">
                            <Field
                                as="select"
                                class="
                                form-select form-select-solid
                                select2-hidden-accessible
                              "
                                name="cardExpiryYear"
                                placeholder="Year"
                            >
                              <option
                                  v-for="i in 10"
                                  :key="i"
                                  :label="i + (new Date().getFullYear() - 1)"
                                  :value="i"
                              ></option>
                            </Field>
                            <ErrorMessage
                                class="
                                fv-plugins-message-container
                                invalid-feedback
                              "
                                name="cardExpiryYear"
                            />
                          </div>
                          <!--end::Col-->
                        </div>
                        <!--end::Row-->
                      </div>
                      <!--end::Col-->

                      <!--begin::Col-->
                      <div class="col-md-4 fv-row">
                        <!--begin::Label-->
                        <label
                            class="
                            d-flex
                            align-items-center
                            fs-6
                            fw-bold
                            form-label
                            mb-2
                          "
                        >
                          <span class="required">CVV</span>
                          <i
                              class="fas fa-exclamation-circle ms-2 fs-7"
                              data-bs-toggle="tooltip"
                              title="Enter a card CVV code"
                          ></i>
                        </label>
                        <!--end::Label-->

                        <!--begin::Input wrapper-->
                        <div class="position-relative">
                          <!--begin::Input-->
                          <Field
                              class="form-control form-control-solid"
                              maxlength="4"
                              minlength="3"
                              name="cardCvv"
                              placeholder="CVV"
                              type="text"
                          />
                          <ErrorMessage
                              class="
                              fv-plugins-message-container
                              invalid-feedback
                            "
                              name="cardCvv"
                          />
                          <!--end::Input-->

                          <!--begin::CVV icon-->
                          <div
                              class="
                              position-absolute
                              translate-middle-y
                              top-50
                              end-0
                              me-3
                            "
                          >
                            <span class="svg-icon svg-icon-2hx">
                              <inline-svg
                                  src="/media/icons/duotune/finance/fin002.svg"
                              />
                            </span>
                          </div>
                          <!--end::CVV icon-->
                        </div>
                        <!--end::Input wrapper-->
                      </div>
                      <!--end::Col-->
                    </div>
                    <!--end::Input group-->

                    <!--begin::Input group-->
                    <div class="d-flex flex-stack">
                      <!--begin::Label-->
                      <div class="me-5">
                        <label class="fs-6 fw-bold form-label"
                        >Save Card for further billing?</label
                        >
                        <div class="fs-7 fw-bold text-gray-400">
                          If you need more info, please check budget planning
                        </div>
                      </div>
                      <!--end::Label-->

                      <!--begin::Switch-->
                      <label
                          class="
                          form-check
                          form-switch
                          form-check-custom
                          form-check-solid
                        "
                      >
                        <Field
                            class="form-check-input"
                            name="saveCard"
                            type="checkbox"
                            value="1"
                        />
                        <span class="form-check-label fw-bold text-gray-400">
                          Save Card
                        </span>
                      </label>
                      <!--end::Switch-->
                    </div>
                    <!--end::Input group-->
                  </div>
                </div>
                <!--end::Step 4-->

                <!--begin::Step 5-->
                <div data-kt-stepper-element="content">
                  <div class="w-100 text-center">
                    <!--begin::Heading-->
                    <h1 class="fw-bolder text-dark mb-3">Release!</h1>
                    <!--end::Heading-->

                    <!--begin::Description-->
                    <div class="text-muted fw-bold fs-3">
                      Submit your app to kickstart your project.
                    </div>
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
                      Back
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
                        Submit
                        <span class="svg-icon svg-icon-3 ms-2 me-0">
                          <inline-svg
                              src="/media/icons/duotune/arrows/arr064.svg"
                          />
                        </span>
                      </span>
                      <span class="indicator-progress">
                        Please wait...
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
                      Continue
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


interface Step1 {
  title: string;
  reason: string;
  category: string;
}

interface Step2 {
  framework: string;
}

interface Step3 {
  dbName: string;
  dbType: string;
}

interface Step4 {
  nameOnCard: string;
  cardNumber: string;
  cardExpiryMonth: string;
  cardExpiryYear: string;
  cardCvv: string;
  saveCard: string;
}

interface KTCreateApp extends Step1, Step2, Step3, Step4 {
}

export default defineComponent({
  name: "CreateChangeOpRequest",
  components: {
    Field,
    ErrorMessage,
  },
  setup() {
    const _stepperObj = ref<StepperComponent | null>(null);
    const createChangeOPRef = ref<HTMLElement | null>(null);
    const createAppModalRef = ref<HTMLElement | null>(null);
    const currentStepIndex = ref(0);
    const {t, te} = useI18n();
    const translate = (text) => (te(text) ? t(text) : text);
    const store = useStore();
    let fileList = [];
    store.dispatch(Actions.GET_CHANGE_OP_REQUEST_REASONS);

    const reasonOptions = computed(() => {
      let options: Array<any> = [];
      const reasons: Array<Array<string>> = store.getters.getChangeOPRequestReason;
      if (reasons.length) {
        reasons.forEach(v => {
          const option: string = v[1];
          options.push(
              {
                value: option,
                label:
                option
              });
        })
      }
      return options;
    });

    const formData = ref<KTCreateApp>({
      title: "",
      reason: "1",
      category: "1",
      framework: "1",
      dbName: "",
      dbType: "1",
      nameOnCard: "Max Doe",
      cardNumber: "4111 1111 1111 1111",
      cardExpiryMonth: "1",
      cardExpiryYear: "2",
      cardCvv: "123",
      saveCard: "1",
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
        reason: Yup.string().required(translate("reasonRequired")).label("Reason"),
        category: Yup.string().required().label("Category"),
      }),
      Yup.object({
        framework: Yup.string().required().label("Framework"),
      }),
      Yup.object({
        dbName: Yup.string().required().label("Database name"),
        dbType: Yup.string().required().label("Database engine"),
      }),
      Yup.object({
        nameOnCard: Yup.string().required().label("Name"),
        cardNumber: Yup.string().required().label("Card Number"),
        cardExpiryMonth: Yup.string().required().label("Expiration Month"),
        cardExpiryYear: Yup.string().required().label("Expiration Year"),
        cardCvv: Yup.string().required().label("CVV"),
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

    const {resetForm, handleSubmit} = useForm<Step1 | Step2 | Step3 | Step4>({
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

      currentStepIndex.value++;

      if (!_stepperObj.value) {
        return;
      }

      _stepperObj.value.goNext();
    });

    const formSubmit = () => {
      Swal.fire({
        text: "All is cool! Now you submit this form",
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        customClass: {
          confirmButton: "btn fw-bold btn-light-primary",
        },
      }).then(() => {
        hideModal(createAppModalRef.value);
      });
    };

    resetForm({
      values: {
        ...formData.value,
      },
    });

    const handleChange = (file, fileListData) => {
      fileList = fileListData;
    };

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
      fileList
    };
  },
});
</script>
