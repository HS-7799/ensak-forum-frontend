import Token from './Token';
import Storage from './Storage'


class User {


    responseAfterLogin(response,username)
    {
        const token = response.data.accessToken
        if(Token.isValid(token,username))
        {
            Storage.storeToken(token)
        }
    }

    logout(username)
    {
        const token = Storage.getToken()

        if(Token.isValid(token,username))
        {
            this.clear()
        }
    }

    clear()
    {
        Storage.clear();
        window.location = '/'
    }

    hasToken(username) {


        const storedToken = Storage.getToken();

        if(storedToken && username) {

            return Token.isValid(storedToken,username) ? true : this.clear();
        }
        return false;
    }

    loggedIn(username)
    {
        return this.hasToken(username);
    }


}


export default new User();