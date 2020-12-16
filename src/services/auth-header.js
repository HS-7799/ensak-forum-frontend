import Storage from '../Helpers/Storage'
export default function  authHeader()
{
    let token = Storage.getToken()

    if(token)
    {
        return {
            Authorization : "Bearer " + token
        }
    } else {
        return {}
    }
}

