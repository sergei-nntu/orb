import DarkTheme from '@blockly/theme-dark';
import Box from '@mui/material/Box';
import Blockly, { Workspace } from 'blockly';
import { pythonGenerator } from 'blockly/python';
import React, { useEffect, useRef } from 'react';

import { API_ROUTES, KEY } from '../../../../constants';
import useHttp from '../../../../hooks/Http/Http';

type BlocklyEditorProps = {
    toolboxXML: string;
};

const BlocklyEditor = (props: BlocklyEditorProps) => {
    const { toolboxXML } = props;
    const { request } = useHttp();
    const blocklyDiv = useRef<string | Element>(null);
    const workspace = useRef<Workspace | undefined>(undefined);
    const interval = useRef<string | number | NodeJS.Timeout | undefined>(undefined);

    useEffect(() => {
        if (typeof Blockly !== 'undefined' && blocklyDiv.current) {
            const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const theme = prefersDarkTheme ? DarkTheme : null;
            workspace.current = Blockly.inject(blocklyDiv.current, {
                theme,
                toolbox: toolboxXML,
            });

            (async () => {
                const data = await request(API_ROUTES.GET_ACTIVE_PROGRAM);

                if (data.structure) {
                    const structure = JSON.parse(data.structure);
                    if (workspace.current) {
                        Blockly.serialization.workspaces.load(structure, workspace.current);
                    }
                    return;
                }

                console.log('localStorage was cleaned');
                localStorage.clear();
            })();

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

    const highlightBlock = (highlightedBlockId: string) => {
        if (workspace.current) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            workspace.current.highlightBlock(highlightedBlockId);
        }
    };

    const requestAndHighlightBlock = async () => {
        const data = await request(API_ROUTES.GET_PROGRAM_STATE);
        highlightBlock(data.id);
    };

    const handleWorkspaceChange = () => {
        if (workspace.current) {
            const code = pythonGenerator.workspaceToCode(workspace.current);
            localStorage.setItem(KEY.BLOCKLY_CODE, code);
            localStorage.setItem(
                KEY.BLOCKLY_STRUCTURE,
                JSON.stringify(Blockly.serialization.workspaces.save(workspace.current)),
            );
        }
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <Box ref={blocklyDiv} sx={{ height: '80%', width: '100%' }} />;
};

export default BlocklyEditor;
