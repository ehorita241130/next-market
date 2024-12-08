//堀
//######################################################################
// File: "route.js".
// On nepi40 : (*home-common="/cygdrive/g/home2/"):
// (concat *home-common 
//   "pnotes/Miyoshi_Aki_A3570/P5613/next-market/app/api/item/update/[id]/"
//   "route.js")
// By Horita.
// On (2024 Nov 27).
//######################################################################
const cnt = 3;//Added.
const trcLev = 2;//Added.
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
import { NextResponse } from "next/server"
import connectDB        from "../../../../utils/database"
import { ItemModel }    from "../../../../utils/schemaModels" 
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export async function PUT(request, context){//<1
  const reqBody = await request.json();
  console.log('reqBody='); console.dir(reqBody);
  try{//<2
    await connectDB();
    let params = await context.params;//Added.
    const singleItem = await ItemModel.findById(params.id);//Added.
    if( trcLev >= 2 ){//<3
      console.log('-- api/item/update/_/route.PUT()#1:singleItem='); console.dir(singleItem);
    }//3>
    const email1 = singleItem.email;//mdf
    if( trcLev >= 2 ){//<3
      console.log(`-- api/item/update/_/route.PUT()#2:email1=${email1}`);//Added
    }//3>
    const email2 = reqBody.email;
    if( trcLev >= 2 ){//<3
      console.log(`-- api/item/update/_/route.PUT()#3:email2=${email2}`);//Added
    }//3>
    if( singleItem.email === reqBody.email ){//<3. Added.
      await ItemModel.updateOne({_id: params.id}, reqBody);//Mdf
      const rtnOb1 = {message: `アイテム編集成功#${cnt}`}
      return NextResponse.json(rtnOb1);
    }//3>
    else{//<3
      if( trcLev >= 1 ){//<4
        console.log(`--api/item/update/_/route.PUT()#4:`+
                    `singleItem.email=${email1}, reqBody.email=${email2}`
                   );
      }//4>
      const rtnOb2 = {message: `アイテム編集失敗1#${cnt}:他人のアイテムです．`};
      return NextResponse.json(rtnOb2);
    }//3>
  }//2>
  catch(err){//<2
    console.log('-- api/item/update/_/route.PUT()#5:err='); console.dir(err);//Added
    const rtnOb3 = {message: `アイテム編集失敗2#${cnt}`};
    return NextResponse.json(rtnOb3);
  }//2>
}//1>
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
