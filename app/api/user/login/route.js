//堀
//######################################################################
// File: "route.js".
// On nepi40 : (*home-common="/cygdrive/g/home2/"):
// (concat *home-common 
//   "pnotes/Miyoshi_Aki_A3570/P5613/next-market/app/api/user/login/"
//   "route.js")
// By Horita.
// On (2024 Nov 27).
//######################################################################
const cnt = 8;//Added
const trcLev = 2;//Added
const plainSecret = "next-market-app-book";//Added
const path = 'app/api/user/login/route';//Added
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import { NextResponse } from "next/server"
import { SignJWT }      from "jose"
import { jwtVerify }    from "jose";//Added for JSON Web Token (JWT).
import connectDB        from "../../../utils/database"
import { UserModel }    from "../../../utils/schemaModels"  
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export async function POST(req){//<1
  const reqBody = await req.json();
  const email = reqBody.email;//New
  console.log(`-- ${path}.POST()#1:reqBody.email=${email}`);
  try{//<2
    await connectDB();
    const savedUserData = await UserModel.findOne({email: email});
    console.log(`-- ${path}.POST()#2:findOne() done.`);
    if( trcLev >= 1 ){//<3
      console.log(`-- ${path}.POST()#3:savedUserData=`);
      console.dir(savedUserData);
    }//3>
    if( savedUserData ){//<3. ユーザーデータが存在する場合の処理.
      if( reqBody.password === savedUserData.password ){//<4. パスワードが正しい場合の処理.
        const secretKey = new TextEncoder().encode(plainSecret);//Added
        const payload = { email: email };//Added.
        if( trcLev >= 2 ){//<5
          console.log(`-- ${path}.POST()#4:secretkey=`);//Tracing
          console.dir(secretKey);//Tracing
          console.log(`-- ${path}.POST()#5:payload=`, payload);//Tracing
        }//5>
        const token = 
          await new SignJWT(payload)
          .setProtectedHeader({alg: "HS256"})
          .setExpirationTime("10d")//Meaning 10 days. Mdf.
          .sign(secretKey);
        if( trcLev >= 2 ){//<5
          console.log(`-- ${path}.POST()#5:token=`); 
          console.dir(token);
        }//5>
        const decodedJwt = await jwtVerify(token, secretKey);
        if( trcLev >= 2 ){//<5
          console.log(`-- ${path}.POST()#6:decodedJwt=`); 
          console.dir(decodedJwt);
        }//5>
        return NextResponse.json({message: `ログイン成功#${cnt}`, token: token});//Mdf
      }//4>
      else{//<4
        return NextResponse.json({message: `ログイン失敗A#${cnt}：password-mismatch`});
      }//4>
    }//3>
    else{//<3. ユーザーデータが存在しない場合の処理.
      return NextResponse.json({message: `ログイン失敗B#${cnt}：ユーザー未登録`});
    }//3>
  }//2>
  catch(err){//<2
    cosole.log(`-- ${path}.POST()#7:err=`);//Added
    console.dir(err);//Added
    return NextResponse.json({message: `ログイン失敗C#${cnt}:some exceptions`});
  }//2> 
}//1>
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
