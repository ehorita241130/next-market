//堀
//######################################################################
// File: "page.js".
// On nepi40 : (*home-common="/cygdrive/g/home2/"):
// (concat *home-common 
//   "pnotes/Miyoshi_Aki_A3570/P5613/next-market/app/user/login/"
//   "page.js")
// By Horita.
// On (2024 Nov 30).
//######################################################################
'use client';//Client Component.
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const trcLev = 2;//New
const url0 = process.env.NEXT_PUBLIC_URL;//New
const url1 = 'api/user/login';//New
const url2 = `/${url1}`;//New
//const url2 = `${url0}/${url1}`;//New
//const url = 'http://localhost:3000/api/user/login';
//`${process.env.NEXT_PUBLIC_URL}/api/user/login`
const path = 'app/user/login';//Added
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import { useState } from 'react'
import Header       from '../../components/header';//Added
import Footer       from '../../components/footer';//Added
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function Login(){//<1
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //======================================================================
  async function handleSubmit(evt){//<2
    evt.preventDefault();
    const headers1 =
     { 
       'Accept': 'application/json', 
       'Content-Type': 'application/json'
     };
    const reqBody = 
      {
        email: email,
        password: password
      };
    const reqOb =
      {
        method: 'POST',
        headers: headers1,
        body: JSON.stringify(reqBody)
      };
    try{//<3
      const response = await fetch(url2, reqOb);
      //const response = await fetch(url, reqOb);
      const jsonData = await response.json();
      if( trcLev >= 2 ){//<3
        console.log(`-- ${path}.Login()#1:jsonData=`); 
        console.dir(jsonData);
        console.log(`-- ${path}.Login()#2:jsonData.token=`); 
        console.dir(jsonData.token);
      }//3>
      //v Storing token in the local storage.
      localStorage.setItem('token', jsonData.token);
      alert(jsonData.message);
    }//3>
    catch(err){//<3
      console.log(`-- ${path}.Login()#3:err=`); console.dir(err);
      alert("ログイン失敗")
    }//3>
  }//2>
  //======================================================================
  return (
    <div>
      <Header/>
      <h1 className='page-title'>ログイン：</h1>
      <form onSubmit={handleSubmit}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} 
          type='text' name='email' placeholder='メールアドレス' required/><br/>
        <input value={password} onChange={(e) => setPassword(e.target.value)} 
          type='text' name='password' placeholder='パスワード' required/><br/>
        <button>ログイン</button>
      </form>
      <Footer/>
    </div>
  );
  //======================================================================
}//1>
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export default Login;
