import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

import AllStudents from '../views/AllStudents.vue';
import OneStudent from '../views/OneStudent.vue';

import AllCompanies from '../views/AllCompanies.vue';
import OneCompany from '../views/OneCompany.vue';


import Profile from '../views/Profile.vue'
import EditProfile from '../views/EditProfile.vue'

// adddmiiin
import Admin from '../views/admin/Admin.vue'
import Level from '../views/admin/Level.vue'
import Speciality from '../views/admin/Speciality.vue'
import ActivityArea from '../views/admin/ActivityArea.vue'
import Student from '../views/admin/Student.vue'
import AddStudent from '../views/admin/student/AddStudent'
import EditStudent from '../views/admin/student/EditStudent.vue'
import Company from '../views/admin/Company.vue'
import AddCompany from '../views/admin/company/AddCompany.vue'
import EditCompany from '../views/admin/company/EditCompany.vue'


import NotFound from '../components/NotFound.vue'
import Forbidden from '../components/Forbidden.vue'

Vue.use(VueRouter)

const routes = [
  {
    path : '/admin',name : 'Admin',component : Admin,
    children : [
      {
        path : 'levels', name : 'Admin / Level', component : Level
      },
      {
        path : 'specialities', name : 'Admin / Speciality', component : Speciality
      },
      {
        path : 'activities', name : 'Admin / Activity Areas', component : ActivityArea
      },
      {
        path : 'students', name : 'Admin / Student', component : Student,
      },
      {
        path : 'students/create', name : 'Admin / Student / Create', component : AddStudent
      },
      {
        path : 'students/:id/edit', name : 'Admin / Student / Edit', component : EditStudent
      },
      {
        path : 'companies', name : 'Admin / Company', component : Company
      },
      {
        path : 'companies/create', name : 'Admin / Company / Create', component : AddCompany
      },
      {
        path : 'companies/:id/edit', name : 'Admin / Company / Edit', component : EditCompany
      },
    ]
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path : '/profile',
    name : 'Profile',
    component : Profile
  },
  {
    path : '/editProfile',
    name : 'Edit Profile',
    component : EditProfile
  },
  {
    path : '/forbidden',
    name : 'Error forbidden',
    component : Forbidden
  },
  {
    path : '/students',
    name : 'Students',
    component : AllStudents
  },
  {
    path : '/students/:id',
    name : 'Student',
    component : OneStudent
  },
  {
    path : '/companies',
    name : 'Companies',
    component : AllCompanies
  },
  {
    path : '/companies/:id',
    name : 'Company',
    component : OneCompany
  },
  {
    path : '*',
    name : 'Error Not Found',
    component : NotFound
  }
  
]

const router = new VueRouter({
  routes,
  mode : "history"
})

export default router
