import React from 'react';
import { Ellipse, Path } from 'react-paper-bindings';
import { Canvas, Layer, View } from 'react-paper-bindings';

import { ILimitSwitchInfo } from '../../../../types/appTypes';

type CanvasProps = {
    limitSwitchInfo: ILimitSwitchInfo;
};

export default function CartDrow(props: CanvasProps) {
    const { limitSwitchInfo } = props;

    return (
        <Canvas width={200} height={200}>
            <View>
                <Layer>
                    <Ellipse center={[100, 100]} size={[50, 25]} strokeWidth={5.5} strokeColor={'#61DAFB'} />
                    <Path
                        segments={[
                            [30, 30],
                            [170, 30],
                            [170, 170],
                            [30, 170],
                            [30, 30],
                        ]}
                        strokeColor="black"
                        strokeWidth={5}
                        strokeCap="round"
                        strokeJoin="round"
                        selected="true"
                    />
                    <Path
                        segments={[
                            [30, 70],
                            [30, 30],
                            [70, 30],
                        ]}
                        strokeColor={limitSwitchInfo.front === 1 ? 'red' : 'blue'}
                        strokeWidth={10}
                        strokeCap="round"
                        strokeJoin="round"
                        selected="true"
                    />
                    <Path
                        segments={[
                            [170, 70],
                            [170, 30],
                            [130, 30],
                        ]}
                        strokeColor={limitSwitchInfo.rear === 1 ? 'red' : 'blue'}
                        strokeWidth={10}
                        strokeCap="round"
                        strokeJoin="round"
                        selected="true"
                    />
                    <Path
                        segments={[
                            [70, 170],
                            [30, 170],
                            [30, 130],
                        ]}
                        strokeColor={limitSwitchInfo.left === 1 ? 'red' : 'blue'}
                        strokeWidth={10}
                        strokeCap="round"
                        strokeJoin="round"
                        selected="true"
                    />
                    <Path
                        segments={[
                            [130, 170],
                            [170, 170],
                            [170, 130],
                        ]}
                        strokeColor={limitSwitchInfo.right === 1 ? 'red' : 'blue'}
                        strokeWidth={10}
                        strokeCap="round"
                        strokeJoin="round"
                        selected="true"
                    />
                </Layer>
            </View>
        </Canvas>
    );
}
