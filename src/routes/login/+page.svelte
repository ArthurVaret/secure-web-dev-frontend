<script>
    import Banner from '../banner.svelte'
    import Cookies from 'js-cookie'

    let username = '';
    let password = '';
    let result = null

    async function login() {
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
            Cookies.set('jwt_token', json["jwt"], { expires: 7 });
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
<button type="button" on:click={login}>
    Connect
</button>
<p class="text-xs-center">
    <a href="/register">No account yet. Register now !</a>
</p>
<p>
    Result:
</p>
<pre>
{result}
</pre>