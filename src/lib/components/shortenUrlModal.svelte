<script>
    import { page } from '$app/stores';
    import { copy } from 'svelte-copy';

    export let urlToShorten;
    export let auth;

    let shortenUrl = false;
    let loading = false;
    let toastCopied = false;
    let useStatistics = false;

    async function create(){
        loading = true;
        const res = await fetch(`/api/createUrl/`, { method:"POST", body:JSON.stringify({ urlToShorten,useStatistics:useStatistics }) });
        const body = await res.json();
        shortenUrl = $page.url.origin+"/"+body.id;
        loading = false;
    }
</script>
	

<dialog id="shortenUrlModal" class="modal">
    <form method="dialog" class="modal-box flex flex-col gap-4">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        <h3 class="font-bold text-lg">Shorten url</h3>
        <form on:submit|preventDefault={create} class="flex flex-col gap-4">
            <input type="text" placeholder="Your link" class="input input-bordered w-full" bind:value={urlToShorten} />
            <div class="form-control">
                <label class="cursor-pointer label justify-start gap-4 w-fit">
                    {#if auth}
                        <input type="checkbox" class="checkbox checkbox-primary" name="statistics" bind:checked={useStatistics} />
                        <span class="label-text">Use statistics</span>
                    {:else}
                        <input type="checkbox" class="checkbox checkbox-primary" name="statistics" disabled />
                        <span class="label-text">Use statistics</span>
                        <div class="tooltip" data-tip="You need to be logged-in">
                            <i class="bi bi-info-circle label-text"></i>
                        </div>
                    {/if}
                </label>
            </div>
            <button class="btn btn-primary">
                {#if loading}
                    <span class="loading loading-spinner loading-sm"></span>
                {:else}
                    Create
                {/if}
            </button>
            {#if shortenUrl}
                <div class="join w-full">
                    <input type="text" placeholder="The new shorten link" class="input input-bordered join-item w-full" readonly bind:value={shortenUrl} />
                    <button class="btn btn-primary join-item" use:copy={shortenUrl} on:svelte-copy={(_) => {toastCopied = true; setTimeout(() => { toastCopied = false }, 2000)}} type="button">
                        <i class="bi bi-clipboard"></i>
                    </button>
                </div>
            {/if}
        </form>
    </form>

    <!-- Modal backdrop -->
    <form method="dialog" class="modal-backdrop">
        <button>close</button>
    </form>
</dialog>

{#if toastCopied}
    <div class="toast toast-top toast-end">
        <div class="alert alert-success">
            <span>Link copied to clipboard!</span>
        </div>
    </div>
{/if}
