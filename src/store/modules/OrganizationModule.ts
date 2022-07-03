import { Module, VuexModule } from "vuex-module-decorators";
import { Dictionary } from "@/store/modules/HelperModule";

export interface Organization {
  url: string;
  name: string;
  created_at: string;
  contract_type: Dictionary<string>;
  default_counterpart: Dictionary<string>;
  can_change_counterpart: boolean;
}

export interface OrganizationInfo {
  errors: Array<any>;
  organization: Organization;
}

@Module
export default class OrganizationModule
  extends VuexModule
  implements OrganizationInfo
{
  errors = [] as Array<any>;
  organization = {} as Organization;
}
