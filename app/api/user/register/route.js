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
import { NextResponse } from 'next/server'
import connectDB        from '../../../utils/database'
import { UserModel }    from '../../../utils/schemaModels'
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const path = 'app/api/user/register';
//**********************************************************************
export async function POST(request){
  const reqBody = await request.json();
  try{
    await connectDB();
    await UserModel.create(reqBody);
    const rtnOb1 = {message: "ユーザー登録成功"};
    return NextResponse.json(rtnOb1);
  }
  catch(err){
    console.log(`${path}/route.POST()#1:err=`);//Added
    console.dir(err);//Added
    const rtnOb2 = {message: "ユーザー登録失敗"};
    return NextResponse.json(rtnOb2);
  }
}
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
