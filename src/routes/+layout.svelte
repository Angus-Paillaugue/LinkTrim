<script>
    import "../app.css";
    import Analytics from "$lib/components/Analytics.svelte"

    export let data;
</script>

<svelte:head>
    <meta name="keywords" content="Url, Link">
    <meta name="author" content="Angus Paillaugue">
</svelte:head>

<Analytics />

<main class="min-h-screen">
    <nav class="navbar bg-neutral text-neutral-content">
        <div class="flex-1">
            <a class="btn btn-ghost normal-case text-xl" href="/">LinkTrim</a>
        </div>
        <div class="flex-none">
            <div class="dropdown dropdown-end dropdown-hover">
                <div class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <!-- svelte-ignore a11y-img-redundant-alt -->
                        {#if data?.auth}
                            <img src="/{data.auth.profilePicture}" alt="Profile picture"/>
                        {:else}
                            <img src="/defaultProfilePicture.png" alt="Profile picture"/>
                        {/if}
                    </div>
                </div>
                <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52">
                    {#if data?.auth}
                        <li><a href="/dashboard">Dashboard</a></li>
                        <li><a href="/settings">Settings</a></li>
                        <li><a href="/log-out">Logout</a></li>
                    {:else}
                        <li><a href="/log-in">Log-in</a></li>
                        <li><a href="/sign-in">Sign-in</a></li>
                    {/if}
                </ul>
            </div>
        </div>
    </nav>

    <article class="p-4 min-h-full">
        <slot />
    </article>
</main>

<footer class="footer footer-center p-4 bg-neutral text-base-content">
    <p>Copyright © {new Date().getFullYear()} - All right reserved by Angus Paillaugue</p>
</footer>