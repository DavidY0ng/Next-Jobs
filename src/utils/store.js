import {readable} from 'svelte/store';
import { isLoggedIn } from './auth';

export const logInStatus = readable(null, function start(set) {


	return function stop() {};
});