import { SessionStore } from './session.store';
import { userService } from '../data-services';

export const sessionStore = new SessionStore(userService);

export const GlobalStore: GlobalStoreInterface = {
  session: sessionStore,
};

export interface GlobalStoreInterface {
  session: SessionStore;
}
