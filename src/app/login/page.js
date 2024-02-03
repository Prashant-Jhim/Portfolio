"use client"
import {getFirestore} from "@firebase/firestore"
import {getStorage,getDownloadURL, ref, uploadBytes} from 'firebase/storage'
import {addDoc,updateDoc,doc, collection,getDocs,query,where} from 'firebase/firestore'
import {useState,useEffect,useRef} from 'react'
import styles from './page.module.css'
import app from '../Database/db'
const bcrypt = require("bcryptjs")
import { useRouter } from 'next/navigation'

// Component for adding tech 
const Tech = () =>{
    var [arr,changearr] = useState([])
    var [textarr,changetextarr] = useState([])
    // Function To Make Array and add buttons 
    const addTech = (event) =>{
        if (event.key == "Enter"){
        const value = document.getElementById("tech").value
        const storedkey = window.localStorage.getItem("arr")
        var newkey ;
        if (storedkey != undefined){
            newkey = storedkey + "~" + value 
        } 
        if (storedkey == undefined){
            newkey = value
        }

        window.localStorage.setItem("arr",newkey)
        const prevarr = arr 
        const newinput = {index:arr.length ,value:value}
        changetextarr([...textarr,value])
        changearr([...arr,newinput])

        document.getElementById("tech").value = ''
        
        }
        
       
    }
    // Card 
    const Cards = () =>{

        // Delete The Card 
    const DelCard = (event) =>{
        const index = event.target.id
        const refarr = arr 
        refarr[index] = undefined
        textarr[index] = "NOTHING123"
        changearr([...refarr])
        const newarr = [...textarr]
        const text = newarr.join("~")
        window.localStorage.setItem('arr',text)
        
        
       
    } 
        return (
            <div id = {styles.List}>
                       {arr.map((data)=>{
                        if (data != undefined){
                            return ( <button onClick={DelCard} id = {data.index}>x {data.value}</button>)
                       }})}
                       </div>
        )
    }
    return (
        <div id = {styles.TechnoDiv}>
                       <input onKeyPress={addTech} id = "tech" type = "text" placeholder = "Enter The Technology Used" />
                       <Cards/>
                       </div>
    )
}
 const page = () =>{
    const Router = useRouter()
    // Firestorage Reference 
    const storage =  getStorage(app)
    // Firestore Reference 
    const db = getFirestore(app)
    // Collection References
    const colref = collection(db,'users')
    const colref2 = collection(db,"projects")

    // Switches for changing the tab
    const [switchs,changeswitch] = useState("login")
    // To Check Whether Developer Logout or not 
    useEffect(()=>{
        const Email = window.localStorage.getItem("Email")
        if (Email == undefined){
            changeswitch("login")
        }
        if (Email != undefined){
            changeswitch("success")
        }
    },[])

    // To Store Img Ref
    const [ImgRef,ChangeImgRef] = useState(undefined)

   

    // Function To Check Login 
    const Login =  async() =>{
        const Email = document.getElementById("Email").value 
        const Password = document.getElementById("Password").value 
        const q = query(colref,where("Email","==",Email))
        const Data = await getDocs(q)
        const Arr = Data.docs.map((snapshot)=>snapshot.data())
        if (Arr.length == 0){
            document.getElementById("alert").style.display = 'flex'
            changealert(" Email and Password is Invalid")
        }
        if (Arr.length != 0){
            const Hashed = Arr[0].Password 
            const compare = await bcrypt.compare(Password,Hashed)
            if (compare == true){
                document.getElementById("alert").style.display = 'none'
                window.localStorage.setItem("Email",Email)
                changeswitch("success")
            }
            if (compare == false){
                document.getElementById("alert").style.display = 'flex'
            changealert(" Email and Password is Invalid")
            }
            
        }
        
    }
    // Function to preview image upload 
    const prevorupload = (event) =>{
        const file = event.target.files;
        ChangeImgRef(file[0])
        if (file) {
        const fileReader = new FileReader();
        const preview = document.getElementById('preview');
        fileReader.onload = event => {
            preview.setAttribute('src', event.target.result);
            document.getElementById(styles.upload).style.display = "none"
            document.getElementById(styles.upload2).style.display = "flex"

        }
        fileReader.readAsDataURL(file[0]);
    }
    }

    // Add new Learned technologies
    const NewTech = async() =>{
        const value = document.getElementById(styles.EnterTech1).value
        const Email = window.localStorage.getItem("Email")
        const q = query(colref,where("Email","==",Email))
        const Data = await getDocs(q)
        const Arr = Data.docs.map((snapshot)=>{
            return {data:snapshot.data(),id:snapshot.id}})
      
        const PreArr = Arr[0].data.Technologies
        const NewArr = [...PreArr,value]

        const docupd = doc(db,"users",Arr[0].id)
        
        const Verfied = {Technologies:[NewArr]}
        const Update = await updateDoc(docupd,Verfied)
        console.log(Update)

    }

    // Adding Project in Database
    const AddProject = async() =>{

        const upload = ImgRef
        const imgref = ref(storage,`images/${upload.name} + hahflahflh`)
        const upld = await uploadBytes(imgref,upload)
        const url = await getDownloadURL(upld.ref)


        const encrpttext = window.localStorage.getItem("arr")
        const arr = encrpttext.split("~")
        const Details = await addDoc(colref2,{
            Name:document.getElementById(styles.EnterTech2).value,
            Link:document.getElementById(styles.EnterTech3).value,
            Arr:arr,
            Imgsrc : url
        })
        window.localStorage.removeItem("arr")
        console.log(Details)
    }

    // Function To GetCall When i press Enter 
    const Enter = (event) =>{
       if (event.key == "Enter"){
        Login()
       }
    }
    //click the file input 
    const click = () =>{
        document.getElementById(styles.hiddenupload).click()
    }
    // Function to Update Portfolio 
    const update = (event) =>{
        const name = event.target.name
        if (name == "Technologies"){
            const value = document.getElementById(styles.EnterTech1).value
            console.log(value)
        }
        if (name == "Projects"){
            const project = {
                Name : document.getElementById(styles.EnterTech2).value,
                Link:document.getElementById(styles.EnterTech3).value,
                TechArr : arr
            }
            console.log(project)
        }
    }
    // Function to preview the image 
    const preview = () =>{
        document.getElementById("preview").style.display= "flex"
        document.getElementById(styles.AddDiv).style.display= "none"
       
    }
    const closepreview = () =>{
        document.getElementById("preview").style.display= "none"
        document.getElementById(styles.AddDiv).style.display= "flex"
    }
    // filter to add card in adding technologies part 
    const Card= () =>{
        if (switchs == "login"){
            return (
                <div id = {styles.LoginDiv}>
                    <p id = "alert">alert:{alert}</p>
                    <input id = "Email" type = "text" placeholder = "Enter The Email : " />
                    <input onKeyPress={Enter} id = "Password" type = "text" placeholder = "Enter The Password" />
                    <button onClick = {Login}>Login</button>
                </div>
            )
        }
        if (switchs == "success"){
            return (
                <div id = {styles.AddDiv}>
                    <button id = {styles.Clear}>🧹Clear</button>
                    <div id = {styles.TechDiv}>
                        <input    id = {styles.EnterTech1}  type = "text" placeholder = "Enter The Technology" />
                    <button name = "Technologies"  onClick={NewTech}>Add</button>
                    </div>
                    <h2>OR</h2>
                    <div id = {styles.ProjectDiv}>
                        <label>Project</label>
                        <button onClick={click} id = {styles.upload}>upload a Image </button>
                        <button onClick={preview} id = {styles.upload2}>preview</button>
                        <input  id = {styles.EnterTech2} type = "text" placeholder = "Name of Project" />
                        <input    id = {styles.EnterTech3} type = "text" placeholder = "Link of Project"/>
                      
                       <Tech/>
                       <button onClick={AddProject} name = "Projects"  id = {styles.AddBtn}>
                        Add
                       </button>
                    </div>

                   
                </div>
            )
        }
        if (switchs == "image"){
            return(
                <div></div>
            )
        }
        
    }
    // Back to Home
    const Back = () =>{
        window.localStorage.removeItem("Email")
        Router.push("/")
    }
    return (
    <div id = {styles.MainDiv}>
         <input onChange={prevorupload} id = {styles.hiddenupload} type = "file" />
        <button onClick = {Back} id = {styles.Back}>⏪ Back</button>
        <h1>Prashant Jhim👨🏻‍💻</h1>
        <div id = {styles.imgdiv}>
                    <img onClick={closepreview} id = "preview" src = "" />
                </div>
        <Card />
    </div>
    )
}
export default page 
