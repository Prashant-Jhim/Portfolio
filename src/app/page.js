"use client"
import {useState} from 'react'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'
import Head from 'next/head'
export default function Home() {
  const [src,changesrc] = useState("https://firebasestorage.googleapis.com/v0/b/chatapp-d6de4.appspot.com/o/images%2FIMG_2950.jpeg%20%2B%20hahflahflh?alt=media&token=8cef615b-a483-43ae-99b7-0d8a11b39600")
  const Router = useRouter()
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
      <button >GitHub</button>
   </div>
    <div id = {styles.NavDiv}>
      <h1 onClick = {Login}>
        PrashantJhim👨🏻‍💻
      </h1>
      <button onClick={options} id = {styles.Optbtn}>{opttext}</button>
      <button onClick={focus} name = "project" id = {styles.deskbtn1}>Projects</button>
      <button onClick={focus} name = "about" id = {styles.deskbtn2}>About</button>
      <button id = {styles.deskbtn3}>GitHub</button>
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

    <div id = {styles.Projects}>
      <h1>Projects</h1>
      <div id = {styles.ProjectList}>


        <div id = {styles.Project}>
          <img src = "https://firebasestorage.googleapis.com/v0/b/chatapp-d6de4.appspot.com/o/images%2FScreenshot%202024-01-20%20at%201.45.47%E2%80%AFPM.png?alt=media&token=0d1e5ff6-679b-4ac8-a0aa-d28b0e79ed80" />
          <div id = {styles.ProjectDetails}>
            <h1>ChatApp</h1>
            <p>Technologies</p>
            <ul>
              <li>ReactJS</li>
              <li>MongoDB</li>
              <li>ExpressJS</li>
              <li>NodeJS</li>
            </ul>
          </div>
        </div>

        <div id = {styles.Project}>
          <img src = "https://firebasestorage.googleapis.com/v0/b/chatapp-d6de4.appspot.com/o/images%2FScreenshot%202024-01-20%20at%201.45.47%E2%80%AFPM.png?alt=media&token=0d1e5ff6-679b-4ac8-a0aa-d28b0e79ed80" />
          <div id = {styles.ProjectDetails}>
            <h1>ChatApp</h1>
            <p>Technologies</p>
            <ul>
              <li>ReactJS</li>
              <li>MongoDB</li>
              <li>ExpressJS</li>
              <li>NodeJS</li>
            </ul>
          </div>
        </div>
        <div id = {styles.Project}>
          <img src = "https://firebasestorage.googleapis.com/v0/b/chatapp-d6de4.appspot.com/o/images%2FScreenshot%202024-01-20%20at%201.45.47%E2%80%AFPM.png?alt=media&token=0d1e5ff6-679b-4ac8-a0aa-d28b0e79ed80" />
          <div id = {styles.ProjectDetails}>
            <h1>ChatApp</h1>
            <p>Technologies</p>
            <ul>
              <li>ReactJS</li>
              <li>MongoDB</li>
              <li>ExpressJS</li>
              <li>NodeJS</li>
            </ul>
          </div>
        </div>


      </div>
    </div>
    

    
   
   </div>
  );
}
