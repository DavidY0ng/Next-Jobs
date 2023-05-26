<script>
    import {getTokenFromLocalStorage} from '../../../../utils/auth.js'
    import {getUserId} from '../../../../utils/auth.js'
    // import {status} from '../../../utils/auth.js'

    export let data;
    const formErrors = {}

    async function updateJob (evt) {
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
        PUBLIC_BACKEND_BASE_URL + `/api/collections/jobs/records/${data.job.id}`,
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


<a class = "btn btn-md bg-transparent font-bold" href="/">Homepage</a>

<div class = "container mx-auto">
    <form on:submit={updateJob} class=" ">
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