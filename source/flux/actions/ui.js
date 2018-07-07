import { START_SPINNING, STOP_SPINNING } from './typets';

export const startSpinning = (isSpinning) => ({
    type:   START_SPINNING,
    payload: isSpinning,
});

export const stopSpinning = (isSpinning) => ({
    type:   STOP_SPINNING,
    payload: isSpinning,
});