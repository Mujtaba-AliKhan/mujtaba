// // import Hero from "@/components/Hero";
// // import Projects from "@/components/Projects";

// // export default function Home() {
// //   return (
// //     <main>
// //       <Hero />
// //       <Projects />
// //     </main>
// //   );
// // }

// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Hero from "@/components/Hero";
// import Projects from "@/components/Projects";

// export default function Home() {
//   const [ready, setReady] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const alreadyLoaded = sessionStorage.getItem("hasLoaded");

//     if (!alreadyLoaded) {
//       router.replace("/intro");
//     } else {
//       setReady(true);
//     }
//   }, [router]);

//   if (!ready) return null;

//   return (
//     <main>
//       <Hero />
//       <Projects />
//     </main>
//   );
// }

"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const seenIntro = sessionStorage.getItem("hasSeenIntro");
    if (!seenIntro) {
      router.replace("/intro");
    }
  }, [router]);

  return (
    <main>
      <Hero />
      <Projects />
    </main>
  );
}
