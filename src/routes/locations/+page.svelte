<script>
    import Banner from '../banner.svelte'
    import Cookies from 'js-cookie'
    import {onMount} from "svelte";

    let data = []
    let columns = ["_id","filmType","filmProducerName","endDate","filmName","district","geolocation","sourceLocationId","filmDirectorName","address","startDate","year"]
    let newRow = [...columns];
    function addRow() {
        data = [...data, [...newRow]]
        newRow = columns
    }
    function deleteRow(rowToBeDeleted) {
        data = data.filter(row => row !== rowToBeDeleted)
    }
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
            data = await res.json()
        }
        catch (error){
            data = error
        }
    }
    $: refreshedData = data;
</script>

<Banner></Banner>
<svelte:head>
    <title>Filming locations</title>
</svelte:head>
<button type="button" on:click={doGet}>
    Get all locations
</button>

<table>
    <thead>
    <tr>
        {#each columns as column}
            <th>{column}</th>
        {/each}
    </tr>

    </thead>
    <tbody>
    {#each refreshedData as row}

        <tr>
            <td contenteditable="true" bind:innerHTML={row["_id"]}></td>
            <td contenteditable="true" bind:innerHTML={row["filmType"]}></td>
            <td contenteditable="true" bind:innerHTML={row["filmProducerName"]}></td>
            <td contenteditable="true" bind:innerHTML={row["endDate"]}></td>
            <td contenteditable="true" bind:innerHTML={row["filmName"]}></td>
            <td contenteditable="true" bind:innerHTML={row["district"]}></td>
            <td contenteditable="true" bind:innerHTML={row["geolocation"]}></td>
            <td contenteditable="true" bind:innerHTML={row["sourceLocationId"]}></td>
            <td contenteditable="true" bind:innerHTML={row["filmDirectorName"]}></td>
            <td contenteditable="true" bind:innerHTML={row["address"]}></td>
            <td contenteditable="true" bind:innerHTML={row["startDate"]}></td>
            <td contenteditable="true" bind:innerHTML={row["year"]}></td>
            <button on:click={() => deleteRow(row)}>Delete</button>
        </tr>
        <tr style="color: grey">
            {#each newRow as column}
                <td contenteditable="true" bind:innerHTML={column}></td>
            {/each}
            <button on:click={addRow}>add</button>
        </tr>
    {/each}
    </tbody>
</table>