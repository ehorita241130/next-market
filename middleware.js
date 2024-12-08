//堀
//######################################################################
// File: "middleware.js".
// On nepi40 : (*home-common="/cygdrive/g/home2/"):
// (concat *home-common 
//   "pnotes/Miyoshi_Aki_A3570/P5613/next-market/"
//   "middleware.js")
// By Horita.
// On (2024 Nov 28).
//######################################################################
const trcLev = 2;//Added
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import { NextResponse } from "next/server"
import { SignJWT }      from "jose"
import { jwtVerify }    from "jose";//Added
//import { webcrypto as crypto} from "crypto";//Added
//import crypto from "crypto";//Added
//import crypto from "crypto";//New
//import { createHash } from "crypto";//New
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export async function middleware(request){//<1
  console.log('-- middleware()#1');
  const token =
'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImR1bW15QGdtYWlsLmNvbSIsImV4cCI6MTczMzEyNzk0MX0.w6yYYZYaCQELzHRXHrGdQJJ9aMztSwRP-_AZht4oluo';
  let startSec = Math.floor(Date.now()/1000);
  const token1 = await request.headers.get('Authorization')?.split(' ')[1];//Added.
  if( trcLev >= 2 ){//<2
    console.log('-- middleware()#2:token='); console.dir(token);//Tracing.
    console.log(`-- middleware()#3:startSec=${startSec}`);
    console.log('-- middleware()#3B:token1='); console.dir(token1);//Tracing.
  }//2>
  try{//<2
    const secretKey = new TextEncoder().encode("next-market-app-book");
    console.log('-- middleware()#4:secretKey='); console.dir(secretKey);//Tracing.
    const reqBody = await request.json();//Added2
    const payload = { email: reqBody.email };//Added.
    console.log('-- middleware()#5:payload='); console.dir(payload);//Tracing.
    const token2 = 
      await new SignJWT(payload)
      .setProtectedHeader({alg: "HS256"})
      .setExpirationTime("1d")//Meaning 1 day.
      .sign(secretKey);
    if( trcLev >= 2 ){
      console.log('-- middleware()#6:token2='); console.dir(token2);//Tracing.
    }
    const decodedJwt1 = await jwtVerify(token1, secretKey);//New
    //const decodedJwt = await jwtVerify(token, secretKey);
    const payload1 = decodedJwt1.payload;
    const exp1 = payload1.exp;
    const difSec1 = exp1 - startSec;
    const difHour1 = difSec1 / 3600;
    const decodedJwt2 = await jwtVerify(token2, secretKey);
    const payload2 = decodedJwt2.payload;
    const exp2 = payload2.exp;
    const difSec2 = exp2 - startSec;
    const difHour2 = difSec2 / 3600;
    if( trcLev >= 2 ){//<3
      console.log('-- middleware()#7:decodedJwt1='); console.dir(decodedJwt1);
      console.log(`-- middleware()#8:exp1=${exp1}, difSec1=${difSec1}, difHour1=${difHour1}`);
      console.log('-- middleware()#9:decodedJwt2='); console.dir(decodedJwt2);
      console.log(`-- middleware()#10:exp2=${exp2}, difSec2=${difSec2}, difHour2=${difHour2}`);
    }//3>
    return NextResponse.next();
  }//2>
  catch(err){//<2
    console.log(`-- middleware()#11:err=`); console.dir(err);//Added.
    return NextResponse.json({message: 'middleware()#12:Bad token(please login)/Other errs'});
  }//2>
}//1>
//**********************************************************************
export const config = {
  matcher: [
    //"/api/item/readall",//Tracing.
    "/api/item/create",
    "/api/item/update/:path*",
    "/api/item/delete/:path*"
  ],
}
//**********************************************************************
