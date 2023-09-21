"use client";

import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Color, Size } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useState, useEffect } from "react";

export default function Filters({
  data,
  name,
  valueKey,
}: {
  data: Array<Color | Size>;
  name: string;
  valueKey: string;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [checked, setChecked] = useState(new Map<string, boolean>());
  const [toggle, setToggle] = useState(true);

  //Checking the params after a refresh
  useEffect(() => {
    const currentParams = qs.parse(searchParams.toString());

    if (currentParams[valueKey]) {
      const param = currentParams[valueKey] as string;
      param.split(" ").forEach((item) => {
        setChecked((prevChecked) => new Map(prevChecked.set(item, true)));
      });
    }
  }, []);

  useEffect(() => {
    let newParams = "";

    checked.forEach((value, key) => {
      if (value) newParams += key + " ";
    });

    const currentParams = qs.parse(searchParams.toString());

    if (newParams.length > 0 || currentParams[valueKey]) {
      const query = {
        ...currentParams,
        [valueKey]: newParams,
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
  }, [checked, router, searchParams, valueKey]);

  return (
    <section className=" py-5 border-b-2 border-black">
      <section
        className="flex flex-row justify-between items-center text-2xl cursor-pointer"
        onClick={() => setToggle((prevToggle) => !prevToggle)}
      >
        <h3>{name}</h3>
        <FontAwesomeIcon icon={toggle ? faCaretUp : faCaretDown} />
      </section>
      {!toggle &&
        data.map((item) => (
          <fieldset key={item.id} className="py-1 text-xl">
            <input
              type="checkbox"
              defaultChecked={checked.get(item.name)}
              name={item.name}
              id={name + item.id}
              onChange={(e) =>
                setChecked(
                  (prevChecked) =>
                    new Map(prevChecked.set(e.target.name, e.target.checked))
                )
              }
            />
            <label htmlFor={name + item.id} className="ml-2">
              {item.name}
            </label>
          </fieldset>
        ))}
    </section>
  );
}
