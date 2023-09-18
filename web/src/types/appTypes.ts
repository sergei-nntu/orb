type Action<K, V = void> = V extends void ? { type: K } : { type: K } & V;

export interface IPose {
    position: {
        x: number,
        y: number,
        z: number
    },
    orientation: {
        pitch: number,
        roll: number,
        yaw: number
    },
    gripper_state: number
}

export type PoseActionType =
    | Action<'TEST'>;
    // | Action<'SEARCH', { value: number }>;