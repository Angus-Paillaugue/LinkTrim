<script>
    export let data;
</script> 

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<div class="max-w-lg mx-auto flex flex-col gap-4 p-4 rounded-lg text-neutral-content">
    <h1 class="text-5xl font-semibold">{data.auth.username}</h1>
    <hr>
    <div class="grid sm:grid-cols-2 grid-cols-1 gap-4">
        <a href="/dashboard/my-links" class="flex justify-center items-center w-full p-4 py-6 rounded-2xl bg-transparent border border-base-content/5 hover:shadow-xl transition-all gap-4 text-xl hover:-translate-y-1 duration-200">
            <i class="bi bi-link-45deg"></i>
            My links
        </a>

        <a href="/dashboard/settings" class="flex justify-center items-center w-full p-4 py-6 rounded-2xl bg-transparent border border-base-content/5 hover:shadow-xl transition-all gap-4 text-xl hover:-translate-y-1 duration-200">
            <i class="bi bi-gear text-2xl"></i>
            Settings
        </a>

        <a href="/log-out" class="flex justify-center items-center w-full p-4 py-6 rounded-2xl bg-transparent border border-base-content/5 hover:shadow-xl transition-all gap-4 text-xl hover:-translate-y-1 duration-200">
            <i class="bi bi-door-open text-2xl"></i>
            Log-out
        </a>
    </div>
</div>