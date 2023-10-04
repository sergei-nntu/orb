import Blockly from 'blockly';
import {pythonGenerator} from 'blockly/python';

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
        this.setColour(300);
        this.setTooltip("Set position and orientation");
    }
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
pythonGenerator.forBlock['set_position'] = function(block) {
    const xValue = block.getFieldValue("X");
    const yValue = block.getFieldValue("Y");
    const zValue = block.getFieldValue("Z");
    const pitchValue = block.getFieldValue("PITCH");
    const rollValue = block.getFieldValue("ROLL");
    const yawValue = block.getFieldValue("YAW");

    return `orm_blockly_set_position(${xValue}, ${yValue}, ${zValue}, ${pitchValue}, ${rollValue}, ${yawValue});\nif should_terminate_function(): return\n`;
};
