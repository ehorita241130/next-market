//堀
//######################################################################
// File: "page.js".
// On nepi40 : (*home-common="/cygdrive/g/home2/"):
// (concat *home-common 
//   "pnotes/Miyoshi_Aki_A3570/P5613/next-market/app/user/register/"
//   "page.js")
// By Horita.
// On (2024 Nov 30).
//######################################################################
"use client" 
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const trcLev = 1;
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import { useState } from "react";
import Header from '../../components/header';//Added
import Footer from '../../components/footer';//Added
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function Register(){
  //======================================================================
  const [name, setName] = useState("") 
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  //======================================================================
  if( trcLev >= 2 ){
    console.log(`-- process.env.NEXT_PUBLIC_URL=${process.env.NEXT_PUBLIC_URL}`);
  }
  //======================================================================
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const reqOb1 = 
        { 
          name: name,
          email: email,
          password: password
        };
      const headers1 = 
        { 
          "Accept": "application/json", 
          "Content-Type": "application/json"
        }
      const reqOb2 = 
        {
          method: "POST",
          headers: headers1,
          body: JSON.stringify(reqOb1)
        };
      const response = await fetch('http://localhost:3000/api/user/register', reqOb2); 
      const jsonData = await response.json();
      alert(jsonData.message);
    }
    catch(err){
      console.log('-- Register.handleSubmit()#1:err='); console.dir(err);
      alert("ユーザー登録失敗");
    }
  }
  //======================================================================
  return (
    <div>
      <Header/>
      <h1 className='page-title'>ユーザー登録</h1>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} 
          type='text' name='name' placeholder='名前' required/> 
        <input value={email} onChange={(e) => setEmail(e.target.value)} 
          type='text' name='email' placeholder='メールアドレス' required/>
        <input value={password} onChange={(e) => setPassword(e.target.value)} 
          type='text' name='password' placeholder='パスワード' required/>
        <button>登録</button>
      </form>
      <Footer/>
    </div>
  );
}
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export default Register;
