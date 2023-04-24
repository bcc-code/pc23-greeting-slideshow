
function parseJwt(token: string): any {
    try {

        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    } catch(e) {
        console.error(e);
    }
    return null;
}


const queryParams = new URLSearchParams(window.location.search);
const rawToken = queryParams.get("token")
let token: null | {gender: null | 'female' | 'male', first_name: string} = null;
if (rawToken != null) {
    token = parseJwt(rawToken)
}
console.log(token);

export {token};