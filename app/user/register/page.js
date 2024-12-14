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
'use client';//User Component
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const trcLev = 2;
const path = 'app/user/register/page';
//======================================================================
const url0 = process.env.NEXT_PUBLIC_URL;
const url1 = 'api/user/register';//New
const url2 = `${url0}/${url1}`;//New
//const url = 'http://localhost:3000/api/user/register';//CmOut
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import { useState } from 'react';//Only for User Component.
import Header       from '../../components/header';//Added
import Footer       from '../../components/footer';//Added
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function Register(){//<1
  //======================================================================
  const [name, setName] = useState('') 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  //======================================================================
  if( trcLev >= 2 ){//<2
    console.log(`-- ${path}.Register()#1:url0=${url0}`);
  }//2>
  //======================================================================
  async function handleSubmit(evt){//<2
    evt.preventDefault();
    try{//<3
      const headers1 = 
        { 
          'Accept': 'application/json', 
          'Content-Type': 'application/json'
        };
      const reqBod1 = 
        { 
          name: name,
          email: email,
          password: password
        };
      const reqOb1 = 
        {
          method: 'POST',
          headers: headers1,
          body: JSON.stringify(reqBod1)
        };
      const response = await fetch(`${url2}`, reqOb1);//Mdf
      //const response = await fetch(`${url}`, reqOb1); 
      const jsonData = await response.json();
      alert(jsonData.message);
    }//3>
    catch(err){//<3
      console.log(`-- ${path}.Register.handleSubmit()#1:err=`); 
      console.dir(err);
      alert(`ユーザー登録失敗:url0=${url0}`);
    }//3>
  }//2>
  //======================================================================
  return (//<2
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
  );//2>
}//1>
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export default Register;
