/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    try {
        const token = event.cookies.get('jwt');
        const res = await fetch('http://localhost:3000/users/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        event.locals.user = await res.json()
    }
    catch (error){
        event.locals.user = null
    }
    return resolve(event)
}