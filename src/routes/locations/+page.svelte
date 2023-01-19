<script>
    import Banner from '../banner.svelte'

    let result = null

    async function doGet() {
        const res = await fetch('http://localhost:3000/locations', {
            method: 'GET',

        })
        const json = await res.json()
        result = JSON.stringify(json)
    }

</script>
<Banner></Banner>
<svelte:head>
    <title>Filming locations</title>
</svelte:head>

<p>
    Result:
</p>
<pre>
{result}
</pre>