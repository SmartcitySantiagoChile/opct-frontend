import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {Actions, Mutations} from "@/store/enums/StoreEnums";
import ApiService from "@/core/services/ApiService";
import {Organization} from "@/store/modules/OrganizationModule";

export interface OrganizationsInfo {
    errors: Array<any>;
    organizations: Array<Organization>;
    count: number;
    next: string;
    previous: string;
}

@Module
export default class OrganizationsModule extends VuexModule implements OrganizationsInfo {
    errors = [];
    organizations = [] as Organization[];
    count = 0;
    next = "";
    previous = "";

    /**
     * Get current organizations
     * @returns Organization[]
     */
    get getAllOrganizations(): Organization[] {
        return this.organizations;
    }

    @Mutation
    [Mutations.SET_ORGANIZATIONS](organizationsList) {
        this.organizations = organizationsList.results;
        this.count = organizationsList.count;
        this.next = organizationsList.next;
        this.previous = organizationsList.previous;
    }

    @Mutation
    [Mutations.SET_ORGANIZATIONS_ERRORS](errors) {
        this.errors = errors
    }

    @Action
    [Actions.GET_ORGANIZATIONS]() {
        ApiService.get("organizations")
            .then(({data}) => {
                this.context.commit(Mutations.SET_ORGANIZATIONS, data);
            })
            .catch(({response}) => {
                this.context.commit(Mutations.SET_ORGANIZATIONS_ERRORS, [response.data.error]);
            });
    }
}
