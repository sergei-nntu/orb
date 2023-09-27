import React, { Component, RefObject } from 'react';
import {javascriptGenerator} from 'blockly/javascript';
import Blockly from 'blockly';
import DarkTheme from '@blockly/theme-dark';
import Box from "@mui/material/Box";
import {KEY} from "../../../../constants";

interface BlocklyEditorProps {
    toolboxXML: string;
}

// TODO: when it will be time, this component should be rewritten as function component with using hooks
class BlocklyEditor extends Component<BlocklyEditorProps> {
    private readonly blocklyDiv: RefObject<HTMLDivElement>;
    private workspace: Blockly.WorkspaceSvg | null = null;

    constructor(props: BlocklyEditorProps) {
        super(props);
        this.blocklyDiv = React.createRef();
    }

    componentDidMount() {
        if (typeof Blockly !== 'undefined' && this.blocklyDiv.current) {
            const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const theme = prefersDarkTheme ? DarkTheme : null;
            this.workspace = Blockly.inject(this.blocklyDiv.current, {
                theme,
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
            localStorage.setItem(KEY.BLOCKLY_CODE, code);
        }
    };

    render() {
        return (
            <Box ref={this.blocklyDiv} sx={{ height: '80%', width: '100%' }} />
        );
    }
}

export default BlocklyEditor;
