import * as _ from "lodash";
import {WorkflowStage} from "./WorkflowStage";

export function chartUrlFromWorkflow(stages: WorkflowStage[]): string {
    const stageNames = stages.map(s => s.name);
    const longestDuration = _.max(stages.filter(s => s.completed).map(s => s.completed.totalDuration));

    let scaleText = "in seconds";
    let scale = 1000;
    if (longestDuration > 600000) {
        scaleText = "in minutes";
        scale = 60000;
    }
    const chartHeight = 100 + stages.length * 10;

    const durationPlaceholder = _.round((longestDuration * .02) / scale);

    const longestDurationsInMinutes = [];
    const remainingDurationsInMinutes = [];
    const failureDurationInMinutes = [];
    stages.forEach(s => {
        let longestDuration = 0;
        let remainingDuration = 0;
        let failureDuration = 0;
        if (s.completed) {
            if (s.completed.status == "passed") {
                longestDuration = _.round(s.completed.longestJobDuration / scale);
                if (longestDuration < durationPlaceholder) {
                    longestDuration = durationPlaceholder;
                } else {
                    remainingDuration = _.round(s.completed.totalDuration / scale) - longestDuration;
                }
            }
            if (s.completed.status == "failed") {
                failureDuration = _.max([durationPlaceholder, _.round(s.completed.totalDuration / scale)]);
            }
        }
        longestDurationsInMinutes.push(longestDuration);
        remainingDurationsInMinutes.push(remainingDuration);
        failureDurationInMinutes.push(failureDuration);
    })
    
    const stageNamesString = `|${stageNames.join("|")}|`;
    const url = `https://image-charts.com/chart?chs=400x${chartHeight}&cht=bhs&chd=t:${longestDurationsInMinutes.join(",")}|${remainingDurationsInMinutes.join(",")}|${failureDurationInMinutes.join(",")}&chds=a&chco=0FA215,86DB95,DD5B6A&chxr=200&chxt=x,y&chxl=0:${stageNamesString}&chtt=Workflow%20Stage%20Durations%20(${scaleText})&chts=000000,10&chof=.png`;
    return _.replace(url, new RegExp(" ","g"), "%20");
}
