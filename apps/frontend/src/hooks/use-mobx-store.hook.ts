import { useContext } from 'react';
import { GlobalStoreContext } from '../context';

const useMobxStoreHook = () => useContext(GlobalStoreContext);
export default useMobxStoreHook;
