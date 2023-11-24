// import Box from '@mui/material/Box';
import { Canvas, useLoader } from '@react-three/fiber';
import React, { ReactNode, Suspense, useEffect, useRef } from 'react';
import { CameraControls, OrbitControls } from '@react-three/drei';
import { BufferGeometry, Mesh, NormalBufferAttributes, Vector3 } from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import * as THREE from 'three';
import { useControls } from 'leva';

// interface IProps {
//     shoulder4: number;
//     shoulder3: number;
//     shoulder2: number;
//     shoulder1: number;
// }

export default function Dog() {
    const control = useControls('shoulders', {
        shoulder4: {
            value: 0,
            min: -90,
            max: 90,
            step: 1,
        },
        shoulder3: {
            value: 0,
            min: -90,
            max: 90,
            step: 1,
        },
        shoulder2: {
            value: 0,
            min: -90,
            max: 90,
            step: 1,
        },
        shoulder1: {
            value: 0,
            min: -90,
            max: 90,
            step: 1,
        },
    });

    const control2 = useControls('knees', {
        knee4: {
            value: -90,
            min: -150,
            max: 0,
            step: 1,
        },
        knee3: {
            value: 90,
            min: 0,
            max: 150,
            step: 1,
        },
        knee2: {
            value: -90,
            min: -150,
            max: 0,
            step: 1,
        },
        knee1: {
            value: 90,
            min: 0,
            max: 150,
            step: 1,
        },
    });
    const control3 = useControls('reductors', {
        reductor1: {
            value: -90,
            min: -150,
            max: 0,
            step: 1,
        },
        reductor2: {
            value: 90,
            min: 0,
            max: 150,
            step: 1,
        },
        reductor3: {
            value: -90,
            min: -150,
            max: 0,
            step: 1,
        },
        reductor4: {
            value: 90,
            min: 0,
            max: 150,
            step: 1,
        },
    });

    const Model = ({
        url,
        color,
        point,
        axis,
        theta,
        children,
    }: {
        url: string;
        color?: string;
        point?: Vector3;
        axis?: Vector3;
        theta?: number;
        children?: ReactNode;
    }) => {
        const geometry = useLoader(STLLoader, url);
        const ref = useRef<Mesh<BufferGeometry<NormalBufferAttributes>> | null>(null);
        useEffect(() => {
            if (ref.current && !!theta && !!point && !!axis) {
                ref.current.position.sub(point); // remove the offset
                ref.current.position.applyAxisAngle(axis, theta); // rotate the POSITION
                ref.current.position.add(point); // re-add the offset
                ref.current.rotateOnAxis(axis, theta); // rotate the OBJECT
            }
        }, [ref.current, theta, axis, point]);

        return (
            <>
                {/* eslint-disable-next-line react/no-unknown-property */}
                <mesh ref={ref} castShadow>
                    {/* eslint-disable-next-line react/no-unknown-property */}
                    <primitive object={geometry} attach="geometry" />;
                    {/* eslint-disable-next-line react/no-unknown-property */}
                    <meshStandardMaterial color={color ?? '#00d0ff'} metalness={0.5} />
                    {children}
                </mesh>
            </>
        );
    };

    function Lights() {
        return (
            <>
                {/* eslint-disable-next-line react/no-unknown-property */}
                <ambientLight visible color="#FFFFFF" intensity={0.5} />
                {/* eslint-disable-next-line react/no-unknown-property */}
                <directionalLight visible castShadow position={[-1, 3, -1]} color="#FFFFFF" intensity={0.5} />
                {/* eslint-disable-next-line react/no-unknown-property */}
                <pointLight visible castShadow position={[-1, 3, -1]} color="#FFFFFF" intensity={5} />
                {/* eslint-disable-next-line react/no-unknown-property */}
                <spotLight visible castShadow position={[-1, 8, 0]} color="#FFFFFF" intensity={5} />
            </>
        );
    }

    return (
        <Canvas camera={{ position: [6, 5, -1] }}>
            <Lights />
            <Suspense>
                {/* eslint-disable-next-line react/no-unknown-property */}
                <group position={[0, 6, 0]} scale={[0.01, 0.01, 0.01]}>
                    <Model url={'models/dog-modified-models/dog_body/dog_front_simple.stl'}>
                        <Model
                            url={'models/dog-modified-models/dog_body/dog_shoulder.stl'}
                            point={new THREE.Vector3(0, 0, 0)}
                            axis={new THREE.Vector3(0, 0, 1)}
                            theta={(Math.PI * control.shoulder1) / 180}
                        >
                            <Model
                                url={'models/dog-modified-models/leg_1/dog_leg_shoulder-2_1.stl'}
                                point={new THREE.Vector3(0, 0, 17)}
                                axis={new THREE.Vector3(1, 0, 0)}
                                theta={(Math.PI * control3.reductor1) / 180}
                            >
                                <Model url={'models/dog-modified-models/leg_1/dog_leg_link_1.stl'}>
                                    <Model url={'models/dog-modified-models/leg_1/dog_leg_leg_1.stl'}>
                                        <Model
                                            url={'models/dog-modified-models/leg_1/dog_leg_knee_1.stl'}
                                            point={new THREE.Vector3(0, -295, 18)}
                                            axis={new THREE.Vector3(1, 0, 0)}
                                            theta={(Math.PI * control2.knee1) / 180}
                                        >
                                            <Model url={'models/dog-modified-models/leg_1/dog_leg_shin_1.stl'}>
                                                <Model
                                                    url={'models/dog-modified-models/leg_1/dog_leg_foot_1.stl'}
                                                ></Model>
                                            </Model>
                                        </Model>
                                    </Model>
                                </Model>
                            </Model>
                        </Model>
                        <Model
                            url={'models/dog-modified-models/dog_body/dog_shoulder_2.stl'}
                            point={new THREE.Vector3(0, 0, 0)}
                            axis={new THREE.Vector3(0, 0, 1)}
                            theta={(Math.PI * control.shoulder2) / 180}
                        >
                            <Model
                                url={'models/dog-modified-models/leg_2/dog_leg_shoulder-2_2.stl'}
                                point={new THREE.Vector3(0, 0, 0)}
                                axis={new THREE.Vector3(0, 0, 1)}
                                // theta={(Math.PI * control.shoulder1) / 180}
                            >
                                <Model url={'models/dog-modified-models/leg_2/dog_leg_link_2.stl'}>
                                    <Model url={'models/dog-modified-models/leg_2/dog_leg_leg_2.stl'}>
                                        <Model
                                            url={'models/dog-modified-models/leg_2/dog_leg_knee_2.stl'}
                                            point={new THREE.Vector3(0, 0, 0)}
                                            axis={new THREE.Vector3(0, 0, 1)}
                                            theta={(Math.PI * control2.knee2) / 180}
                                        >
                                            <Model url={'models/dog-modified-models/leg_2/dog_leg_shin_2.stl'}>
                                                <Model
                                                    url={'models/dog-modified-models/leg_2/dog_leg_foot_2.stl'}
                                                ></Model>
                                            </Model>
                                        </Model>
                                    </Model>
                                </Model>
                            </Model>
                        </Model>
                    </Model>
                    <Model url={'models/dog-modified-models/dog_body/dog_middle_simple.stl'}></Model>
                    <Model url={'models/dog-modified-models/dog_body/dog_sidewall_simple.stl'}></Model>
                    <Model url={'models/dog-modified-models/dog_body/dog_sidewall_2.stl'}></Model>
                    <Model url={'models/dog-modified-models/dog_body/dog_sidewall_3.stl'}></Model>
                    <Model url={'models/dog-modified-models/dog_body/dog_sidewall_4.stl'}></Model>
                    <Model url={'models/dog-modified-models/dog_body/dog_back.stl'}>
                        <Model
                            url={'models/dog-modified-models/dog_body/dog_shoulder_4.stl'}
                            point={new THREE.Vector3(186, 0, 0)}
                            axis={new THREE.Vector3(0, 0, 1)}
                            theta={(Math.PI * control.shoulder4) / 180}
                        >
                            <Model
                                url={'models/dog-modified-models/leg_4/dog_leg_shoulder-2_4.stl'}
                                point={new THREE.Vector3(0, 0, 0)}
                                axis={new THREE.Vector3(0, 0, 1)}
                                // theta={(Math.PI * control.shoulder1) / 180}
                            >
                                <Model url={'models/dog-modified-models/leg_4/dog_leg_link_4.stl'}>
                                    <Model url={'models/dog-modified-models/leg_4/dog_leg_leg_4.stl'}>
                                        <Model
                                            url={'models/dog-modified-models/leg_4/dog_leg_knee_4.stl'}
                                            point={new THREE.Vector3(0, 0, 0)}
                                            axis={new THREE.Vector3(0, 0, 1)}
                                            theta={(Math.PI * control2.knee4) / 180}
                                        >
                                            <Model url={'models/dog-modified-models/leg_4/dog_leg_shin_4.stl'}>
                                                <Model
                                                    url={'models/dog-modified-models/leg_4/dog_leg_foot_4.stl'}
                                                ></Model>
                                            </Model>
                                        </Model>
                                    </Model>
                                </Model>
                            </Model>
                        </Model>
                        <Model
                            url={'models/dog-modified-models/dog_body/dog_shoulder_3.stl'}
                            point={new THREE.Vector3(0, 0, 0)}
                            axis={new THREE.Vector3(0, 0, 1)}
                            theta={(Math.PI * control.shoulder3) / 180}
                        >
                            <Model
                                url={'models/dog-modified-models/leg_3/dog_leg_shoulder-2_3.stl'}
                                point={new THREE.Vector3(0, 0, 0)}
                                axis={new THREE.Vector3(0, 0, 1)}
                                // theta={(Math.PI * control.shoulder1) / 180}
                            >
                                <Model url={'models/dog-modified-models/leg_3/dog_leg_link_3.stl'}>
                                    <Model url={'models/dog-modified-models/leg_3/dog_leg_leg_3.stl'}>
                                        <Model
                                            url={'models/dog-modified-models/leg_3/dog_leg_knee_3.stl'}
                                            point={new THREE.Vector3(0, 0, 0)}
                                            axis={new THREE.Vector3(0, 0, 1)}
                                            theta={(Math.PI * control2.knee3) / 180}
                                        >
                                            <Model url={'models/dog-modified-models/leg_3/dog_leg_shin_3.stl'}>
                                                <Model
                                                    url={'models/dog-modified-models/leg_3/dog_leg_foot_3.stl'}
                                                ></Model>
                                            </Model>
                                        </Model>
                                    </Model>
                                </Model>
                            </Model>
                        </Model>
                    </Model>
                </group>
            </Suspense>
            {/* eslint-disable-next-line react/no-unknown-property */}
            <mesh position={[0, 0, 0]} rotation-x={-Math.PI / 2} receiveShadow castShadow>
                {/* eslint-disable-next-line react/no-unknown-property */}
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="white" />
            </mesh>
            <OrbitControls />
            <CameraControls makeDefault />
        </Canvas>
    );
}
