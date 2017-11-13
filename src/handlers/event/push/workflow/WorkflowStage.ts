import { BuildStatus } from "../../../../typings/types";

export interface WorkflowStage {
    name: string;
    status?: WorkflowStageCompletedStatus;
}

export interface WorkflowStageCompletedStatus {
    state: BuildStatus;
    totalDuration: number;
    longestJobDuration: number;
}
