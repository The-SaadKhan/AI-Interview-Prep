// import { Toaster } from "sonner";
// import type { Metadata } from "next";
// import { Mona_Sans } from "next/font/google";

// import "./globals.css";

// const monaSans = Mona_Sans({
//   variable: "--font-mona-sans",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "PrepWise",
//   description: "An AI-powered platform for preparing for mock interviews",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" className="dark">
//       <body className={`${monaSans.className} antialiased pattern`}>
//         {children}

//         <Toaster />
//       </body>
//     </html>
//   );
// }
// app/layout.tsx or app/layout.ts depending on setup

import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";

import "./globals.css";

// ✅ Use className — no variables needed unless using CSS variables
const monaSans = Mona_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "InterviewAI Pro - Master Your Interview Skills",
  description:
    "Elevate your career with AI-powered interview coaching. Real-time feedback, personalized practice sessions, and expert guidance to ace any interview.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${monaSans.className} antialiased pattern`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
