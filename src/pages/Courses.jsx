import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Grid } from '@mui/material';
import { CardCourses, Loading } from '../components'
import { API } from '../utilities'

const Courses = () => {
  const email = localStorage.getItem('userEmail')

  const [courseName, setCourseName] = useState('')
  const [courseDesc, setCourseDesc] = useState('')

  const handleCourseNameChange = (e) => setCourseName(e.target.value)
  const handleCourseDescChange = (e) => setCourseDesc(e.target.value)

  const [courses, setCourses] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    handleGetSubjects();
  }, [])

  const handleGetSubjects = async () => {
    try {
      setIsLoading(true)
      const res = await API.getSubjects({ email });
      setIsLoading(false)
      setCourses(res.data)
      console.log('GET SUBJECTS SUCCESS --- ', res)
    } catch (error) {
      console.error('Error fetching subjects:', error);
      setIsLoading(false)
    }
  };

  const handlePostSubject = async () => {
    try {
      const data = {
        email,
        subject: courseName,
        description: courseDesc
      }
      setIsLoading(true)
      const res = await API.addSubject(data)
      toast('Courses added Successfully', { theme: "dark" });
      setIsLoading(false)
      await handleGetSubjects()
      setCourseName('')
      setCourseDesc('')
      console.log(res)
    } catch (error) {
      console.error('Error fetching subjects:', error);
      toast.error('Bad Request: Course not added', { theme: "dark" });
      setIsLoading(false)
    }
  }

  return (
    <div>
      <h1 className='page_heading'>Courses</h1>

      <ToastContainer />
      <Loading isLoading={isLoading} />

      <div className='input_container'>
        <input 
          style={{flex:2}} 
          className="input" 
          type="text" 
          name="name" 
          placeholder='Course Name...' 
          required 
          value={courseName}
          onChange={handleCourseNameChange} 
        />

        <input 
          style={{flex:2}} 
          className="input" 
          type="text" 
          name="name" 
          placeholder='Course Description...' 
          required 
          value={courseDesc}
          onChange={handleCourseDescChange} 
        />

        <button style={{flex:1}} className="btn" type="submit" onClick={handlePostSubject}>Add Course</button>
      </div>

      <Grid container spacing={5}>
        {Array.isArray(courses) && courses.length > 0 && courses.map((course, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <CardCourses id={index} name={course.subject} desc={course.description} color={'#FF6D46'} />
            {/* 45AB5F */}
          </Grid>
        ))}
      </Grid>
      
    </div>
  );
}

export default Courses;
