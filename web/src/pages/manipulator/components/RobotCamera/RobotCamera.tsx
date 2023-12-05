import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { CameraControls, Html, OrbitControls, useProgress } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import React, { ReactNode, useEffect, useRef } from 'react';
import { Suspense } from 'react';
import * as THREE from 'three';
import { BufferGeometry, Mesh, NormalBufferAttributes, Vector3 } from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

import { IJointsState } from '../../../../types/appTypes';
import { Item } from '../StyledComponents/StyledComponents';

const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff5d4',
}));

export default function RobotCamera({ shoulder, upperArm, forearm, wrist1, wrist2, endEffectorLink }: IJointsState) {
    function Loader() {
        const { progress } = useProgress();
        return <Html center>{progress} % loaded</Html>;
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
        const geom = useLoader(STLLoader, url);
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
                    <primitive object={geom} attach="geometry" />
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
                <ambientLight visible color="#FFF5D4" intensity={0.5} />
                {/* eslint-disable-next-line react/no-unknown-property */}
                <directionalLight visible castShadow position={[-1, 3, -1]} color="#FFF5D4" intensity={0.5} />
                {/* eslint-disable-next-line react/no-unknown-property */}
                <pointLight visible castShadow position={[-1, 3, -1]} color="#FFF5D4" intensity={5} />
                {/* eslint-disable-next-line react/no-unknown-property */}
                <spotLight visible castShadow position={[-1, 3, -1]} color="#FFF5D4" intensity={5} />
            </>
        );
    }

    return (
        <Box component="div" sx={{ flex: 1, marginTop: '8px' }}>
            <StyledPaper elevation={1}>
                <Item
                    sx={{
                        minHeight: '80vh',
                        height: '100px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Canvas shadows camera={{ position: [1, 1.5, -1] }}>
                        <Lights />
                        <Suspense fallback={<Loader />}>
                            {/* eslint-disable-next-line react/no-unknown-property */}
                            <group rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                                <Model url={'models/base_link_m-binary.stl'} color="#ffffaa">
                                    <Model
                                        url={'models/shoulder__1_m-binary.stl'}
                                        point={new THREE.Vector3(0.000666, -0.07459, 0.106659)}
                                        axis={new THREE.Vector3(0, 0, 1)}
                                        theta={shoulder}
                                    >
                                        <Model
                                            url={'models/upper_arm__1_m-binary.stl'}
                                            point={new THREE.Vector3(0, -0.0745, 0.16385)}
                                            axis={new THREE.Vector3(1, 0, 0)}
                                            theta={upperArm}
                                        >
                                            <Model
                                                url={'models/upper_arm__1_m-binary.stl'}
                                                point={new THREE.Vector3(0, -0.0745, 0.16385)}
                                                axis={new THREE.Vector3(1, 0, 0)}
                                                theta={-forearm}
                                            >
                                                <Model
                                                    url={'models/Forearm__1_m-binary.stl'}
                                                    point={new THREE.Vector3(0, -0.0745, 0.36699)}
                                                    axis={new THREE.Vector3(1, 0, 0)}
                                                    theta={wrist1}
                                                >
                                                    <Model
                                                        url={'models/wrist_2__1_m-binary.stl'}
                                                        point={new THREE.Vector3(0.0022, -0.0745, 0)}
                                                        axis={new THREE.Vector3(0, 0, 1)}
                                                        theta={wrist2}
                                                    >
                                                        <Model
                                                            url={'models/end_effector_link__1_m-binary.stl'}
                                                            point={new THREE.Vector3(0.00206, 0, 0.60275)}
                                                            axis={new THREE.Vector3(0, 1, 0)}
                                                            theta={endEffectorLink}
                                                        />
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
                                <meshStandardMaterial color="white" />
                            </mesh>
                            <OrbitControls />
                            <CameraControls makeDefault />
                        </Canvas>
                    </Item>
                </StyledPaper>
            </Box>
        </Grid>
    );
}
