import { createStore } from "vuex";
import { config } from "vuex-module-decorators";

import AuthModule from "@/store/modules/AuthModule";
import BodyModule from "@/store/modules/BodyModule";
import BreadcrumbsModule from "@/store/modules/BreadcrumbsModule";
import ConfigModule from "@/store/modules/ConfigModule";
import ChangeOPRequestModule from "@/store/modules/ChangeOPRequestModule";
import ChangeOPRequestsModule from "@/store/modules/ChangeOPRequestsModule";
import ChangeOPRequestMessageModule from "@/store/modules/ChangeOPRequestMessageModule";
import ChangeOPRequestStatusModule from "@/store/modules/ChangeOPRequestStatusModule";
import ChangeOPRequestStatusesModule from "@/store/modules/ChangeOPRequestStatusesModule";
import OperationProgramModule from "@/store/modules/OperationProgramModule";
import OperationProgramsModule from "@/store/modules/OperationProgramsModule";
import OperationProgramStatusModule from "@/store/modules/OperationProgramStatusModule";
import OperationProgramStatusesModule from "@/store/modules/OperationProgramStatusesModule";
import OrganizationModule from "@/store/modules/OrganizationModule";
import OrganizationsModule from "@/store/modules/OrganizationsModule";
import OperationProgramTypeModule from "@/store/modules/OperationProgramTypeModule";
import OperationProgramTypesModule from "@/store/modules/OperationProgramTypesModule";
import ChangeOPProcessModule from "@/store/modules/ChangeOPProcessModule";
import ChangeOPProcessesModule from "@/store/modules/ChangeOPProcessesModule";
import ChangeOPProcessStatusModule from "@/store/modules/ChangeOPProcessStatusModule";
import ChangeOPProcessStatusesModule from "@/store/modules/ChangeOPRequestProcessesModule";

config.rawError = true;

const store = createStore({
  modules: {
    AuthModule,
    BodyModule,
    BreadcrumbsModule,
    ConfigModule,
    ChangeOPRequestModule,
    ChangeOPRequestsModule,
    ChangeOPRequestMessageModule,
    ChangeOPRequestStatusesModule,
    ChangeOPRequestStatusModule,
    OperationProgramModule,
    OperationProgramsModule,
    OperationProgramStatusModule,
    OperationProgramStatusesModule,
    OrganizationModule,
    OrganizationsModule,
    OperationProgramTypeModule,
    OperationProgramTypesModule,
    ChangeOPProcessModule,
    ChangeOPProcessesModule,
    ChangeOPProcessStatusModule,
    ChangeOPProcessStatusesModule,
  },
});

export default store;
