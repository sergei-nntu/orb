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

export default function RobotCamera({
    shoulder,
    upperArm,
    forearm,
    wrist1,
    wrist2,
    endEffectorLink,
    claws,
}: IJointsState) {
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
                <pointLight visible position={[-1, 4, 2]} color="#FFF5D4" intensity={5} />
                {/* eslint-disable-next-line react/no-unknown-property */}
                <spotLight visible castShadow position={[-1, 8, -1]} color="#FFF5D4" intensity={8} />
            </>
        );
    }

    return (
        <Grid item sm={12} md={4} lg={6}>
            <Box component="div" sx={{ flex: 1, ml: { xs: 1, md: 0 } }}>
                <StyledPaper elevation={1}>
                    <Item
                        sx={{
                            minHeight: { md: '725px', sm: '50vh', xs: '70vh' },
                            height: '100px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Canvas shadows camera={{ position: [0, 0.7, -1] }}>
                            <Lights />
                            <Suspense fallback={<Loader />}>
                                {/* eslint-disable-next-line react/no-unknown-property */}
                                <group rotation={[-1.55, 0, 0]}>
                                    <Model url={'models/orm-modified-models/base_link.stl'} color="#ffffaa">
                                        <Model
                                            url={'models/orm-modified-models/shoulder.stl'}
                                            point={new THREE.Vector3(0.000666, -0.07459, 0.106659)}
                                            axis={new THREE.Vector3(0, 0, 1)}
                                            theta={shoulder}
                                        >
                                            <Model
                                                url={'models/orm-modified-models/upper_arm.stl'}
                                                point={new THREE.Vector3(0, -0.075, 0.122)}
                                                axis={new THREE.Vector3(1, 0, 0)}
                                                theta={upperArm}
                                            >
                                                <Model
                                                    url={'models/orm-modified-models/forearm.stl'}
                                                    point={new THREE.Vector3(0, -0.076, 0.35)}
                                                    axis={new THREE.Vector3(1, 0, 0)}
                                                    theta={-forearm}
                                                >
                                                    <Model
                                                        url={'models/orm-modified-models/wrist_link_1.stl'}
                                                        point={new THREE.Vector3(0, -0.076, 0.566)}
                                                        axis={new THREE.Vector3(1, 0, 0)}
                                                        theta={wrist1}
                                                    >
                                                        <Model
                                                            url={'models/orm-modified-models/wrist_link_2.stl'}
                                                            point={new THREE.Vector3(0.118, -0.075, 0)}
                                                            axis={new THREE.Vector3(0, 0, 1)}
                                                            theta={wrist2}
                                                        >
                                                            <Model
                                                                url={
                                                                    'models/orm-modified-models/gripper_without_claws.stl'
                                                                }
                                                                point={new THREE.Vector3(0.117, 0, 0.643)}
                                                                axis={new THREE.Vector3(0, 1, 0)}
                                                                theta={endEffectorLink}
                                                            >
                                                                <Model
                                                                    url={
                                                                        'models/orm-modified-models/gripper_claw_right.stl'
                                                                    }
                                                                    point={new THREE.Vector3(0.115, 0.025, 0)}
                                                                    axis={new THREE.Vector3(0, 0, 1)}
                                                                    theta={-claws}
                                                                ></Model>
                                                                <Model
                                                                    url={
                                                                        'models/orm-modified-models/gripper_claw_left.stl'
                                                                    }
                                                                    point={new THREE.Vector3(0.12, 0.02, 0)}
                                                                    axis={new THREE.Vector3(0, 0, 1)}
                                                                    theta={claws}
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
