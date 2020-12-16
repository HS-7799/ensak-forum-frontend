class Storage {


    storeToken(token)
    {
        localStorage.setItem('token',token)
    }

    clear()
    {
        localStorage.removeItem('token')
        localStorage.removeItem('vuex')
        window.location = '/'
    }

    getToken()
    {
        return localStorage.getItem('token')
    }


    getRoles()
    {
        if(this.getUser())
        {
            return JSON.parse(localStorage.getItem('user')).roles;
        }
        else {
            return null
        }
    }


}

export default new Storage()