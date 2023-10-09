import React, { Component, RefObject } from 'react';
import {pythonGenerator} from 'blockly/python';
import Blockly from 'blockly';
import DarkTheme from '@blockly/theme-dark';
import Box from "@mui/material/Box";
import {API_ROUTES, KEY} from "../../../../constants";

interface BlocklyEditorProps {
    toolboxXML: string;
}

// TODO: when it will be time, this component should be rewritten as function component with using hooks
class BlocklyEditor extends Component<BlocklyEditorProps> {
    private readonly blocklyDiv: RefObject<HTMLDivElement>;
    private workspace: Blockly.WorkspaceSvg | null = null;
    private interval: string | number | NodeJS.Timeout | undefined;
    private highlightedBlockId: string | undefined;

    constructor(props: BlocklyEditorProps) {
        super(props);
        this.blocklyDiv = React.createRef();
        this.state = {};
    }

    componentDidMount() {
        if (typeof Blockly !== 'undefined' && this.blocklyDiv.current) {
            const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const theme = prefersDarkTheme ? DarkTheme : null;
            this.workspace = Blockly.inject(this.blocklyDiv.current, {
                theme,
                toolbox: this.props.toolboxXML,
            });

            fetch(API_ROUTES.GET_ACTIVE_PROGRAM, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=utf-8',
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data.structure);
                    console.log("RESPONSE", JSON.parse(data.structure));
                    if (this.workspace) {
                        Blockly.serialization.workspaces.load(JSON.parse(data.structure), this.workspace);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });

            this.workspace.addChangeListener(this.handleWorkspaceChange);
        }
        this.interval = setInterval(this.requestAndHighlightBlock, 200);
    }

    componentWillUnmount() {
        clearInterval(this.interval);

        if (this.workspace) {
            this.workspace.removeChangeListener(this.handleWorkspaceChange);
            this.workspace.dispose();
        }

        fetch(API_ROUTES.SET_ACTIVE_PROGRAM, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                source: localStorage.getItem(KEY.BLOCKLY_CODE),
                structure: localStorage.getItem(KEY.BLOCKLY_STRUCTURE)
            })
        });
    }

    highlightBlock() {
        if (this.highlightedBlockId) {
            this.workspace!.highlightBlock(this.highlightedBlockId);
        }
    }

    requestAndHighlightBlock = () => {
        fetch(API_ROUTES.GET_PROGRAM_STATE, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
            }
        })
            .then(response => response.json())
            .then(data => {
                this.highlightedBlockId = data.id;
                this.highlightBlock();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    handleWorkspaceChange = () => {
        if (this.workspace) {
            const code = pythonGenerator.workspaceToCode(
                this.workspace
            );
            localStorage.setItem(KEY.BLOCKLY_CODE, code);
            this.setState(Blockly.serialization.workspaces.save(this.workspace));
            localStorage.setItem(KEY.BLOCKLY_STRUCTURE, JSON.stringify(this.state));
        }
    };

    render() {
        return (
            <Box ref={this.blocklyDiv} sx={{ height: '80%', width: '100%' }} />
        );
    }
}

export default BlocklyEditor;
