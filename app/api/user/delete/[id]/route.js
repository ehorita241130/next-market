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
import { NextResponse } from "next/server"
import connectDB        from "../../../../utils/database"
//import { ItemModel }    from "../../../../utils/schemaModels"
import { UserModel }    from "../../../../utils/schemaModels"
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export async function DELETE(request, context){
  try{
    await connectDB();
    const params = await context.params;//Added
    await UserModel.deleteOne({_id: params.id});//Mdf
    //await ItemModel.deleteOne({_id: params.id});//Mdf
    //await ItemModel.deleteOne({_id: context.params.id}) 
    return NextResponse.json({message: "ユーザー削除成功"})
  }
  catch(err){
    console.log('-- api/user/delete/_/route.DELETE()#1:err='); console.dir(err);
    return NextResponse.json({message: "ユーザー削除失敗"})
  }
}
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
