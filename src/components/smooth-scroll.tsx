import Lenis from "lenis";
import { useEffect } from "react";

export default function SmoothScroll({
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const {} = props;

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);
  return null;
}
