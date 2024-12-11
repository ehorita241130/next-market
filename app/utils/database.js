//堀
//######################################################################
// File: "database.js".
// On nepi40 : (*home-common="/cygdrive/g/home2/"):
// (concat *home-common 
//   "pnotes/Miyoshi_Aki_A3570/P5613/next-market/app/utils/"
//   "database.js")
// By Horita.
// On (2024 Nov 27).
//######################################################################
import mongoose from "mongoose";
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
async function connectDB(){//<1
  try{//<2
    const dbSpec =
      "mongodb+srv://ehorita:IR24bOsCwN64QNGj"+
      "@cluster0.ohhtd.mongodb.net/nextAppDataBase"+
      "?retryWrites=true&w=majority&appName=Cluster0"
    await mongoose.connect(dbSpec);
    await console.log("-- database.connectDB()#1:Success: Connected to MongoDB");
  }//2>
  catch(err){//<2
    console.log('-- app/utils/database.connectDB():err=');
    console.dir(err);
    console.log("-- database.connectDB()#2:Failure: Unconnected to MongoDB");
    throw new Error();
  }//2>
}//1>
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
export default connectDB
