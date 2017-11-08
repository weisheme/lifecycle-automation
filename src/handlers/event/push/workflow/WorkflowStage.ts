import { BuildStatus } from "../../../../typings/types";

export interface WorkflowStage {
    name: string;
    completed?: WorkflowStageCompleted;
}

export interface WorkflowStageCompleted {
    status: BuildStatus;
    totalDuration: number;
    longestJobDuration: number;
}
