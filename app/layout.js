//堀
//######################################################################
// File: "layout.js".
// On nepi40 : (*home-common="/cygdrive/g/home2/"):
// (concat *home-common 
//   "pnotes/Miyoshi_Aki_A3570/P5613/next-market/app/"
//   "layout.js")
// By Horita.
// On (2024 Nov 30).
//######################################################################
import localFont from "next/font/local";
import "./globals.css";
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
//**********************************************************************
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
//**********************************************************************
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
//**********************************************************************
export default function RootLayout({ children }){
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}