<script>
    import Banner from '../banner.svelte'
    import Cookies from "js-cookie";

    let json = null
    let id = null
    let username = null
    let role = null
    let result = ''

    async function doGet() {
        try {
            const token = Cookies.get('jwt');
            const res = await fetch('https://web-app-locations-backend.onrender.com/users/me', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            json = await res.json()
            id = json["_id"]
            username = json["username"]
            role = json["role"]
        }
        catch (error){
           result = error
        }
    }

    async function logOut(){
        console.log("log out")
        Cookies.set('jwt', '', { expires: 0 });
        result = "You are logged out! Please register or sign in."
    }

    $: doGet()
</script>
<Banner></Banner>

<main class="text-center form-signing w-25 m-auto">
    <form>
        <img class="mb-4" src="favicon.png" alt="" width="72" height="57">
        <h1 class="h3 mb-3 fw-normal">My informations</h1>
        <div class="form-floating">
            <input type="text" class="form-control" id="floatingInputId" bind:value={id}>
            <label for="floatingInputId">id</label>
        </div>
        <div class="form-floating">
            <input type="text" class="form-control" id="floatingInputUsername" bind:value={username}>
            <label for="floatingInputUsername">username</label>
        </div>
        <div class="form-floating">
            <input type="text" class="form-control" id="floatingInputRole" bind:value={role}>
            <label for="floatingInputRole">role</label>
        </div>
        <button class="w-100 btn btn-danger btn-lg btn-primary" type="button" on:click={logOut}>Log out</button>
        <p>
            {result}
        </p>
    </form>
</main>