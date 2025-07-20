import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

export const metadata = {
  title: "The Best Dog Training Center & Hostel",
  description: "Train your dog with care and love",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Headland+One&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" href="/paw-icon.png" />
      </head>
      <body className="font-headland antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
