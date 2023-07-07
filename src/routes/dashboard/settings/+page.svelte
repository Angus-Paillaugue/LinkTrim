<script>
    import { enhance } from '$app/forms'

    export let data;
    export let form;

    const { auth } = data;
    let { email, username } = auth;
</script>

<form class="max-w-md mx-auto flex flex-col gap-4 p-4 rounded-lg bg-neutral text-neutral-content" method="POST" action="/settings?/save" use:enhance>
    <h1 class="text-5xl">Settings</h1>
    <div>
        <label class="label" for="email">
            <span class="label-text">E-mail</span>
        </label>
        <input type="text" placeholder="E-mail" class="input input-bordered w-full" name="email" autocomplete="off" value={email} />
    </div>
    <div>
        <label class="label" for="username">
            <span class="label-text">
                Username
                <div class="tooltip" data-tip="You cannot change your username">
                    <i class="bi bi-info-circle"></i>
                </div>
            </span>
        </label>
        <input type="text" placeholder="Username" class="input input-bordered w-full" name="username" autocomplete="off" value={username} disabled />
    </div>

    {#if form?.success}  
    <div class="alert alert-success">
        <i class="bi bi-check-circle shrink-0"></i>
        <span>Settings saved successfully!</span>
      </div>
    {/if}

    <button class="btn btn-primary" type="submit">Save</button>

    <button class="btn btn-error" type="button" onclick="deleteAccountModal.showModal()">Delete account</button>
</form>

<dialog id="deleteAccountModal" class="modal">
    <form method="dialog" class="modal-box">
        <h3 class="font-bold text-lg">Delete account!</h3>
        <p class="mt-4">Are you sure you want to delete your account</p>
        <p class="mt-1">This action is irreversible!</p>
        <div class="w-full flex flex-row justify-between mt-4 gap-4">
            <button class="btn w-auto">Cancel</button>
            <form method="POST" action="/settings?/deleteAccount" use:enhance>
                <button class="btn btn-error" type="submit">Delete</button>
            </form>
        </div>
    </form>
</dialog>