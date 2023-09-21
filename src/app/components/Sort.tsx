"use client";

import { useEffect, useState } from "react";
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";

export default function Sort() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [order, setOrder] = useState("");

  useEffect(() => {
    const currentParams = qs.parse(searchParams.toString());

    if (currentParams["orderBy"]) {
      const param = currentParams["orderBy"] as string;
      setOrder(param);
    }
  }, []);

  useEffect(() => {
    const currentParams = qs.parse(searchParams.toString());
    if (order.length > 0 || currentParams["orderBy"]) {
      const query = {
        ...currentParams,
        ["orderBy"]: order,
      };

      const url = qs.stringifyUrl(
        {
          url: window.location.href,
          query,
        },
        { skipNull: true }
      );

      router.push(url);
    }
  }, [order, router, searchParams]);

  return (
    <section className="w-full text-xl border-b-2 border-black md:col-span-1">
      <select
        className="text-xl w-full border-0 p-0 py-2 text-left "
        name=""
        id=""
        onChange={(e) => setOrder(e.target.value)}
        value={order}
      >
        <option value="">Order By</option>
        <option value="PrLH">Price L to H</option>
        <option value="PrHL">Price H to L</option>
      </select>
    </section>
  );
}
