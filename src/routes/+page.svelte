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

<div class="hero min-h-screen">
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
</div>

<ShortenUrlModal urlToShorten={urlToShorten} auth={data.auth ?? false}/>