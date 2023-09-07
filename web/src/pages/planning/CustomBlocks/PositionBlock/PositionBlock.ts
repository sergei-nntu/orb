import Blockly from 'blockly';
import {javascriptGenerator} from "blockly/javascript";

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
javascriptGenerator.forBlock['set_position'] = function(block) {
    return `setPosition(${block.getFieldValue("X")}, ${block.getFieldValue("Y")}, ${block.getFieldValue("Z")}, ${block.getFieldValue("PITCH")}, ${block.getFieldValue("ROLL")}, ${block.getFieldValue("YAW")})\n`;
};
