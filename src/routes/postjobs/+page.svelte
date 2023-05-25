<script>
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
    import {goto} from '$app/navigation';
    import {getTokenFromLocalStorage} from '../../utils/auth.js';
    import {getUserId} from '../../utils/auth.js'
    let formErrors = {};

    function postPostJob() {
      goto('/');
    }

    async function createJob (evt) {
        if (!getTokenFromLocalStorage()) {
            return false
        }

        evt.preventDefault()

        
  try {
    const jobData = {
        user : getUserId(),
        title : evt.target['title'].value,
        minAnnualCompensation : evt.target['minIncome'].value,
        maxAnnualCompensation : evt.target['maxIncome'].value,
        description : evt.target['description'].value,
        requirements : evt.target['requirements'].value,
        applicationInstructions : evt.target['applicationInstructions'].value,
        location : evt.target['location'].value,
        employer: evt.target['employer'].value
        }

    const resp = await fetch(
      PUBLIC_BACKEND_BASE_URL + '/api/collections/jobs/records',
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getTokenFromLocalStorage()
        },
        body: JSON.stringify(jobData)
      }
    );

    const res = await resp.json()

    if (resp.status == 200) {
        

      localStorage.setItem("auth", JSON.stringify({
        "token": res.token,
        "userId": res.record.id
      }));

      return true
    }
    
    return false
  } catch {
    return false
  }
}
</script>

<h1 class="text-center text-xl">Post a job</h1>
<a class = "btn btn-md bg-transparent font-bold" href="/">Homepage</a>
<div class="text-center">
    <a class="link-hover italic text-xs" href="/users/login">Already have an account? Click here to login instead.</a>
</div>
<div class="flex justify-center items-center mt-8">
    <form on:submit={createJob} class="w-1/3">
        <div class="form-control w-full">
            <label class="label" for="title">
                <span class="label-text">Title</span>
            </label>
            <input type="text" name="title" placeholder="Software Engineer" class="input input-bordered w-full" />
            {#if 'title' in formErrors}
            <label class="label" for="title">
                <span class="label-text-alt text-red-500">{formErrors['title'].message}</span>
            </label>
            {/if}
        </div>

        <div class="form-control w-full">
            <label class="label" for="minIncome">
                <span class="label-text">Min Annual Income</span>
            </label>
            <input type="minIncome" name="minIncome" placeholder="MYR 20,000" class="input input-bordered w-full" required />
            {#if 'minIncome' in formErrors}
            <label class="label" for="minIncome">
                <span class="label-text-alt text-red-500">{formErrors['minIncome'].message}</span>
            </label>
            {/if}
        </div>

        <div class="form-control w-full">
            <label class="label" for="maxIncome">
                <span class="label-text">Max Annual Income</span>
            </label>
            <input type="maxIncome" name="maxIncome" placeholder="" class="input input-bordered w-full" required />
            {#if 'maxIncome' in formErrors}
            <label class="label" for="maxIncome">
                <span class="label-text-alt text-red-500">{formErrors['maxIncome'].message}</span>
            </label>
            {/if}
        </div>

        <div class="form-control w-full">
            <label class="label" for="description">
                <span class="label-text">Description</span>
            </label>
            <input type="description" name="description" placeholder="" class="input input-bordered w-full" required />
            {#if 'description' in formErrors}
            <label class="label" for="description">
                <span class="label-text-alt text-red-500">{formErrors['descriptione'].message}</span>
            </label>
            {/if}
        </div>

        <div class="form-control w-full">
            <label class="label" for="requirements">
                <span class="label-text">Requirements</span>
            </label>
            <input type="requirements" name="requirements" placeholder="" class="input input-bordered w-full" required />
            {#if 'requirements' in formErrors}
            <label class="label" for="requirements">
                <span class="label-text-alt text-red-500">{formErrors['requirements'].message}</span>
            </label>
            {/if}
        </div>

        <div class="form-control w-full">
            <label class="label" for="applicationInstructions">
                <span class="label-text">Application Instructions</span>
            </label>
            <input type="applicationInstructions" name="applicationInstructions" placeholder="" class="input input-bordered w-full" required />
            {#if 'applicationInstructions' in formErrors}
            <label class="label" for="applicationInstructions">
                <span class="label-text-alt text-red-500">{formErrors['applicationInstructions'].message}</span>
            </label>
            {/if}
        </div>

        <div class="form-control w-full">
            <label class="label" for="location">
                <span class="label-text">Location</span>
            </label>
            <input type="location" name="location" placeholder="" class="input input-bordered w-full" required />
            {#if 'location' in formErrors}
            <label class="label" for="location">
                <span class="label-text-alt text-red-500">{formErrors['location'].message}</span>
            </label>
            {/if}
        </div>

        <div class="form-control w-full">
            <label class="label" for="employer">
                <span class="label-text">Employer</span>
            </label>
            <input type="employer" name="employer" placeholder="" class="input input-bordered w-full" required />
            {#if 'employer' in formErrors}
            <label class="label" for="employer">
                <span class="label-text-alt text-red-500">{formErrors['employer'].message}</span>
            </label>
            {/if}
        </div>

        <div class="form-control w-full mt-4">
            <button class="btn btn-md">Post a Job</button>
        </div>
    </form>
</div>
