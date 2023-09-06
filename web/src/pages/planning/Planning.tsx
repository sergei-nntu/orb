import React from 'react';
import BlocklyEditor from './BlocklyEditor/BlocklyEditor';

export default function Planning() {
    const toolboxXML = "<xml><block type='controls_if'></block></xml>";
    return (
        <BlocklyEditor toolboxXML={toolboxXML} />
    );
}