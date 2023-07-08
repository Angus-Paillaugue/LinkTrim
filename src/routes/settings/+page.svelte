<script>
    /** @type {import('./$types').PageData} */
    export let data;

    console.log(data)
</script>

<h1>No settings for now!</h1>
<p>But here is your user data : </p>

<pre>{JSON.stringify(data.auth, null, 4)}</pre>