// import styled from '@emotion/styled';
// import { Paper } from '@mui/material';
// import Box from '@mui/material/Box';
import { Canvas, useLoader } from '@react-three/fiber';
import React, { ReactNode, Suspense, useEffect, useRef } from 'react';
import { CameraControls, OrbitControls } from '@react-three/drei';
import { BufferGeometry, Mesh, NormalBufferAttributes, Vector3 } from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import * as THREE from 'three';
// const StyledPaper = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fffFFF',
// }));

export default function Dog() {
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
                <spotLight visible castShadow position={[-1, 3, -1]} color="#FFFFFF" intensity={5} />
            </>
        );
    }

    return (
        <Canvas>
            <Lights />
            <ambientLight />
            <Suspense>
                {/* eslint-disable-next-line react/no-unknown-property */}
                <group rotation={[0, 0, 1.6]} position={[0, 3, 0]} scale={[0.01, 0.01, 0.01]}>
                    <Model
                        url={'models/dog_foot_simple.stl'}
                        point={new THREE.Vector3(1, 1, 1)}
                        axis={new THREE.Vector3(20, 0, 1)}
                    >
                        <Model
                            url={'models/dog_shin_simple.stl'}
                            point={new THREE.Vector3(1, 1, 1)}
                            axis={new THREE.Vector3(20, 0, 1)}
                        >
                            <Model
                                url={'models/dog_knee_simple.stl'}
                                point={new THREE.Vector3(1, 1, 1)}
                                axis={new THREE.Vector3(20, 0, 1)}
                            >
                                <Model
                                    url={'models/dog_leg_simple.stl'}
                                    point={new THREE.Vector3(1, 1, 1)}
                                    axis={new THREE.Vector3(20, 0, 1)}
                                ></Model>
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
    );
}
