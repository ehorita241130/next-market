//堀
//######################################################################
// File: "route.js".
// On nepi40 : (*home-common="/cygdrive/g/home2/"):
// (concat *home-common 
//   "pnotes/Miyoshi_Aki_A3570/P5613/next-market/app/api/user/readall/"
//   "route.js")
// By Horita.
// On (2024 Nov 30).
//######################################################################
const cnt = 3;//Added
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import { NextResponse } from "next/server"
import connectDB        from "../../../utils/database"
//import { ItemModel }    from "../../../utils/schemaModels"
import { UserModel }    from "../../../utils/schemaModels"
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export async function GET(){//<1
  try{//<2
    await connectDB()  
    const allItems = await UserModel.find() 
    return NextResponse.json({message: `User読み取り成功(オール)#${cnt}`, allItems: allItems});
  }//2>
  catch(err){//<2. Mdf.
    console.log('api/user/readall/route.GET()#1:err='); console.dir(err);//Added.
    return NextResponse.json({message: `アイテム読み取り(オール)失敗#${cnt}`});
  }//2>
}//1>
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export const revalidate = 0;//Added
