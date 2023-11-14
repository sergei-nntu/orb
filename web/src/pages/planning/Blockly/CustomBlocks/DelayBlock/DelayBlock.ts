import Blockly from 'blockly';
import { pythonGenerator } from 'blockly/python';

const delayJson = {
    message0: 'Delay %1 ms',
    args0: [{ type: 'field_number', name: 'DELAY', value: 1000, min: 1 }],
    previousStatement: null,
    nextStatement: null,
    colour: 300,
};

Blockly.Blocks['delay'] = {
    init: function () {
        this.jsonInit(delayJson);
        this.setTooltip('Add a delay in milliseconds');
    },
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
pythonGenerator.forBlock['delay'] = function (block) {
    const blockId = block.id;
    const delayValue = block.getFieldValue('DELAY');
    return `set_active_block_id('${blockId}')\norm_blockly_delay(${delayValue})\nif should_terminate_function(): return\n`;
};
