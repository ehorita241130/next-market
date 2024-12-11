//堀
//######################################################################
// File: "useAuth.js".
// On nepi40 : (*home-common="/cygdrive/g/home2/"):
// (concat *home-common 
//   "pnotes/Miyoshi_Aki_A3570/P5613/next-market/app/utils/"
//   "useAuth.js")
// By Horita.
// On (2024 Dec 1).
//######################################################################
const trcLev = 2;//Added
const plainSecretKey = 'next-market-app-book';
const path = 'app/utils/useAuth';//Added
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtVerify } from 'jose'; 
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function useAuth(){//<1
  const [loginUserEmail, setLoginUserEmail] = useState('');
  const router = useRouter();
  //======================================================================
  function checkToken1(){//<2
    //----------------------------------------------------------------------
    async function checkToken(){//<4
      const token = localStorage.getItem('token');
      if( trcLev >= 2 ){
        console.log(`-- ${path}.useAuth()#1:token=`);//Added
        console.dir(token);//Added
      }
      if( !token ){//<5. When token is OK (NOT undefined/empty).
        router.push('/user/login')
      }//5>
      try{//<5
        const secretKey = new TextEncoder().encode(plainSecretKey) 
        const decodedJwt = await jwtVerify(token, secretKey) 
        setLoginUserEmail(decodedJwt.payload.email)
      }//5>
      catch(err){//<5
        console.log(`-- ${path}.useAuth()#2:err=`);//Added
        console.dir(err);//Added
        router.push('/user/login')
      }//5>
    }//4>
    //----------------------------------------------------------------------
    checkToken();
  }//2>
  //======================================================================
  useEffect(checkToken1, [router]);
  //======================================================================
  return loginUserEmail;
}//1>
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export default useAuth
