// import Box from '@mui/material/Box';
import { Canvas, useLoader } from '@react-three/fiber';
import React, { ReactNode, Suspense, useContext, useEffect, useRef } from 'react';
import { CameraControls, Html, OrbitControls, useProgress } from '@react-three/drei';
import { BufferGeometry, Mesh, NormalBufferAttributes, Vector3 } from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import * as THREE from 'three';
// import { useControls } from 'leva';
import { Box } from '@mui/material';
import { Item } from '../manipulator/components/StyledComponents/StyledComponents';
import { JointStateContext } from '../../contexts/DogContext/JointStateContext';

// interface IProps {
//     shoulder4: number;
//     shoulder3: number;
//     shoulder2: number;
//     shoulder1: number;
// }

export default function Dog() {
    const {
        joint0Value,
        joint1Value,
        joint2Value,
        joint3Value,
        joint4Value,
        joint5Value,
        joint6Value,
        joint7Value,
        joint8Value,
        joint9Value,
        joint10Value,
        joint11Value,
    } = useContext(JointStateContext);

    function Loader() {
        const { progress } = useProgress();
        return <Html center>{Math.floor(progress)} % loaded</Html>;
    }

    // const leg_1 = useControls('leg 1 (front left)', {
    //     shoulder1: {
    //         value: 0,
    //         min: -90,
    //         max: 90,
    //         step: 1,
    //     },
    //     reductor1: {
    //         value: -50,
    //         min: -90,
    //         max: 90,
    //         step: 1,
    //     },
    //     knee1: {
    //         value: 90,
    //         min: 0,
    //         max: 150,
    //         step: 1,
    //     },
    // });
    // const leg_2 = useControls('leg 2 (front right)', {
    //     shoulder2: {
    //         value: 0,
    //         min: -90,
    //         max: 90,
    //         step: 1,
    //     },
    //     reductor2: {
    //         value: -50,
    //         min: -90,
    //         max: 90,
    //         step: 1,
    //     },
    //     knee2: {
    //         value: 90,
    //         min: 0,
    //         max: 150,
    //         step: 1,
    //     },
    // });
    // const leg_3 = useControls('leg 3 (rear left)', {
    //     shoulder3: {
    //         value: 0,
    //         min: -90,
    //         max: 90,
    //         step: 1,
    //     },
    //     reductor3: {
    //         value: -50,
    //         min: -90,
    //         max: 90,
    //         step: 1,
    //     },
    //     knee3: {
    //         value: 90,
    //         min: 0,
    //         max: 150,
    //         step: 1,
    //     },
    // });
    // const leg_4 = useControls('leg 4 (rear right)', {
    //     shoulder4: {
    //         value: 0,
    //         min: -90,
    //         max: 90,
    //         step: 1,
    //     },
    //     reductor4: {
    //         value: -50,
    //         min: -90,
    //         max: 90,
    //         step: 1,
    //     },
    //     knee4: {
    //         value: 90,
    //         min: 0,
    //         max: 150,
    //         step: 1,
    //     },
    // });

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
                    <meshStandardMaterial color={color ?? '#ffd800'} metalness={0.5} />
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
                <spotLight visible castShadow position={[-2, 6, -2]} color="#FFFFFF" intensity={10} />
                {/* eslint-disable-next-line react/no-unknown-property */}
                <pointLight visible position={[1, 3, 4]} color="#FFFFFF" intensity={5} />
                {/* eslint-disable-next-line react/no-unknown-property */}
                <directionalLight visible position={[-2, 1, 1]} color="#FFFFFF" intensity={0.7} />
            </>
        );
    }

    return (
        <Box component="div" sx={{ flex: 1, marginTop: '8px' }}>
            <Item
                sx={{
                    minHeight: '80vh',
                    height: '100px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Canvas shadows camera={{ position: [7, 6, -5] }}>
                    <Lights />
                    <Suspense fallback={<Loader />}>
                        {/* eslint-disable-next-line react/no-unknown-property */}
                        <group position={[0, 4.18, 0]} scale={[0.01, 0.01, 0.01]}>
                            <Model url={'models/dog-modified-models/dog_body/dog_front_simple.stl'}>
                                <Model
                                    url={'models/dog-modified-models/dog_body/dog_shoulder.stl'}
                                    point={new THREE.Vector3(0, 0, 0)}
                                    axis={new THREE.Vector3(0, 0, 1)}
                                    theta={(Math.PI * joint0Value) / 180}
                                >
                                    <Model
                                        url={'models/dog-modified-models/leg_1/dog_leg_shoulder-2_1.stl'}
                                        point={new THREE.Vector3(0, 0, 17)}
                                        axis={new THREE.Vector3(1, 0, 0)}
                                        theta={(Math.PI * joint1Value) / 180}
                                    >
                                        <Model url={'models/dog-modified-models/leg_1/dog_leg_link_1.stl'}>
                                            <Model url={'models/dog-modified-models/leg_1/dog_leg_leg_1.stl'}>
                                                <Model
                                                    url={'models/dog-modified-models/leg_1/dog_leg_knee_1.stl'}
                                                    point={new THREE.Vector3(0, -295, 18)}
                                                    axis={new THREE.Vector3(1, 0, 0)}
                                                    theta={(Math.PI * joint2Value) / 180}
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
                                    point={new THREE.Vector3(186, 0, 0)}
                                    axis={new THREE.Vector3(0, 0, 1)}
                                    theta={(Math.PI * joint3Value) / 180}
                                >
                                    <Model
                                        url={'models/dog-modified-models/leg_2/dog_leg_shoulder-2_2.stl'}
                                        point={new THREE.Vector3(0, 0, 17)}
                                        axis={new THREE.Vector3(1, 0, 0)}
                                        theta={(Math.PI * joint4Value) / 180}
                                    >
                                        <Model url={'models/dog-modified-models/leg_2/dog_leg_link_2.stl'}>
                                            <Model url={'models/dog-modified-models/leg_2/dog_leg_leg_2.stl'}>
                                                <Model
                                                    url={'models/dog-modified-models/leg_2/dog_leg_knee_2.stl'}
                                                    point={new THREE.Vector3(0, -294, 18)}
                                                    axis={new THREE.Vector3(1, 0, 0)}
                                                    theta={(Math.PI * joint5Value) / 180}
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
                            <Model url={'models/dog-modified-models/dog_body/dog_puck_1.stl'}></Model>
                            <Model url={'models/dog-modified-models/dog_body/dog_puck_2.stl'}></Model>
                            <Model url={'models/dog-modified-models/dog_body/dog_puck_3.stl'}></Model>
                            <Model url={'models/dog-modified-models/dog_body/dog_puck_4.stl'}></Model>
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
                                    theta={(Math.PI * joint9Value) / 180}
                                >
                                    <Model
                                        url={'models/dog-modified-models/leg_4/dog_leg_shoulder-2_4.stl'}
                                        point={new THREE.Vector3(0, 0, 510)}
                                        axis={new THREE.Vector3(1, 0, 0)}
                                        theta={(Math.PI * joint10Value) / 180}
                                    >
                                        <Model url={'models/dog-modified-models/leg_4/dog_leg_link_4.stl'}>
                                            <Model url={'models/dog-modified-models/leg_4/dog_leg_leg_4.stl'}>
                                                <Model
                                                    url={'models/dog-modified-models/leg_4/dog_leg_knee_4.stl'}
                                                    point={new THREE.Vector3(0, -293, 509)}
                                                    axis={new THREE.Vector3(1, 0, 0)}
                                                    theta={(Math.PI * joint11Value) / 180}
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
                                    theta={(Math.PI * joint6Value) / 180}
                                >
                                    <Model
                                        url={'models/dog-modified-models/leg_3/dog_leg_shoulder-2_3.stl'}
                                        point={new THREE.Vector3(0, 0, 510)}
                                        axis={new THREE.Vector3(1, 0, 0)}
                                        theta={(Math.PI * joint7Value) / 180}
                                    >
                                        <Model url={'models/dog-modified-models/leg_3/dog_leg_link_3.stl'}>
                                            <Model url={'models/dog-modified-models/leg_3/dog_leg_leg_3.stl'}>
                                                <Model
                                                    url={'models/dog-modified-models/leg_3/dog_leg_knee_3.stl'}
                                                    point={new THREE.Vector3(0, -294, 512)}
                                                    axis={new THREE.Vector3(1, 0, 0)}
                                                    theta={(Math.PI * joint8Value) / 180}
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
                        <planeGeometry args={[500, 500]} />
                        <meshStandardMaterial color="#ffffff" />
                    </mesh>
                    <OrbitControls />
                    <CameraControls makeDefault />
                </Canvas>
            </Item>
        </Box>
    );
}
