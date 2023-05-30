<script>
    import humanize from 'humanize-plus';
    import {logOut} from '../utils/auth.js'
    export let data;

</script>

<div class = "container mx-auto">
    <h1 class="text-center text-xl font-bold">Find Your Next Job</h1>
    <div class="overflow-x-auto w-full">
        {#each data.jobs as job}
            <div class="flex flex-col mt-10">
                <div>
                    <a class="font-bold text-2xl" href="/jobs/{job.id}">{job.title}</a>
                    <div class="text-sm mt-1">
                        {job.employer} . {job.location} .
                        <span class="text-sm">USD {humanize.formatNumber(job.minAnnualCompensation)} - USD {humanize.formatNumber(
                                job.maxAnnualCompensation
                            )}</span>
                    </div>
                    <div class="italic text-xs opacity-50 mt-2">
                       posted {new Date(job.created).toLocaleDateString(undefined, {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                       })}
                  </div>
                </div>
    
                <div class="mt-4 ">
                    {job.description.slice(0, 240)}...
                </div>
            </div>
        {/each}
    </div>
</div>



<!-- <nav class="bg border-gray-200 dark:bg-gray-900">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a class = "btn btn-md bg-transparent font-bold" href="/">Homepage</a>
      <div class="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul class="flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-4 md:mt-0">
        {#if $logInStatus}
          <li>
            <a class = "btn btn-md bg-transparent font-bold" href="/postjobs">Post Jobs</a>
          </li>
          <li>
            <button class = "btn btn-md bg-transparent font-bold" on:click = {logOut}>Log Out</button>
          </li>
        {:else}
          <li>
            <a class = "btn btn-md bg-transparent font-bold" href="/users/new">Create an Account</a>
          </li>
          <li>
            <a class = "btn btn-md bg-transparent font-bold" href="/users/login">Log In</a>
          </li>
          <li>
            <a class = "btn btn-md bg-transparent font-bold" href="/users/new">Post Jobs</a>
          </li>
        {/if}
        </ul>
      </div>
    </div>
</nav> -->
