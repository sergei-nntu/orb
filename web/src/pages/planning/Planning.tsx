import React from 'react';
import BlocklyEditor from './BlocklyEditor/BlocklyEditor';
import "./CustomBlocks/DelayBlock/DelayBlock";
import "./CustomBlocks/PositionBlock/PositionBlock";
import "./CustomBlocks/GripperStepBlock/GripperStepBlock";

const toolboxXML =
    "<xml>" +
        "<block type='controls_if'></block>" +
        "<block type='logic_boolean'></block>" +
        "<block type='math_number' gap='30'>" +
            "<field name='NUM'>1</field>" +
        "</block>" +
        "<block type='controls_whileUntil'></block>" +
        "<block type='controls_for'></block>" +
        "<block type='set_position'></block>" +
        "<block type='delay'></block>" +
        "<block type='set_gripper_step'></block>" +
    "</xml>";

export default function Planning() {
    return (
        <BlocklyEditor toolboxXML={toolboxXML} />
    );
}