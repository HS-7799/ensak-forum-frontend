class Token {


    isValid(token,username) {
                
        
        const payload = this.payload(token);
        
        if(payload) {
            return (payload.sub === username ) ? true : false;
        }
        return false;
    }


    payload(token) {
        const payload = token.split('.')[1];
        return this.decode(payload);
    }

    decode(payload) {

        if(this.isBase64(payload))
        {
            try
            {
                return JSON.parse(atob(payload))
            }
            catch
            {
                return false;
            }
        }
        else
        {
            return false;
        }
    }

    isBase64(str)
    {
        try
        {
            return btoa(atob(str)).replace(/=/g, '') === str;
        }
        catch
        {
            return false;
        }
    }
}

export default new Token();

