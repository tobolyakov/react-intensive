import { START_SPINNING, STOP_SPINNING } from './typets';

export const startSpinning = (spinning) => ({
    type:   START_SPINNING,
    payload: true,
});

export const stopSpinning = (spinning) => ({
    type:   STOP_SPINNING,
    payload: false,
});