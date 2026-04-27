import { useEffect } from "react";

export default function useTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
}
