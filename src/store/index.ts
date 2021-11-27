import { createStore } from "vuex";
import { config } from "vuex-module-decorators";

import AuthModule from "@/store/modules/AuthModule";
import BodyModule from "@/store/modules/BodyModule";
import BreadcrumbsModule from "@/store/modules/BreadcrumbsModule";
import ConfigModule from "@/store/modules/ConfigModule";
import ChangeOPRequestModule from "@/store/modules/ChangeOPRequestModule";
import ChangeOPRequestsModule from "@/store/modules/ChangeOPRequestsModule";
import ChangeOPRequestMessageModule from "@/store/modules/ChangeOPRequestMessageModule";

config.rawError = true;

const store = createStore({
  modules: {
    AuthModule,
    BodyModule,
    BreadcrumbsModule,
    ConfigModule,
    ChangeOPRequestModule,
    ChangeOPRequestsModule,
    ChangeOPRequestMessageModule
  },
});

export default store;
