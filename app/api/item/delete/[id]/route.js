//堀
//######################################################################
// File: "route.js".
// On nepi40 : (*home-common="/cygdrive/g/home2/"):
// (concat *home-common 
//   "pnotes/Miyoshi_Aki_A3570/P5613/next-market/app/api/item/delete/[id]/"
//   "route.js")
// By Horita.
// On (2024 Nov 27).
//######################################################################
const cnt = 3;//Added
const trcLev = 2;//Added
const path = 'app/api/item/delete/_/route';//Added.
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import { NextResponse } from 'next/server'
import connectDB        from '../../../../utils/database'
import { ItemModel }    from '../../../../utils/schemaModels'
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export async function DELETE(request, context){
  try{
    const reqBody = await request.json();
    if( trcLev >= 1 ){
      console.log(`-- ${path}.DELETE()#1:reqBody=`); 
      console.dir(reqBody);
    }
    await connectDB();
    const params = await context.params;//Added
    const singleItem = await ItemModel.findById(params.id);//Added.
    if( singleItem.email === reqBody.email ){
      //v Deletion can be done, only by the creator.
      await ItemModel.deleteOne({_id: params.id});
      const rtnOb1 = {message: `アイテム削除成功#${cnt}`};
      return NextResponse.json(rtnOb1);
    }
    else{
      if( trcLev >= 1 ){
        console.log(`-- ${path}.DELETE()#2:email-mismatch,`+
                    `singleItem.email=${singleItem.email},`+ 
                    `reqBody.email=${reqBody.email}`
                   );
      }
      const rtnOb2 = {message: `アイテム削除失敗A#${cnt}:他人のアイテムです.`};
      return NextResponse.json(rtnOb2);
    }
  }
  catch(err){
    console.log(`-- ${path}.DELETE()#3:err=`);
    console.dir(err);
    return NextResponse.json({message: `アイテム削除失敗B#${cnt}:some-errs`});
  }
}
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
