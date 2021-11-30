import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {OperationProgramStatus} from "@/store/modules/OperationProgramStatusModule";
import {Actions, Mutations} from "@/store/enums/StoreEnums";
import ApiService from "@/core/services/ApiService";

export interface OperationProgramStatusesInfo {
    errors: Array<any>;
    operationProgramStatuses: Array<OperationProgramStatus>;
    count: number;
    next: string;
    previous: string;
}

@Module
export default class OperationProgramStatusesModule extends VuexModule implements OperationProgramStatusesInfo {
    errors = [];
    operationProgramStatuses =  [] as OperationProgramStatus[] ;
    count = 0;
    next = "";
    previous = "";

    /**
     * Get current change op request statuses
     * @returns ChangeOPRequestStatus[]
     */
    get getCurrentOperationProgramStatuses(): OperationProgramStatus[] {
        return this.operationProgramStatuses;
    }



    @Mutation
    [Mutations.SET_OPERATION_PROGRAM_STATUSES](operationProgramStatusList) {
        this.operationProgramStatuses = operationProgramStatusList.results;
        this.count = operationProgramStatusList.count;
        this.next = operationProgramStatusList.next;
        this.previous = operationProgramStatusList.previous;
    }

    @Mutation
    [Mutations.SET_OPERATION_PROGRAM_STATUSES_ERRORS](errors) {
        this.errors = errors
    }

    @Action
    [Actions.GET_OPERATION_PROGRAM_STATUSES]() {
        ApiService.get("operation-program-statuses")
            .then(({data}) => {
                this.context.commit(Mutations.SET_OPERATION_PROGRAM_STATUSES, data);
            })
            .catch(({response}) => {
                this.context.commit(Mutations.SET_OPERATION_PROGRAM_STATUSES_ERRORS, [response.data.error]);
            });
    }


    @Action
    [Actions.GET_CHANGE_OP_REQUEST_STATUSES_WITH_PARAMS](params) {
        ApiService.query("change-op-request-statuses", {params: params})
            .then(({data}) => {
                this.context.commit(Mutations.SET_CHANGE_OP_REQUEST_STATUSES, data);
            })
            .catch(({response}) => {
                this.context.commit(Mutations.SET_CHANGE_OP_REQUEST_STATUSES_ERRORS, [response.data.error]);
            });
    }

}
