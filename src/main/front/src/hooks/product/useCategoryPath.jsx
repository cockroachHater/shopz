import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function useCategoryPath() {
  const { pathname } = useLocation();
  const cate = pathname.substring(10);
  const [category, setCategory] = useState(cate);

  useEffect(() => {
    setCategory(pathname.substring(10));
  }, [pathname]);

  return [category];
}
