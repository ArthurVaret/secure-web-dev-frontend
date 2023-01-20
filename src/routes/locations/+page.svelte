<script>
    import Banner from '../banner.svelte'
    import Cookies from 'js-cookie'

    let result = null

    async function doGet() {
        try {
            const token = Cookies.get('jwt_token');
            const res = await fetch('http://localhost:3000/locations?offset=0&limit=10', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            const json = await res.json()
            result = JSON.stringify(json)
            console.log(json)
        }
        catch (error){
            result = error
        }
    }

</script>
<Banner></Banner>
<svelte:head>
    <title>Filming locations</title>
</svelte:head>
<button type="button" on:click={doGet}>
    Get all locations
</button>
<p>
    Result:
</p>
<pre>
{result}
</pre>