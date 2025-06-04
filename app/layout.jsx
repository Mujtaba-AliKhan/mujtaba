import "../styles/globals.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata = {
  title: "Mujtaba Ali Khan | Web Developer",
  description:
    "Portfolio of Mujtaba Ali Khan – a full-stack web developer skilled in React, Flask, and responsive UI development. Explore projects, experience, and contact details.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="preload"
          as="video"
          href="/assets/hero/hero-bg.mp4"
          type="video/mp4"
        />
      </head>

      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
