<script>
    import Banner from '../banner.svelte'

    let username = '';
    let password = '';
    let result = '';

    async function register() {
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

<main class="text-center form-signing w-25 m-auto">
    <form>
        <img class="mb-4" src="charmender.png" alt="" width="72" height="57">
        <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
        <p>
            <a href="/login">Already have an account. Sign in here !</a>
        </p>
        <div class="form-floating">
            <input type="text" class="form-control" id="floatingInput" bind:value={username} placeholder="Username">
            <label for="floatingInput">Username</label>
        </div>
        <div class="form-floating">
            <input type="password" class="form-control" id="floatingPassword" bind:value={password} placeholder="Password">
            <label for="floatingPassword">Password</label>
        </div>
        <button class="w-100 btn btn-lg btn-primary" type="button" on:click={register}>Sign in</button>
        <p>
            {result}
        </p>
    </form>
</main>