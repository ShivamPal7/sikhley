import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import { ToastProvider } from "@/components/providers/toaster-provider";
import { ConfettiProvider } from "@/components/providers/confetti-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Sikhley",
  description: "Generated by Sikhley",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ConfettiProvider/>
          <SignedOut></SignedOut>
          <SignedIn></SignedIn>
          <ToastProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}




// import type { Metadata } from "next";
// // import localFont from "next/font/local";
// import "./globals.css";
// // import { ClerkProvider}from '@clerk/nextjs'
// import {
//   ClerkProvider,
//   // SignInButton,
//   SignedIn,
//   SignedOut,
//   // UserButton
// } from '@clerk/nextjs'
// import './globals.css'
// import { ToastProvider } from "@/components/providers/toaster-provider";
// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <ClerkProvider>
//       <html lang="en">
//         <body>
//           <SignedOut>
//             {/* <SignInButton /> */}
//           </SignedOut>
//           <SignedIn>
//             {/* <UserButton /> */}
//           </SignedIn>
//           <ToastProvider />
//           {children}
//         </body>
//       </html>
//     </ClerkProvider>
//   )
// }


// // const geistSans = localFont({
// //   src: "./fonts/GeistVF.woff",
// //   variable: "--font-geist-sans",
// //   weight: "100 900",
// // });
// // const geistMono = localFont({
// //   src: "./fonts/GeistMonoVF.woff",
// //   variable: "--font-geist-mono",
// //   weight: "100 900",
// // });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// // export default function RootLayout({
// //   children,
// // }: Readonly<{
// //   children: React.ReactNode;
// // }>) {
// //   return (
// //     <ClerkProvider>

   
// //     <html lang="en">
// //       <body
// //         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
// //       >
// //         {children}
// //       </body>
// //     </html> </ClerkProvider>
// //   );
// // }
