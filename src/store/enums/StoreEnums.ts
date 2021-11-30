enum Actions {
  // action types
  ADD_BODY_CLASSNAME = "addBodyClassName",
  REMOVE_BODY_CLASSNAME = "removeBodyClassName",
  ADD_BODY_ATTRIBUTE = "addBodyAttribute",
  REMOVE_BODY_ATTRIBUTE = "removeBodyAttribute",
  ADD_CLASSNAME = "addClassName",
  VERIFY_AUTH = "verifyAuth",
  LOGIN = "login",
  LOGOUT = "logout",
  REGISTER = "register",
  UPDATE_USER = "updateUser",
  FORGOT_PASSWORD = "forgotPassword",
  SET_BREADCRUMB_ACTION = "setBreadcrumbAction",
  GET_CHANGE_OP_REQUEST = "getChangeOPRequest",
  GET_CHANGE_OP_REQUESTS = "getChangeOPRequests",
  GET_CHANGE_OP_REQUESTS_WITH_PARAMS = "getChangeOPRequestsWithParams",
  CREATE_CHANGE_OP_REQUEST_MESSAGE = "createChangeOPRequestMessage",
  GET_CHANGE_OP_REQUEST_STATUSES = "getChangeOPRequestStatuses",
  GET_CHANGE_OP_REQUEST_STATUSES_WITH_PARAMS = "getChangeOPRequestStatusesWithParams",
  CHANGE_CHANGE_OP_REQUEST_STATUS = "changeChangeOPRequestStatus",
  GET_OPERATION_PROGRAMS = "getOperationPrograms",
  CHANGE_CHANGE_OP_REQUEST_OP = "changeChangeOPRequestOP",
  GET_OPERATION_PROGRAM_STATUSES = "getOperationProgramStatuses"
}

enum Mutations {
  // mutation types
  SET_CLASSNAME_BY_POSITION = "appendBreadcrumb",
  PURGE_AUTH = "logOut",
  SET_AUTH = "setAuth",
  SET_USER = "setUser",
  SET_PASSWORD = "setPassword",
  SET_ERROR = "setError",
  SET_BREADCRUMB_MUTATION = "setBreadcrumbMutation",
  SET_LAYOUT_CONFIG = "setLayoutConfig",
  RESET_LAYOUT_CONFIG = "resetLayoutConfig",
  OVERRIDE_LAYOUT_CONFIG = "overrideLayoutConfig",
  OVERRIDE_PAGE_LAYOUT_CONFIG = "overridePageLayoutConfig",
  SET_CHANGE_OP_REQUEST = "setChangeOPRequest",
  SET_CHANGE_OP_REQUESTS = "setChangeOPRequests",
  SET_CHANGE_OP_REQUESTS_ERRORS = "setChangeOPRequestsErrors",
  SET_CHANGE_OP_REQUEST_MESSAGE_ERROR = "setChangeOPRequestMessageError",
  SET_CHANGE_OP_REQUEST_STATUSES = "setChangeOPRequestStatuses",
  SET_CHANGE_OP_REQUEST_STATUSES_ERRORS = "setChangeOPRequestStatusesErrors",
  SET_OPERATION_PROGRAMS = "setOperationPrograms",
  SET_OPERATION_PROGRAMS_ERRORS = "setOperationProgramsErrors",
  SET_OPERATION_PROGRAM_STATUSES = "setOperationProgramStatuses",
  SET_OPERATION_PROGRAM_STATUSES_ERRORS = "setOperationProgramStatusesErrors"
}

export { Actions, Mutations };
