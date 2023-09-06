import React, { Component, RefObject } from 'react';
import {javascriptGenerator} from 'blockly/javascript';
import Blockly from 'blockly';

interface BlocklyEditorProps {
    toolboxXML: string;
}

class BlocklyEditor extends Component<BlocklyEditorProps> {
    private readonly blocklyDiv: RefObject<HTMLDivElement>;
    private workspace: Blockly.WorkspaceSvg | null = null;

    constructor(props: BlocklyEditorProps) {
        super(props);
        this.blocklyDiv = React.createRef();
    }

    componentDidMount() {
        if (typeof Blockly !== 'undefined' && this.blocklyDiv.current) {
            this.workspace = Blockly.inject(this.blocklyDiv.current, {
                toolbox: this.props.toolboxXML,
            });
            this.workspace.addChangeListener(this.handleWorkspaceChange);
        }
    }

    componentWillUnmount() {
        if (this.workspace) {
            this.workspace.removeChangeListener(this.handleWorkspaceChange);
            this.workspace.dispose();
        }
    }

    handleWorkspaceChange = () => {
        if (this.workspace) {
            const code = javascriptGenerator.workspaceToCode(
                this.workspace
            );
            console.log(code);
        }
    };

    render() {
        return (
            <div ref={this.blocklyDiv} style={{ height: '80%', width: '100%' }}></div>
        );
    }
}

export default BlocklyEditor;
