<script>
    import Banner from '../banner.svelte'

    let username = '';
    let password = '';
    let result = null

    async function create() {
        const res = await fetch('http://localhost:3000/users/login', {
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
    <title>Sign in</title>
</svelte:head>

<input bind:value={username} />
<input bind:value={password} />
<button type="button" on:click={create}>
    Connect
</button>

<p>
    Result:
</p>
<pre>
{result}
</pre>