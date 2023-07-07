<script>
    export let data;
</script>

<svelte:head>
	<title>My links</title>
</svelte:head>

<div class="max-w-lg mx-auto flex flex-col gap-4 p-4 rounded-lg text-neutral-content">

    {#each data.userLinks as link}
        <div class="grid grid-cols-1 gap-4">
            <a href="/dashboard/my-links/{link.id}" class="flex flex-col justify-center items-center w-full p-4 py-6 rounded-2xl bg-transparent border border-base-content/5 hover:shadow-xl transition-all gap-4 text-xl hover:-translate-y-1 duration-200 overflow-hidden break-all">
                <h1 class="text-xl md:text-3xl">{data.shortUrlBaseUrl}{link.id}</h1>
                <p class="text-base md:text-lg text-wrap">{new URL(link.redirectTo).origin + new URL(link.redirectTo).pathname}</p>
            </a>
        </div>
    {/each}
</div>