<script>
    import ShortenUrlModal from "$lib/components/shortenUrlModal.svelte";

    export let data;

    let heroLinkInputValue = "";
    let heroInputError = false;
    let urlToShorten = false;

    function shorten(){
        try {
            urlToShorten = new URL(heroLinkInputValue);
            shortenUrlModal.showModal();
            heroInputError = false;
        } catch (_) {
            heroInputError = true;
            return false;  
        }
    }
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section class="hero min-h-screen">
    <div class="hero-content flex-col lg:flex-row-reverse">
        <img src="hero-illustration.svg" alt="Hero illustration" class="lg:max-w-lg md:w-2/3" />
        <div>
            <h1 class="text-5xl font-bold">Easley shorten urls !</h1>
            <p class="py-6">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit recusandae nihil nemo iusto molestiae excepturi tempore tempora veritatis nesciunt? Molestiae, non aut laborum maxime tempore mollitia illo possimus impedit saepe?</p>
            <form on:submit|preventDefault={shorten} class="join w-full justify-center lg:justify-start">
                <input type="link" placeholder="Your link" class="input input-bordered {heroInputError ? "input-error" : "input-primary"} w-full max-w-md join-item" bind:value={heroLinkInputValue} />
                <button class="btn {heroInputError ? "btn-error" : "btn-primary"} join-item no-animation">Shorten</button>
            </form>
            {#if heroInputError}
                <div class="label">
                    <span class="text-error">Invalid link</span>
                </div>
            {/if}
        </div>
    </div>
</section>

<ShortenUrlModal urlToShorten={urlToShorten} auth={data.auth ?? false}/>

<section>

    <div class="max-w-screen-lg mx-auto gap-6">

        <div class="grid grid-cols-1 grid-rows-2 md:grid-cols-9 md:grid-rows-1 gap-4">
            <img src="linkShortener.svg" alt="" class="col-span-5">
            <div class="md:col-span-4 md:col-start-6 space-y-4 my-auto">
                <h2 class="text-3xl font-bold">Create short links in seconds</h2>
                <p>With LinkTrim, you can create short URLs quickly and easily, which saves time and improves productivity. No need to manually shorten lengthy URLs and risk making mistakes.</p>
            </div>
        </div>

        <div class="grid grid-cols-1 grid-rows-2 md:grid-cols-9 md:grid-rows-1 gap-4">
            <div class="col-span-5 my-auto">
                <h2 class="text-3xl font-bold">Track your link clicks</h2>
                <p>LinkTrim provides you with detailed statistics on usage, so you can see how your links are performing. This helps you make data-driven decisions to improve your marketing campaigns and conversions.</p>
            </div>
            <img src="websiteDevelopment.svg" alt="" class="md:col-span-4 md:col-start-6">
        </div>

    </div>

</section>