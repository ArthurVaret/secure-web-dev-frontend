<script>
    import Banner from '../banner.svelte'

    let username = '';
    let password = '';
    let result = null

    async function doPost() {
        try{
            const res = await fetch('http://localhost:3000/users/register', {
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
        catch (error) {
            result = error
            console.log(result)
        }
    }

</script>
<Banner></Banner>
<svelte:head>
    <title>Register</title>
</svelte:head>

<label><input bind:value={username} placeholder="username"/></label>
<label><input bind:value={password} placeholder="password"/></label>
<button type="button" on:click={doPost}>
    Register
</button>
<p class="text-xs-center">
    <a href="/login">Already have an account?</a>
</p>
<p>
    Result:
</p>
<pre>
{result}
</pre>