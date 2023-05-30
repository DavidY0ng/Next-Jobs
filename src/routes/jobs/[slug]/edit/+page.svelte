<script>
    import {PUBLIC_BACKEND_BASE_URL} from '$env/static/public';
    import {getTokenFromLocalStorage} from '../../../../utils/auth.js'
    import {getUserId} from '../../../../utils/auth.js'
    import {goto} from '$app/navigation';
    let loading = false;

    export let data;
    const formErrors = {}

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function postEditJob() {
        goto(`/jobs/${data.job.id}`);
    }

    async function updateJob (evt) {
        if (!getTokenFromLocalStorage()) {
            return false
        }
        evt.preventDefault()

        try {
            loading = true;

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
        PUBLIC_BACKEND_BASE_URL + `/api/collections/jobs/records/${data.job.id}`,
        {
            method: 'PATCH',
            mode: 'cors',
            headers: {
            'Content-Type': 'application/json',
            Authorization : getTokenFromLocalStorage()
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

        const updatedJobResp = await fetch(
        PUBLIC_BACKEND_BASE_URL + `/api/collections/jobs/records/${data.job.id}`,
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            Authorization: getTokenFromLocalStorage()
          }
        }
      );

      if (updatedJobResp.status === 200) {
        const updatedJobData = await updatedJobResp.json();
        data.job = updatedJobData; // Update the data variable with the new job data
      }

      return true;
        }

        return false
        } catch {
        return false
        } finally {
            await sleep(1500); 
            loading = false
            postEditJob()

        }
        
    }
</script>

<div class = "container mx-auto">
    <form on:submit={updateJob} class=" ">
        {#if loading}
            <div class="absolute inset-0 flex items-center justify-center">
                <div role="status" class="animate-spin">
                  <svg aria-hidden="true" class="w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
            </div>
        {/if}
        <h1 class="text-center text-xl">Post a job</h1>
        <div class="mb-6">
            <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
            <input 
            type="text" 
            name = "title"
            placeholder="Software Engineer" 
            class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value = "{data.job.title}"
            >
        </div>

        <div class="mb-6">
            <label for="minIncome" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Min Annual Income</label>
            <input 
            type="text" 
            name = "minIncome"
            placeholder="Minimum 1000" 
            class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value = "{data.job.minAnnualCompensation}"
            >
            <label for="minIncome" class = "label flex">
                <span class = "label-text-alt">USD</span>
                <span class = "label-text-alt">per annum</span>
            </label>
        </div>

        <div class="mb-6">
            <label for="maxIncome" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Max Annual Income</label>
            <input 
            type="text" 
            name = "maxIncome"
            placeholder="Minimum 1000" 
            class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value = "{data.job.maxAnnualCompensation}"
            >
            <label for="maxIncome" class = "label flex">
                <span class = "label-text-alt">USD</span>
                <span class = "label-text-alt">per annum</span>
            </label>
        </div>

        <div class="mb-6">
            <label for="employer" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company Name</label>
            <input 
            type="text" 
            name = "employer"
            placeholder="e.g. Facebook" 
            class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value = "{data.job.employer}"
            >
        </div>

        <div class="mb-6">
            <label for="location" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job Location</label>
            <input 
            type="text" 
            name = "location"
            placeholder="e.g. Kuala Lumpur, Malaysia" 
            class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value = "{data.job.location}"
            >
        </div>

        <div class="mb-6">
            <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <textarea 
            type="text"
            rows= 6 
            name = "description"
            class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >{data.job.description}</textarea>
        </div>

        <div class="mb-6">
            <label for="requirements" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Requirements</label>
            <textarea 
            type="text"
            rows= 6 
            name = "requirements"
            class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >{data.job.requirements}</textarea>
        </div>

        <div class="mb-6">
            <label for="applicationInstructions" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Application Instructions</label>
            <textarea 
            type="text"
            rows= 3 
            name = "applicationInstructions"
            class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >{data.job.applicationInstructions}</textarea>
        </div>

        <div class="form-control w-full mt-4">
            <button class="btn btn-md">Update</button>
        </div>
    </form>
</div>