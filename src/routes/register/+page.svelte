<script>
    import Banner from '../banner.svelte'

    let username = '';
    let password = '';
    let result = null

    async function doPost() {
        const res = await fetch('http://localhost:3000/users/register', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            })
        })

        const json = await res.json()
        result = JSON.stringify(json)
    }

</script>
<Banner></Banner>
<svelte:head>
    <title>Register</title>
</svelte:head>
<p class="text-xs-center">
    <a href="/login">Have an account?</a>
</p>
<input bind:value={username} />
<input bind:value={password} />
<button type="button" on:click={doPost()}>
    Register
</button>

<p>
    Result:
</p>
<pre>
{result}
</pre>