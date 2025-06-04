"use client";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

const Intro = () => {
  const router = useRouter();

  const handleFinish = () => {
    sessionStorage.setItem("hasSeenIntro", "true");
    router.replace("/");
  };

  return <Loader onFinish={handleFinish} />;
};

export default Intro;
