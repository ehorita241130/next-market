//堀
//######################################################################
// File: "route.js".
// On nepi40 : (*home-common="/cygdrive/g/home2/"):
// (concat *home-common 
//   "pnotes/Miyoshi_Aki_A3570/P5613/next-market/app/api/user/register/"
//   "route.js")
// By Horita.
// On (2024 Nov 27).
//######################################################################
import { NextResponse } from "next/server"
import connectDB        from "../../../utils/database"
import { UserModel }    from "../../../utils/schemaModels"
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export async function POST(request){
  const reqBody = await request.json();
  try{
    await connectDB();
    await UserModel.create(reqBody);
    return NextResponse.json({message: "ユーザー登録成功"});
  }
  catch(err){
    console.log('api/user/register/route.POST()#1:err='); console.dir(err);//Added.
    return NextResponse.json({message: "ユーザー登録失敗"});
  }
}
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
