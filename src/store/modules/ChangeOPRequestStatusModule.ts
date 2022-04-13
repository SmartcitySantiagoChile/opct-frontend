import { Module, VuexModule } from "vuex-module-decorators";
import { Dictionary } from "@/store/modules/HelperModule";

export interface ChangeOPRequestStatus {
  url: string;
  name: string;
  contract_type: Dictionary<string>;
}

export interface ChangeOPRequestStatusInfo {
  errors: Array<any>;
  changeOPRequestStatus: ChangeOPRequestStatus;
}

@Module
export default class ChangeOPRequestStatusModule
  extends VuexModule
  implements ChangeOPRequestStatusInfo
{
  errors = [] as Array<any>;
  changeOPRequestStatus = {} as ChangeOPRequestStatus;
}
