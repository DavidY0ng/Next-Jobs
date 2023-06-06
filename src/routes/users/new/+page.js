import { getTokenFromLocalStorage } from '../../../utils/auth.js';
import { goto } from '$app/navigation';

export async function load () {
    if (getTokenFromLocalStorage()) {
        goto ('/')
    }
}