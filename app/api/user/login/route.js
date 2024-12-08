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
const plainPass = "next-market-app-book";//Added
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import { NextResponse } from "next/server"
import { SignJWT }      from "jose"
import { jwtVerify }    from "jose";//Added
import connectDB        from "../../../utils/database"
import { UserModel }    from "../../../utils/schemaModels"  
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export async function POST(req){//<1
  const reqBody = await req.json();
	const email = reqBody.email;//New
  console.log(`user/login/route.POST():reqBody.email=${email}`);
  try{//<2
    await connectDB();
    const savedUserData = await UserModel.findOne({email: email});
    console.log('-- user/login/route.POST():findOne() done');
    if( trcLev >= 1 ){//<3
      console.log('-- user/login/route.POST():savedUserData=');
      console.dir(savedUserData);
    }//3>
    if( savedUserData ){//<3
      if( reqBody.password === savedUserData.password ){//<4. パスワードが正しい場合の処理.
        const secretKey = new TextEncoder().encode(plainPass);//Added
        const payload = { email: email };//Added.
        const token = 
          await new SignJWT(payload)
          .setProtectedHeader({alg: "HS256"})
          .setExpirationTime("1d")
          .sign(secretKey);
        if( trcLev >= 2 ){//<5
          console.log('-- user/login/route.POST():secretkey=');//Tracing
          console.dir(secretKey);//Tracing
          console.log('-- user/login/route.POST():payload=', payload);//Tracing
          console.log('-- user/login/route.POST():token='); console.dir(token);
        }//5>
        const decodedJwt = await jwtVerify(token, secretKey);
        if( trcLev >= 2 ){//<5
          console.log('-- user/login/route.POST():decodedJwt='); console.dir(decodedJwt);
        }//5>
        return NextResponse.json({message: `ログイン成功#${cnt}`, token: token});//Mdf
      }//4>
      else{//<4
        return NextResponse.json({message: `ログイン失敗#${cnt}：password mismatch`})
      }//4>
    }//3>
    else{//<3. ユーザーデータが存在しない場合の処理.
      return NextResponse.json({message: `ログイン失敗#${cnt}：ユーザー登録をしてください`})
    }//3>
  }//2>
  catch{//<2
    return NextResponse.json({message: `ログイン失敗#${cnt}`}) 
  }//2> 
}//1>
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
