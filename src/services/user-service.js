import axios from 'axios'
import AuthHeader from './auth-header'

const API_URL = "http://localhost:8080/api/test"

class UserService {
    getPublicContent()
    {
        return axios.get(API_URL + '/all', { headers : AuthHeader()  })
    }

    getAdminContent()
    {
        return axios.get(API_URL + '/admin',{ headers : AuthHeader() })
    }

    getStudentContent()
    {
        return axios.get(API_URL + '/etudiant', {headers : AuthHeader()})
    }

    getEntrepriseContent()
    {
        return axios.get(API_URL + '/entreprise',{headers : AuthHeader()})
    }
}

export default new UserService();