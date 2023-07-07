<script>
    import { enhance } from '$app/forms'

    export let form;
</script>

<svelte:head>
	<title>Sign-in</title>
</svelte:head>

<form class="max-w-md mx-auto flex flex-col gap-4 p-4 rounded-lg bg-neutral text-neutral-content" use:enhance method="POST">
    <h1 class="text-5xl">Sign-in</h1>
    <input type="text" placeholder="E-mail" class="input input-bordered w-full" name="email" value="{form?.formData?.email}" />
    <input type="text" placeholder="Username" class="input input-bordered w-full" name="username" value="{form?.formData?.username}" />
    <input type="password" placeholder="Password" class="input input-bordered w-full" name="password" value="{form?.formData?.password}" />

    <button class="btn btn-primary">Sign-in</button>

    {#if form?.success == false}
        <div class="alert alert-error">
            <i class="bi bi-x-circle shrink-0 h-6 w-6"></i>
            <span>{form.message}</span>
        </div>
    {/if}

    <a class="link link-primary" href="/log-in">Already have an account ?</a>
</form>