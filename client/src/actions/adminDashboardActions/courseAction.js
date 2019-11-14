import axios from 'axios';

export const FETCH_COURSES_START = 'FETCH_COURSES_START';
export const FETCH_COURSES_SUCCESS = 'FETCH_COURSES_SUCCESS';
export const FETCH_COURSES_FAILURE = 'FETCH_COURSES_FAILURE';

export const getCourseTable = () => dispatch => {
    dispatch({type: FETCH_COURSES_START})
    axios.get('https://speak-out-be-staging.herokuapp.com/api?table=course_view')
        .then(res => {
           dispatch({type: FETCH_COURSES_SUCCESS, payload:res.data.tableData})
        }).catch(err=> {
            dispatch({type: FETCH_COURSES_FAILURE, payload: err.payload})
        });
};

export const FETCH_COURSEBYID_START = 'FETCH_COURSEBYID_START';
export const FETCH_COURSEBYID_SUCCESS = 'FETCH_COURSEBYID_SUCCESS';
export const FETCH_COURSEBYID_FAILURE = 'FETCH_COURSEBYID_FAILURE';

export const getCourseById = id => dispatch => {
    dispatch({ type: FETCH_COURSEBYID_START })
    axios.get(`https://speak-out-be-staging.herokuapp.com/api?table=course_view&where=id=${id}`)
    .then(res => {
        dispatch({
            type: FETCH_COURSEBYID_SUCCESS,
            payload: res.data.tableData[0]
        })
    })
    .catch(err => {
       dispatch({
        type: FETCH_COURSEBYID_FAILURE,
        payload: err.data
       }) 
    })
}


export const EDIT_COURSEBYID_START = 'EDIT_COURSEBYID_START';
export const EDIT_COURSEBYID_SUCCESS = 'EDIT_COURSEBYID_SUCCESS';
export const EDIT_COURSEBYID_FAILURE = 'EDIT_COURSEBYID_FAILURE';

export const toggleEditCourse = () => dispatch => {
    dispatch({ type: EDIT_COURSEBYID_START })
}

export const editCouseById = (id, state) => dispatch => {
    let obj1 = {id:id, block_code:"431", delinquent:true} //will fix later 
    let state1 = {...state, ...obj1 }
    axios.put(`https://speak-out-be-staging.herokuapp.com/api?table=course_view&where=id=${id}`, state1)
    .then(res => {
        dispatch({
            type: EDIT_COURSEBYID_SUCCESS,
            payload: res.data
        })
    })
    .catch(err => {
       dispatch({
        type: EDIT_COURSEBYID_FAILURE,
        payload: err.data
       }) 
    })
}

export const DISPLAY_STUDENTSBYCOURSEID_START = 'DISPLAY_STUDENTSBYCOURSEID_START';
export const DISPLAY_STUDENTSBYCOURSEID_SUCCESS = 'DISPLAY_STUDENTSBYCOURSEID_SUCCESS';
export const DISPLAY_STUDENTSBYCOURSEID_FAILURE = 'DISPLAY_STUDENTSBYCOURSEID_FAILURE';

export const getStudentTableByCourseID = course_id => dispatch => {
    console.log('course_id in courseAction.js', course_id)
    dispatch({type: DISPLAY_STUDENTSBYCOURSEID_START})
    axios.get(`https://speak-out-be-staging.herokuapp.com/api/?table=course_enrollment_view&where=course_id=${course_id}`)
        .then(res => {
            console.log('res in courseAction.js',res)
           dispatch({type: DISPLAY_STUDENTSBYCOURSEID_SUCCESS, payload:res.data.tableData})
        }).catch(err=> {
            dispatch({type: DISPLAY_STUDENTSBYCOURSEID_FAILURE, payload: err.payload})
        });
};

export const SET_FILTER_COURSES = 'SET_FILTER_COURSES';
export const filterCourseTable = (searchTerm) => dispatch => {
    dispatch({type: SET_FILTER_COURSES, payload: searchTerm})
    dispatch({type: FETCH_COURSES_START});
    axios.get(`https://speak-out-be-staging.herokuapp.com/api?table=course_view`)
        .then(res => {
            searchTerm = searchTerm.toLowerCase();
            let courseList = res.data.tableData;
            courseList = courseList.filter(course => {
                if (course.id && course.id.toString().match(searchTerm)) {
                    return true;
                }
                if (course.term && course.term.toLowerCase().match(searchTerm)) {
                    return true;
                }
                if (course.course_type && course.course_type.toLowerCase().match(searchTerm)) {
                    return true;
                }
                if (course.group_type && course.group_type.toLowerCase().match(searchTerm)) {
                    return true;
                }
                if (course.school_grade && course.school_grade.toLowerCase().match(searchTerm)) {
                    return true;
                }
                if (course.level && course.level.toLowerCase().match(searchTerm)) {
                    return true;
                }
                if (course.course_schedule && course.course_schedule.toLowerCase().match(searchTerm)) {
                    return true;
                }
                if (course.teacher && course.teacher.toLowerCase().match(searchTerm)) {
                    return true;
                }
                return false
            });
           dispatch({type: FETCH_COURSES_SUCCESS, payload: courseList})
        }).catch(err=> {
            console.log('err',err)
            dispatch({type: FETCH_COURSES_FAILURE, payload: err.payload})
        });
}

