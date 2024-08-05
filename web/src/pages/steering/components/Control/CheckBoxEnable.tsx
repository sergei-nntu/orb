import { Checkbox, FormControlLabel } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { API_ROUTES } from '../../../../constants';
import useHttp from '../../../../hooks/Http/Http';

export default function CheckBoxEnable() {
    const { request } = useHttp();
    const [checked, setChecked] = useState<boolean[] | number>(0);

    const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked([event.target.checked]);
        const isChecked = event.target.checked;
        const numberChecks = isChecked ? 1 : 0;
        setChecked(numberChecks);
        return;
    };

    const sendEnableStateToServer = async () => {
        try {
            const options = {
                method: 'POST',
                body: JSON.stringify({
                    enable_pin: checked,
                }),
            };

            await request(API_ROUTES.POST_ENABLE_STEPPER_MOTORS, options);
            // const resp = await request(API_ROUTES.POST_ENABLE_STEPPER_MOTORS, options);
            // console.log('RESP', resp);
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    useEffect(() => {
        sendEnableStateToServer().then((err) => {
            if (err != undefined) {
                console.log(err);
            }
        });
    }, [checked]);

    return <FormControlLabel control={<Checkbox onChange={handleChangeCheckBox} />} label="Force Stop" />;
}
