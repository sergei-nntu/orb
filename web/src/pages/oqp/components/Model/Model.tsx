import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { CameraControls, Html, OrbitControls, useProgress } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import React, { Dispatch, ReactNode, SetStateAction, Suspense, useEffect, useRef } from 'react';
import { BufferGeometry, Mesh, NormalBufferAttributes, Vector3 } from 'three';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { Item } from '../../../manipulator/components/StyledComponents/StyledComponents';
import { convertDeegreToRadian } from '../../../../utils';
import { IJointsStateOqp } from '../../../../types/appTypes';

export type OqpModelProps = {
    jointValue: IJointsStateOqp;
    setModelLoaded: Dispatch<SetStateAction<boolean>>;
};

const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff5d4',
}));

export default function Model(props: OqpModelProps) {
    const { jointValue, setModelLoaded } = props;

    function Loader() {
        const { progress } = useProgress();
        return <Html center>{Math.floor(progress)} % loaded</Html>;
    }

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

        useEffect(() => {
            setModelLoaded(true);
        }, []);

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
        <Box component="div" sx={{ marginTop: '8px' }}>
            <StyledPaper elevation={1}>
                <Item
                    sx={{
                        height: '750px',
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
                                        theta={convertDeegreToRadian(jointValue.Front_Left_Shoulder)}
                                    >
                                        <Model
                                            url={'models/dog-modified-models/leg_1/dog_leg_shoulder-2_1.stl'}
                                            point={new THREE.Vector3(0, 0, 17)}
                                            axis={new THREE.Vector3(1, 0, 0)}
                                            theta={convertDeegreToRadian(jointValue.Front_Left_Reductor)}
                                        >
                                            <Model url={'models/dog-modified-models/leg_1/dog_leg_link_1.stl'}>
                                                <Model url={'models/dog-modified-models/leg_1/dog_leg_leg_1.stl'}>
                                                    <Model
                                                        url={'models/dog-modified-models/leg_1/dog_leg_knee_1.stl'}
                                                        point={new THREE.Vector3(0, -295, 18)}
                                                        axis={new THREE.Vector3(1, 0, 0)}
                                                        theta={convertDeegreToRadian(jointValue.Front_Left_Knee)}
                                                    >
                                                        <Model
                                                            url={'models/dog-modified-models/leg_1/dog_leg_shin_1.stl'}
                                                        >
                                                            <Model
                                                                url={
                                                                    'models/dog-modified-models/leg_1/dog_leg_foot_1.stl'
                                                                }
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
                                        theta={convertDeegreToRadian(jointValue.Front_Right_Shoulder)}
                                    >
                                        <Model
                                            url={'models/dog-modified-models/leg_2/dog_leg_shoulder-2_2.stl'}
                                            point={new THREE.Vector3(0, 0, 17)}
                                            axis={new THREE.Vector3(1, 0, 0)}
                                            theta={convertDeegreToRadian(jointValue.Front_Right_Reductor)}
                                        >
                                            <Model url={'models/dog-modified-models/leg_2/dog_leg_link_2.stl'}>
                                                <Model url={'models/dog-modified-models/leg_2/dog_leg_leg_2.stl'}>
                                                    <Model
                                                        url={'models/dog-modified-models/leg_2/dog_leg_knee_2.stl'}
                                                        point={new THREE.Vector3(0, -294, 18)}
                                                        axis={new THREE.Vector3(1, 0, 0)}
                                                        theta={convertDeegreToRadian(jointValue.Front_Right_Knee)}
                                                    >
                                                        <Model
                                                            url={'models/dog-modified-models/leg_2/dog_leg_shin_2.stl'}
                                                        >
                                                            <Model
                                                                url={
                                                                    'models/dog-modified-models/leg_2/dog_leg_foot_2.stl'
                                                                }
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
                                        theta={convertDeegreToRadian(jointValue.Rear_Right_Shoulder)}
                                    >
                                        <Model
                                            url={'models/dog-modified-models/leg_4/dog_leg_shoulder-2_4.stl'}
                                            point={new THREE.Vector3(0, 0, 510)}
                                            axis={new THREE.Vector3(1, 0, 0)}
                                            theta={convertDeegreToRadian(jointValue.Rear_Right_Reductor)}
                                        >
                                            <Model url={'models/dog-modified-models/leg_4/dog_leg_link_4.stl'}>
                                                <Model url={'models/dog-modified-models/leg_4/dog_leg_leg_4.stl'}>
                                                    <Model
                                                        url={'models/dog-modified-models/leg_4/dog_leg_knee_4.stl'}
                                                        point={new THREE.Vector3(0, -293, 509)}
                                                        axis={new THREE.Vector3(1, 0, 0)}
                                                        theta={convertDeegreToRadian(jointValue.Rear_Right_Knee)}
                                                    >
                                                        <Model
                                                            url={'models/dog-modified-models/leg_4/dog_leg_shin_4.stl'}
                                                        >
                                                            <Model
                                                                url={
                                                                    'models/dog-modified-models/leg_4/dog_leg_foot_4.stl'
                                                                }
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
                                        theta={convertDeegreToRadian(jointValue.Rear_Left_Shoulder)}
                                    >
                                        <Model
                                            url={'models/dog-modified-models/leg_3/dog_leg_shoulder-2_3.stl'}
                                            point={new THREE.Vector3(0, 0, 510)}
                                            axis={new THREE.Vector3(1, 0, 0)}
                                            theta={convertDeegreToRadian(jointValue.Rear_Left_Reductor)}
                                        >
                                            <Model url={'models/dog-modified-models/leg_3/dog_leg_link_3.stl'}>
                                                <Model url={'models/dog-modified-models/leg_3/dog_leg_leg_3.stl'}>
                                                    <Model
                                                        url={'models/dog-modified-models/leg_3/dog_leg_knee_3.stl'}
                                                        point={new THREE.Vector3(0, -294, 512)}
                                                        axis={new THREE.Vector3(1, 0, 0)}
                                                        theta={convertDeegreToRadian(jointValue.Rear_Left_Knee)}
                                                    >
                                                        <Model
                                                            url={'models/dog-modified-models/leg_3/dog_leg_shin_3.stl'}
                                                        >
                                                            <Model
                                                                url={
                                                                    'models/dog-modified-models/leg_3/dog_leg_foot_3.stl'
                                                                }
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
            </StyledPaper>
        </Box>
    );
}
