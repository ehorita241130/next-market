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
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtVerify } from 'jose'; 
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function useAuth(){//<1
  const [loginUserEmail, setLoginUserEmail] = useState('');
  const router = useRouter();
  //======================================================================
  function checkToken0(){//<2
    //----------------------------------------------------------------------
    async function checkToken(){//<4
      const token = localStorage.getItem('token');
			if( trcLev >= 2 ){
        console.log('-- utils/useAuth/useAuth()#1:token=');//Added
        console.dir(token);//Added
			}
      if( !token ){//<5
        router.push('/user/login')
      }//5>
      try{//<5
        const secretKey = new TextEncoder().encode('next-market-app-book') 
        const decodedJwt = await jwtVerify(token, secretKey) 
        setLoginUserEmail(decodedJwt.payload.email)
      }//5>
      catch(err){//<5
        console.log('-- utils/useAuth/useAuth()#2:err=');//Added
        console.dir(err);//Added
        router.push('/user/login')
      }//5>
    }//4>
    //----------------------------------------------------------------------
    checkToken();
  }//2>
  //======================================================================
  useEffect(checkToken0, [router]);
  //======================================================================
  return loginUserEmail;
}//1>
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export default useAuth
