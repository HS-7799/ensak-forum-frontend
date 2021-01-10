import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/authentication/Login.vue'
import Register from '../views/authentication/Register.vue'

import AllStudents from '../views/student/AllStudents.vue';
import OneStudent from '../views/student/OneStudent.vue';

import AllCompanies from '../views/company/AllCompanies.vue';
import OneCompany from '../views/company/OneCompany.vue';
import CompanyPosts from '../views/company/CompanyPosts.vue'

import AllPosts from '../views/post/AllPosts.vue'
import ShowPost from '../views/post/ShowPost.vue'
import EditPost from '../views/post/EditPost.vue'


import Profile from '../views/Profile.vue'
import EditProfile from '../views/EditProfile.vue'

// admin
import Dashboard from '../views/admin/Dashboard.vue'
import Level from '../views/admin/level/Level.vue'
import Speciality from '../views/admin/speciality/Speciality.vue'
import ActivityArea from '../views/admin/activity/ActivityArea.vue'

import Student from '../views/admin/student/Student.vue'
import AddStudent from '../views/admin/student/AddStudent'
import EditStudent from '../views/admin/student/EditStudent.vue'

import Company from '../views/admin/company/Company.vue'
import AddCompany from '../views/admin/company/AddCompany.vue'
import EditCompany from '../views/admin/company/EditCompany.vue'

import AdminPost from '../views/admin/post/Post.vue'
import AdminEditPost from '../views/admin/post/EditPost.vue'


import NotFound from '../components/NotFound.vue'
import Forbidden from '../components/Forbidden.vue'

Vue.use(VueRouter)

const routes = [
  {
    path : '/admin',name : 'Admin',component : Dashboard,
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
      {
        path : 'posts', name : 'Admin / Post', component : AdminPost
      },
      {
        path : 'posts/:id/edit', name : 'Admin / Post / Edit', component : AdminEditPost
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
    path : '/posts',
    name : 'Posts',
    component : AllPosts
  },
  {
    path : '/posts/:id',
    name : 'Post',
    component : ShowPost
  },
  {
    path : '/posts/:id/edit',
    name : 'Edit Post',
    component : EditPost
  },
  {
    path : '/companies/:id',
    name : 'Company',
    component : OneCompany
  },
  {
    path : '/companies/:id/posts',
    name : 'Company posts',
    component : CompanyPosts
  },
  {
    path : '/forbidden',
    name : 'Error forbidden',
    component : Forbidden
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
