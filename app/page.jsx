"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

export default function IntroPage() {
  const router = useRouter();
  const [shouldShowLoader, setShouldShowLoader] = useState(false);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");

    if (hasSeenIntro) {
      router.replace("/home");
    } else {
      setShouldShowLoader(true);
    }
  }, [router]);

  const handleFinish = () => {
    sessionStorage.setItem("hasSeenIntro", "true");
    router.replace("/home");
  };

  if (!shouldShowLoader) return null;

  return <Loader onFinish={handleFinish} />;
}
