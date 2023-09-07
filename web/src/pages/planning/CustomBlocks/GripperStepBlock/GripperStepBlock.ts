import Blockly from 'blockly';
import {javascriptGenerator} from 'blockly/javascript';

const setGripperStepJson = {
    "message0": "SetGripperStep %1°",
    "args0": [
        {"type": "field_number", "name": "STEP", "value": 0, "min": 0}
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 300
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
    return `setGripperStep(${block.getFieldValue("STEP")});\n`;
};