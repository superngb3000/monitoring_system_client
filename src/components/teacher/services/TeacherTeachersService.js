import axios from 'axios';

const TEACHER_API_BASE_URL = 'http://localhost:8081/teacher';

class TeacherTeachersService {

    getTeacher(id){
        return axios.get(TEACHER_API_BASE_URL + `/teacher/${id}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }});
    }
    getTeachers(){
        return axios.get(TEACHER_API_BASE_URL + '/allTeachers', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }});
    }
}

export default new TeacherTeachersService();