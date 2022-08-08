import { createGlobalState } from 'react-hooks-global-state';

const {setGlobalState, useGlobalState } = createGlobalState({ customerID: null, itemLength: true });

// const {setGlobalState, useGlobalState } = createGlobalState({ customerID: "hmy" });

export {setGlobalState, useGlobalState };