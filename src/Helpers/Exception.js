import User from "./User";
import Storage from './Storage';

class Exception {

    handle(err)
    {
        if(this.isExpired(err.response.data))
        {
            Storage.clear();
            window.location = '/'
        }
    }

    isExpired(error)
    {
        return error.message === "Token has expired" ? true : false;
    }
}

export default Exception = new Exception();
