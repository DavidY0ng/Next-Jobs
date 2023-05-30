import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
import { getTokenFromLocalStorage } from '../../../../utils/auth';
import { getUserId } from '../../../../utils/auth';
import {goto} from '$app/navigation';

export async function load({ fetch, params}) {
  
  if (!getUserId()) {
    goto (`/jobs/${params.slug}`)
  }
  
  const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/api/collections/jobs/records/${params.slug}`);

  const res = await resp.json();
  if (resp.status == 200) {
    return {
      job: res
    }
  } else {
    return {
      jobs: []
    }
  }
}
