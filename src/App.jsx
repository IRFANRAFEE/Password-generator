import { useState } from 'react'

import './App.css'
import { useCallback } from 'react'
import { useEffect } from 'react'//when we need to change the state of a component or any thing we use hooks
import { useRef } from 'react'

function App() {
   const [length,setLength]=useState(8)
   const [numberAllowed,setNumberAllowed]=useState(false)
   const [characterAllowed,setCharacterAllowed]=useState(false)
   const [password,setpassword]= useState("")


   let passwordRef = useRef(null)

    const copyToClipBoared=useCallback(()=>{
      passwordRef.current?.select()
window.navigator.clipboard.writeText(password)

    },[password])
   const passwordGenerator= useCallback(()=>{
    
    let password =""
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) {
    string+="1234567890"
    }
    if (characterAllowed) {
    string+="`~@#$%^&*()_-=+{}|\][:;',.<>?/"
    }
    for (let i = 1;  i<length; i++) {
      let char = Math.floor(Math.random()*string.length+1)
   password += string.charAt(char)
    }
    setpassword(password) 
    console.log(password);
   },[length,numberAllowed,characterAllowed,setpassword])
 useEffect(()=>{
  passwordGenerator()
 },[length,numberAllowed,characterAllowed,setpassword])
 
  return (
    <>
   <main className='main'>
    <div className='input'>
      <input type="text" className='text' readOnly value={password}  />
      <input type="button" value="Copy"  className='btn'  onClick={copyToClipBoared}/>
    </div>
    <div className='checkbox'>
      <input type="range" name="" id="myRange" min={8} max={100} onChange={(e)=>{setLength(e.target.value)}} value={length} ref={passwordRef }/>
      <label htmlFor="myRange">Length:{length}</label>
      <input type="checkbox" name="mycheckbox" id="" onChange={()=>{
        setNumberAllowed((prev)=>!prev)
      }} />
      <label htmlFor="mycheckbox">Numbers</label>
      <input type="checkbox" name="" id="mysecondCheckBox" onChange={()=>{
        setCharacterAllowed((prev)=>!prev)
      }} />
      <label htmlFor="mysecondCheckBox">Characters</label>
    </div>
   </main>
    </>
  )
}

export default App
