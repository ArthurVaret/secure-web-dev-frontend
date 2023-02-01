import Cookies from 'js-cookie'
export async function load({ locals }) {
    try {
        const token = Cookies.get('jwt');
        const res = await fetch('http://localhost:3000/users/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
       locals.user = await res.json()
    }
    catch (error){
        locals.user = null
    }
}