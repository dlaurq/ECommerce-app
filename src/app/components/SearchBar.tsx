"use client";

import { useEffect, useState } from "react";
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState("");

  useEffect(() => {
    const currentParams = qs.parse(searchParams.toString());

    if (currentParams["search"]) {
      const param = currentParams["search"] as string;
      setSearch(param);
    }
  }, []);

  useEffect(() => {
    const currentParams = qs.parse(searchParams.toString());
    console.log(search.length);
    if (search.length > 2 || currentParams["search"]) {
      const query = {
        ...currentParams,
        ["search"]: search.length > 2 ? search : "",
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
  }, [search, router, searchParams]);

  return (
    <section className="w-full text-xl border-b-2 border-black md:col-span-4">
      <input
        className="w-full border-0 text-left px-0 pr-5 text-xl placeholder:text-black"
        placeholder="search..."
        value={search}
        type="text"
        onChange={(e) => setSearch(e.target.value)}
      />
    </section>
  );
}
