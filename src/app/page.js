"use client"
import {useState,useEffect} from 'react'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'
import Head from 'next/head'

import {addDoc,updateDoc,doc, collection,getDocs,query,where} from 'firebase/firestore'
import {getFirestore} from "@firebase/firestore"
import app from './Database/db'
export default function Home() {
  const [src,changesrc] = useState("https://firebasestorage.googleapis.com/v0/b/chatapp-d6de4.appspot.com/o/images%2FIMG_2950.jpeg%20%2B%20hahflahflh?alt=media&token=8cef615b-a483-43ae-99b7-0d8a11b39600")
  const Router = useRouter()
  // Database reference 
  const db = getFirestore(app)
  const [arrofproj,changeprojarr] = useState([])
  const colref = collection(db,'projects')
  const [opttext,changetext] = useState("Options")
  //function to get the div into focus 
  const focus = (event) =>{
    const name = event.target.name 
    console.log(name)
    if (name == "about"){
      document.getElementById(styles.Options).style.display = "none"
      document.getElementById(styles.About).scrollIntoView();
      changetext("Options")
    }
    if (name == 'project'){
      document.getElementById(styles.Options).style.display = "none"
      document.getElementById(styles.Projects).scrollIntoView();
      changetext("Options")
    }
  }

  // Card Component for Project Card 
  const ProjectCard = (props) =>{
    const arr = props.arr 

    // Map the Technologies
    const nestedcard = (data) =>{
      return (
        <>
          <li>{data}</li>
        </>
      )
    }
    return (
     <>
        <a href = {props.Link}>
      <div id = {styles.Project}>
        
      <img alt = "afj;a;jfa" src = {props.src} />
      <div id = {styles.ProjectDetails}>
        <h1>{props.Name}</h1>
        <p>Technologies</p>
       <ul>
        {arr.map(nestedcard)}
       </ul>
      </div>
    </div>
    </a>
    </>
    )
  }
  // Function to Fetch Projects Data 
  const FetchProjects = async() =>{
    const doc = await getDocs(colref)
    const arr = doc.docs.map((snapshot)=>({...snapshot.data(),id:snapshot.id}))
    changeprojarr(arr)

    console.log(arrofproj)
  }

  // UseEffect to call Function 
  useEffect(()=>{
    FetchProjects()
  },[])
  // Function To Open options Tab 
  const options = () =>{
    if (opttext == "Options"){
    document.getElementById(styles.Options).style.display = 'flex'
    changetext("Close")
    return 0
    }
    if (opttext == "Close"){
      document.getElementById(styles.Options).style.display = 'none'
      changetext("Options")
      return 0
    }
  }

  //Go To Login Page 
  const Login = () =>{
    Router.push("/login")
  }
  return (
   <div id = {styles.MainDiv}>
   <Head>
    <title>PrashantJhim👨🏻‍💻</title>
   </Head>
   <div id = {styles.Options}>
      <button onClick={focus} name = "project" >Projects</button>
      <button onClick={focus} name = "about">About</button>
      <button id = {styles.deskbtn3mob} ><a href = "https://github.com/Prashant-Jhim">GitHub</a></button>
   </div>
    <div id = {styles.NavDiv}>
      <h1 onClick = {Login}>
        PrashantJhim👨🏻‍💻
      </h1>
      <button onClick={options} id = {styles.Optbtn}>{opttext}</button>
      <button onClick={focus} name = "project" id = {styles.deskbtn1}>Projects</button>
      <button onClick={focus} name = "about" id = {styles.deskbtn2}>About</button>
      <button id = {styles.deskbtn3}><a href = "https://github.com/Prashant-Jhim">GitHub</a></button>
    </div>
    
    <div id = {styles.About}>
      <img src = {src} />
      <div id = {styles.Details}>
        <h1>Prashant Jhim👨🏻‍💻</h1>
        <p>FullStack Developer based in Toronto Canada 🇨🇦</p>
        <p>Contact Me</p>
        <a href = "https://www.instagram.com/prashant_jhim/?hl=en" >Instagram  📸</a>
        <a  href = "mailto: prashantjhim2023@gmail.com">Email ✉️</a>
        
        
      </div>
    </div>

    <div id = {styles.TechnoDiv}>
      <h1>Technologies i Known</h1>
      <ul>
        <li>ReactJS</li>
        <li>NodeJS</li>
        <li>MongoDB</li>
        <li>NextJS</li>
        <li>ExpressJS</li>
        <li>FireBase</li>
        <li>NextAuth.js</li>
      </ul>
    </div>

    <div id = {styles.Projects}>
      <h1>Projects</h1>
      <div id = {styles.ProjectList}>


       {arrofproj.map((data)=>(<ProjectCard Link ={data.Link} Name = {data.Name} src={data.Imgsrc} arr = {data.Arr}/>))}

       
      </div>
    </div>
    

    
   
   </div>
  );
}
