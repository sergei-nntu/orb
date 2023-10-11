import React, {RefObject, useEffect, useRef, useState} from 'react';
import { pythonGenerator } from 'blockly/python';
import Blockly, {Workspace} from 'blockly';
import DarkTheme from '@blockly/theme-dark';
import Box from '@mui/material/Box';
import { API_ROUTES, KEY } from '../../../../constants';

type BlocklyEditorProps = {
    toolboxXML: string
};

const BlocklyEditor = (props: BlocklyEditorProps) => {
    const {toolboxXML} = props;
    const blocklyDiv = useRef<RefObject<HTMLDivElement>>(null);
    const workspace = useRef<Workspace | undefined>(undefined);
    const interval = useRef<string | number | NodeJS.Timeout | undefined>(undefined);
    const [highlightedBlockId, setHighlightedBlockId] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (typeof Blockly !== 'undefined' && blocklyDiv.current) {
            const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const theme = prefersDarkTheme ? DarkTheme : null;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            workspace.current = Blockly.inject(blocklyDiv.current, {
                theme,
                toolbox: toolboxXML,
            });

            fetch(API_ROUTES.GET_ACTIVE_PROGRAM, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json;charset=utf-8',
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('res from server', data.structure);
                    if (data.structure) {
                        const structure = JSON.parse(data.structure);
                        if (workspace.current) {
                            Blockly.serialization.workspaces.load(structure, workspace.current);
                        }
                    } else {
                        console.log('localStorage was cleaned');
                        localStorage.clear();
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

            workspace.current.addChangeListener(handleWorkspaceChange);
        }

        interval.current = setInterval(requestAndHighlightBlock, 200);

        return () => {
            clearInterval(interval.current);
            if (workspace.current) {
                workspace.current.removeChangeListener(handleWorkspaceChange);
                workspace.current.dispose();
            }
        };
    }, [toolboxXML]);

    const highlightBlock = () => {
        if (highlightedBlockId && workspace.current) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            workspace.current.highlightBlock(highlightedBlockId);
        }
    };

    const requestAndHighlightBlock = () => {
        fetch(API_ROUTES.GET_PROGRAM_STATE, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setHighlightedBlockId(data.id);
                highlightBlock();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleWorkspaceChange = () => {
        if (workspace.current) {
            const code = pythonGenerator.workspaceToCode(workspace.current);
            localStorage.setItem(KEY.BLOCKLY_CODE, code);
            localStorage.setItem(KEY.BLOCKLY_STRUCTURE, JSON.stringify(Blockly.serialization.workspaces.save(workspace.current)));
        }
    };

    return <Box ref={blocklyDiv} sx={{ height: '80%', width: '100%' }} />;
};

export default BlocklyEditor;
