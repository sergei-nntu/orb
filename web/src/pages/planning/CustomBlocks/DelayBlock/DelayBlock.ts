import Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';

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
javascriptGenerator.forBlock['delay'] = function (block) {
    return `delay(${block.getFieldValue('DELAY')});\n`;
};
