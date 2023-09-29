import Blockly from 'blockly';
import {pythonGenerator} from 'blockly/python';

const setGripperStateJson = {
    "message0": "SetGripperState %1°",
    "args0": [
        {"type": "field_number", "name": "STATE", "value": 0, "min": 0}
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 300
};

Blockly.Blocks['set_gripper_state'] = {
    init: function() {
        this.jsonInit(setGripperStateJson);
        this.setTooltip("Set the gripper state");
    }
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
pythonGenerator.forBlock['set_gripper_state'] = function(block) {
    const stateValue = block.getFieldValue("STATE");
    return `orm_blockly_set_gripper_state(${stateValue});\n`;
};