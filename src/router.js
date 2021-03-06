import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'
import HomeView from './views/HomeView.vue'
import LoginPage from './components/LoginPage';
import AdminUsers from "@/views/admin/AdminUsers";
import AdminTeachers from "@/views/admin/AdminTeachers";
import AdminStudents from "@/views/admin/AdminStudents";
import AdminGroups from "@/views/admin/AdminGroups";
import AdminSubjects from "@/views/admin/AdminSubjects";
import AdminPage from "@/components/admin/AdminPage";
import AdminPersonalities from "@/views/admin/AdminPersonalities";
import TeacherPage from "@/components/teacher/TeacherPage";
import TeacherSubjects from "@/views/teacher/TeacherSubjects";
import TeacherGroups from "@/views/teacher/TeacherGroups";
import AdminGroup from "@/views/admin/AdminGroup";
import AdminPerson from "@/views/admin/AdminPerson";
import AdminSubject from "@/views/admin/AdminSubject";
import AdminSubjectGroup from "@/views/admin/AdminSubjectGroup";
import TeacherSubject from "@/views/teacher/TeacherSubject";
import TeacherSubjectGroup from "@/views/teacher/TeacherSubjectGroup";
import TeacherGroup from "@/views/teacher/TeacherGroup";

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminPage,
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      },
      children: [
        {
          path: '/admin/personalities',
          name: 'adminPersonalities',
          component: AdminPersonalities
        },
        {
          path: '/admin/users',
          name: 'adminUsers',
          component: AdminUsers
        },
        {
          path: '/admin/teachers',
          name: 'adminTeachers',
          component: AdminTeachers
        },
        {
          path: '/admin/students',
          name: 'adminStudents',
          component: AdminStudents
        },
        {
          path: '/admin/groups',
          name: 'adminGroups',
          component: AdminGroups
        },
        {
          path: '/admin/subjects',
          name: 'adminSubjects',
          component: AdminSubjects
        },
        {
          path: '/admin/group/:id',
          name: 'adminGroup',
          component: AdminGroup
        },
        {
          path: '/admin/personalities/:id',
          name: 'adminPerson',
          component: AdminPerson
        },
        {
          path: '/admin/subject/:id',
          name: 'adminSubject',
          component: AdminSubject
        },
        {
          path: '/admin/subject/:subject_id/group/:group_id',
          name: 'adminSubjectGroup',
          component: AdminSubjectGroup
        }
      ]
    },


    {
      path: '/teacher',
      name: 'teacher',
      component: TeacherPage,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/teacher/subjects',
          name: 'teacherSubjects',
          component: TeacherSubjects
        },
        {
          path: '/teacher/groups',
          name: 'teacherGroups',
          component: TeacherGroups
        },
        {
          path: '/teacher/subject/:id',
          name: 'teacherSubject',
          component: TeacherSubject
        },
        {
          path: '/teacher/subject/:subject_id/group/:group_id',
          name: 'teacherSubjectGroup',
          component: TeacherSubjectGroup
        },
        {
          path: '/teacher/group/:id',
          name: 'teacherGroup',
          component: TeacherGroup
        }
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }

  if(to.matched.some(record => record.meta.requiresAdmin)) {
    if (store.getters.isAdmin) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAdmin)) {
    if (store.getters.isAdmin) {
      next()
      return
    }
    next('/')
  } else {
    next()
  }
})

export default router