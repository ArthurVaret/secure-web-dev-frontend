<script>
    import Banner from '../banner.svelte'

    let username = '';
    let password = '';
    let result = null

    async function create() {
        try{
            const res = await fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username,
                    password
                })
            })
            const json = await res.json()
            result = JSON.stringify(json)
        }
        catch (error){
            result = error
        }
    }

</script>
<Banner></Banner>
<svelte:head>
    <title>Sign in</title>
</svelte:head>

<label><input bind:value={username} placeholder="username"/></label>
<label><input bind:value={password} placeholder="password"/></label>
<button type="button" on:click={create}>
    Connect
</button>

<p>
    Result:
</p>
<pre>
{result}
</pre>