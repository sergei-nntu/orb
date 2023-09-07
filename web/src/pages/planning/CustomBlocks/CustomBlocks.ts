import Blockly from 'blockly';
import {javascriptGenerator} from 'blockly/javascript';

Blockly.Blocks['set_position'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("SetPosition x:")
            .appendField(new Blockly.FieldNumber(0), "X")
            .appendField("y:")
            .appendField(new Blockly.FieldNumber(0), "Y")
            .appendField("z:")
            .appendField(new Blockly.FieldNumber(0), "Z")
            .appendField("pitch:")
            .appendField(new Blockly.FieldNumber(0), "PITCH")
            .appendField("roll:")
            .appendField(new Blockly.FieldNumber(0), "ROLL")
            .appendField("yaw:")
            .appendField(new Blockly.FieldNumber(0), "YAW");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(210);
        this.setTooltip("Set position and orientation");
    }
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
javascriptGenerator.forBlock['set_position'] = function(block) {
    const x = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.ORDER_ATOMIC) || '0';
    const y = javascriptGenerator.valueToCode(block, 'Y', javascriptGenerator.ORDER_ATOMIC) || '0';
    const z = javascriptGenerator.valueToCode(block, 'Z', javascriptGenerator.ORDER_ATOMIC) || '0';
    const pitch = javascriptGenerator.valueToCode(block, 'PITCH', javascriptGenerator.ORDER_ATOMIC) || '0';
    const roll = javascriptGenerator.valueToCode(block, 'ROLL', javascriptGenerator.ORDER_ATOMIC) || '0';
    const yaw = javascriptGenerator.valueToCode(block, 'YAW', javascriptGenerator.ORDER_ATOMIC) || '0';

    const code = `
        ${block.getFieldValue("X")}
        let x = ${x};
        let y = ${y};
        let z = ${z};
        let pitch = ${pitch};
        let roll = ${roll};
        let yaw = ${yaw};
    `;

    return code;
};

const delayJson = {
    "message0": "Delay %1 ms",
    "args0": [
        {"type": "field_number", "name": "DELAY", "value": 1000, "min": 1}
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 210
};

Blockly.Blocks['delay'] = {
    init: function() {
        this.jsonInit(delayJson);
        this.setTooltip("Add a delay in milliseconds");
    }
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
javascriptGenerator.forBlock['delay'] = function(block) {
    const delay = javascriptGenerator.valueToCode(block, 'DELAY', javascriptGenerator.ORDER_ATOMIC) || '0';

    return `
        let delay = ${delay};
    `;
};

const setGripperStepJson = {
    "message0": "SetGripperStep %1",
    "args0": [
        {"type": "field_number", "name": "STEP", "value": 0, "min": 0}
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 210
};

Blockly.Blocks['set_gripper_step'] = {
    init: function() {
        this.jsonInit(setGripperStepJson);
        this.setTooltip("Set the gripper step");
    }
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
javascriptGenerator.forBlock['set_gripper_step'] = function(block) {
    const set_gripper_step = javascriptGenerator.valueToCode(block, 'DELAY', javascriptGenerator.ORDER_ATOMIC) || '0';
    return `let set_gripper_step = ${set_gripper_step};`;
};