//堀
//######################################################################
// File: "route.js".
// On nepi40 : (*home-common="/cygdrive/g/home2/"):
// (concat *home-common 
//   "pnotes/Miyoshi_Aki_A3570/P5613/next-market/app/api/user/delete/[id]/"
//   "route.js")
// By Horita.
// On (2024 Nov 30).
//######################################################################
const path = 'app/api/user/delete/_/route';//Added
//**********************************************************************
import { NextResponse } from 'next/server'
import connectDB        from '../../../../utils/database'
import { UserModel }    from '../../../../utils/schemaModels'
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export async function DELETE(request, context){
  try{
    await connectDB();
    const params = await context.params;//Added
    await UserModel.deleteOne({_id: params.id});//Mdf
    let rtnOb1 = {message: 'ユーザー削除成功'};
    return NextResponse.json(rtnOb1);
  }
  catch(err){
    console.log(`-- ${path}.DELETE()#1:err=`); 
    console.dir(err);
    let rtnOb2 = {message: 'ユーザー削除失敗'};
    return NextResponse.json(rtnOb2)
  }
}
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
