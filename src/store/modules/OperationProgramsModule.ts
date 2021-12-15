import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {ChangeOPRequestStatus} from "@/store/modules/ChangeOPRequestStatusModule";
import ChangeOPRequest from "@/store/modules/ChangeOPRequestModule";
import {Actions, Mutations} from "@/store/enums/StoreEnums";
import ApiService from "@/core/services/ApiService";
import {OperationProgram} from "@/store/modules/OperationProgramModule";

export interface OperationProgramsInfo {
    errors: Array<any>;
    operationPrograms: Array<OperationProgram>;
    count: number;
    next: string;
    previous: string;
}

@Module
export default class OperationProgramsModule extends VuexModule implements OperationProgramsInfo {
    errors = [];
    operationPrograms =  [] as OperationProgram[] ;
    count = 0;
    next = "";
    previous = "";

    /**
     * Get current operation programs
     * @returns OperationProgram[]
     */
    get getCurrentOperationPrograms(): OperationProgram[] {
        return this.operationPrograms;
    }

    /**
     * Get current operation programs
     * @returns number
     */
    get getCurrentOperationProgramsCount(): number {
        return this.count;
    }

    @Mutation
    [Mutations.SET_OPERATION_PROGRAMS](operationProgramList) {
        this.operationPrograms = operationProgramList.results;
        this.count = operationProgramList.count;
        this.next = operationProgramList.next;
        this.previous = operationProgramList.previous;
    }

    @Mutation
    [Mutations.SET_OPERATION_PROGRAMS_ERRORS](errors) {
        this.errors = errors
    }

    @Action
    [Actions.GET_OPERATION_PROGRAMS]() {
        ApiService.get("operation-programs")
            .then(({data}) => {
                this.context.commit(Mutations.SET_OPERATION_PROGRAMS, data);
            })
            .catch(({response}) => {
                this.context.commit(Mutations.SET_OPERATION_PROGRAMS_ERRORS, [response.data.error]);
            });
    }
}
