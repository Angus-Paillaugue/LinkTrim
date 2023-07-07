<script>
    import { enhance } from '$app/forms'

    export let form;
</script>

<svelte:head>
	<title>Log-in</title>
</svelte:head>

<form class="max-w-md mx-auto flex flex-col gap-4 p-4 rounded-lg bg-neutral text-neutral-content" use:enhance method="POST">
    <h1 class="text-5xl">Log-in</h1>
    <input type="text" placeholder="Username" class="input input-bordered w-full" name="username" value="{form?.formData?.username}" />
    <input type="password" placeholder="Password" class="input input-bordered w-full" name="password" value="{form?.formData?.password}" />

    <button class="btn btn-primary">Log-in</button>

    {#if form?.success == false}
        <div class="alert alert-error">
            <i class="bi bi-x-circle shrink-0 h-6 w-6"></i>
            <span>{form.message}</span>
        </div>
    {/if}
    
    <a class="link link-primary" href="/sign-in">Don't have an account ?</a>
</form>