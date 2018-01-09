import * as _ from "lodash";

export type PodPhase = "Pulling" | "Created" | "Pulled" | "Scheduled" | "Started" | "Unhealthy" | "Killing";

export interface Pod  {
    name: string;
    phase: PodPhase;
    containers: Container[];
}

export interface Container  {
    name: string;
    imageName: string;
}

export interface PodsForPhase {
    phase: PodPhase;
    pods: ContainersForPod[];
}

export interface ContainersForPod {
    podName: string;
    containers: Container[];
}

export function podStatusForImage(pods: Pod[], imageName): PodsForPhase[] {
    return _.reduce(pods, (podsUsingImage, pod) => {
        const containersForimageInPod = pod.containers.filter( c => c.imageName === imageName);
        if (_.isEmpty(containersForimageInPod)) {
            return podsUsingImage;
        }
        const podsUsingImageInSamePhase = podsUsingImage.find(p => p.phase === pod.phase);
        if (podsUsingImageInSamePhase) {
            podsUsingImageInSamePhase.pods.push({
                podName: pod.name,
                containers: containersForimageInPod,
            });
        } else {
            podsUsingImage.push({
                phase: pod.phase,
                pods: [{
                    podName: pod.name,
                    containers: containersForimageInPod,
                }],
            });
        }
        return podsUsingImage;
    }, []);
}
