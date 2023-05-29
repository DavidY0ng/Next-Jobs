<script>
    import humanize from 'humanize-plus';
    import {status, logOut} from '../utils/auth.js'
    export let data;

</script>

<h1 class="text-center text-xl font-bold">Find Your Next Job</h1>
<a class = "btn btn-md bg-transparent font-bold" href="/users/new">Create an Account</a>

{#if $status}
    <button class = "btn btn-md bg-transparent font-bold" on:click = {logOut}>Log Out</button>
    <a class = "btn btn-md bg-transparent font-bold" href="/postjobs">Post Jobs</a>
{:else}
    <a class = "btn btn-md bg-transparent font-bold" href="/users/new">Post Jobs</a>
    <a class = "btn btn-md bg-transparent font-bold" href="/users/login">Log In</a>
{/if}

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
