<script>
    import Banner from '../banner.svelte'
    import Cookies from 'js-cookie'

    let data = []
    let konsol = ''
    let role = null
    let numpage = 0
    let columns = ["_id","filmType","filmProducerName","endDate","filmName","District","type","coordinates","sourceLocationId","filmDirectorName","address","startDate","year"]
    let newRow = [...columns];
    async function addRow(rowToAdd) {
        try {
            const token = Cookies.get('jwt');
            const res = await fetch('http://localhost:3000/locations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(
                    rowToAdd
                )
            })
            konsol = JSON.stringify(await res.json());
        }
        catch (error){
            konsol = error
        }
    }
    async function editRow(rowToEdit) {
        try {
            const token = Cookies.get('jwt');
            console.log(rowToEdit);
            const res = await fetch('http://localhost:3000/locations/'+ rowToEdit['_id'], {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(
                    rowToEdit
                )
            })
            konsol = JSON.stringify(await res.json());
        }
        catch (error){
            konsol = error
        }
    }
    async function deleteRow(rowToBeDeleted) {
        try {
            const token = Cookies.get('jwt');
            const res = await fetch('http://localhost:3000/locations/' + rowToBeDeleted['_id'], {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            konsol = JSON.stringify(await res.json());
            await doGet();
        }
        catch (error){
            konsol = error
        }
    }
    async function getRole() {
        try {
            const token = Cookies.get('jwt');
            const res = await fetch('http://localhost:3000/users/me', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }

            })
            role = (await res.json())["role"]
        }
        catch (error){
            role = null
        }
    }
    async function doGet() {
        try {
            const token = Cookies.get('jwt');
            const res = await fetch(`http://localhost:3000/locations?offset=${numpage*10}&limit=10`, {
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
    function pagination(num) {
        if (numpage + num >= 0) {
            numpage += num
            doGet()
        }
    }

    getRole();
    $: doGet();
    $: refreshedData = data;
    $: editable="false";
</script>

<Banner></Banner>
<svelte:head>
    <title>Filming locations</title>
</svelte:head>
<button type="button" on:click={doGet}>
    Get all locations
</button>

<table class="table table-hover">
    <thead>
    <tr>
        {#each columns as column}
            <th>{column}</th>
        {/each}
    </tr>
    </thead>
    <tbody>
    {#each refreshedData as row}
        <tr class="text-center">
            <td contenteditable="true" bind:innerHTML={row["_id"]}></td>
            <td contenteditable="true" bind:innerHTML={row["filmType"]}></td>
            <td contenteditable="true" bind:innerHTML={row["filmProducerName"]}></td>
            <td contenteditable="true" bind:innerHTML={row["endDate"]}></td>
            <td contenteditable="true" bind:innerHTML={row["filmName"]}></td>
            <td contenteditable="true" bind:innerHTML={row["District"]}></td>
            <td contenteditable="true" bind:innerHTML={row["geolocation"]["type"]}></td>
            <td contenteditable="true" bind:innerHTML={row["geolocation"]["coordinates"]}></td>
            <td contenteditable="true" bind:innerHTML={row["sourceLocationId"]}></td>
            <td contenteditable="true" bind:innerHTML={row["filmDirectorName"]}></td>
            <td contenteditable="true" bind:innerHTML={row["address"]}></td>
            <td contenteditable="true" bind:innerHTML={row["startDate"]}></td>
            <td contenteditable="true" bind:innerHTML={row["year"]}></td>
            {#if role==='admin'}
                <div>
                    <button class="btn btn-danger" on:click={() => deleteRow(row)}>Delete</button>
                    <button class="btn btn-info" on:click={() => editRow(row)}>Edit</button>
                </div>
            {/if}
        </tr>
    {/each}
    {#if role==='admin'}
        <tr class="text-center">
            {#each newRow as column}
                <td contenteditable="true" bind:innerHTML={column}></td>
            {/each}
            <button class="btn btn-outline-success" on:click={addRow}>add</button>
        </tr>
    {/if}
    </tbody>
</table>
<div class="text-center">
    <button class="btn btn-light" on:click={() => pagination(-1)}>Previous</button>
    <label>Pages n°<span className="badge">{numpage+1}</span></label>
    <button class="btn btn-light" on:click={() => pagination(1)}>Next</button>
</div>
<pre>
{konsol}
</pre>