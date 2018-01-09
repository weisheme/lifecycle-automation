import "mocha";
import * as assert from "power-assert";
import {Container, ContainersForPod, groupPodsWithImageByPhase, Pod, PodsForPhase} from "../../src/util/k8";

describe("k8", () => {

    const singleStartedPod = [{
        name: "pod1",
        phase: "Started",
        containers: [
            {
                name: "c1",
                imageName: "i1",
            } as Container,
        ],
    } as Pod];

    const assortedPods = [
        {
            name: "pod1",
            phase: "Started",
            containers: [
                {
                    name: "c1",
                    imageName: "i1",
                } as Container,
            ],
        } as Pod,
        {
            name: "pod2",
            phase: "Started",
            containers: [
                {
                    name: "c2",
                    imageName: "i2",
                } as Container,
            ],
        } as Pod,
        {
            name: "pod3",
            phase: "Pulling",
            containers: [
                {
                    name: "c31",
                    imageName: "i1",
                } as Container,
                {
                    name: "c32",
                    imageName: "i2",
                } as Container,
                {
                    name: "c33",
                    imageName: "i1",
                } as Container,
            ],
        } as Pod,
        {
            name: "pod4",
            phase: "Started",
            containers: [
                {
                    name: "c4",
                    imageName: "i2",
                } as Container,
            ],
        } as Pod,
    ];

    describe("groupPodsWithImageByPhase", () => {

        it("should return empty array for empty pods", () => {
            const result = groupPodsWithImageByPhase([], "123");
            assert.deepEqual(result, []);
        });

        it("should return empty array for missing image name", () => {
            const result = groupPodsWithImageByPhase(singleStartedPod, undefined);
            assert.deepEqual(result, []);
        });

        it("should return empty array for non matching image name", () => {
            const result = groupPodsWithImageByPhase(singleStartedPod, "i2");
            assert.deepEqual(result, []);
        });

        it("should return container matching image name", () => {
            const result = groupPodsWithImageByPhase(singleStartedPod, "i1");
            assert.deepEqual(result, [
                {
                    phase: "Started",
                    pods: [{
                        podName: "pod1",
                        containers: [{
                            name: "c1",
                            imageName: "i1",
                        } as Container],
                    } as ContainersForPod],
                } as PodsForPhase,
            ]);
        });

        it("should return containers across pods for matching image name", () => {
            const result = groupPodsWithImageByPhase(assortedPods, "i1");
            assert.deepEqual(result, [
                {
                    phase: "Started",
                    pods: [{
                        podName: "pod1",
                        containers: [{
                            name: "c1",
                            imageName: "i1",
                        } as Container],
                    } as ContainersForPod],
                } as PodsForPhase, {
                    phase: "Pulling",
                    pods: [{
                        podName: "pod3",
                        containers: [
                            {
                                name: "c31",
                                imageName: "i1",
                            } as Container,
                            {
                                name: "c33",
                                imageName: "i1",
                            } as Container,
                        ],
                    } as ContainersForPod],
                },
            ]);
        });

        it("should return containers across pods with phase collision", () => {
            const result = groupPodsWithImageByPhase(assortedPods, "i2");
            assert.deepEqual(result, [
                {
                    phase: "Started",
                    pods: [
                        {
                            podName: "pod2",
                            containers: [{
                                name: "c2",
                                imageName: "i2",
                            } as Container],
                        } as ContainersForPod,
                        {
                            podName: "pod4",
                            containers: [{
                                name: "c4",
                                imageName: "i2",
                            } as Container],
                        } as ContainersForPod,
                    ],
                } as PodsForPhase, {
                    phase: "Pulling",
                    pods: [{
                        podName: "pod3",
                        containers: [{
                            name: "c32",
                            imageName: "i2",
                        } as Container],
                    } as ContainersForPod],
                },
            ]);
        });

    });

});
