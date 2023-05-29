<script>
	import { logOut } from "./auth";
  import status from "./auth"
</script>

<header>
    <nav class="bg border-gray-200 dark:bg-gray-900">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a class = "btn btn-md bg-transparent font-bold" href="/">Homepage</a>
          <div class="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul class="flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-4 md:mt-0">
            {#if $status}
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
    </nav>
</header>
