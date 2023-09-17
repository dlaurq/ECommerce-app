"use client";

import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Color, Size } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useState, useEffect } from "react";

type BooleanObject = {
  [key: string]: boolean;
};

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

  const [checked, setChecked] = useState<BooleanObject>({});
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    const currentParams = qs.parse(searchParams.toString());

    if (currentParams[valueKey]) {
      const param = currentParams[valueKey] as string;
      param.split(" ").forEach((item) => {
        setChecked((prevChecked) => ({ ...prevChecked, [item]: true }));
      });
    }
  }, []);

  useEffect(() => {
    let x = "";

    Object.entries(checked).forEach((entry) => {
      const [key, value] = entry;
      if (value)
        if (!x) x = key;
        else x = x + " " + key;
    });

    const current = qs.parse(searchParams.toString());

    const query = {
      ...current,
      [valueKey]: x,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url);
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
              defaultChecked={checked[item.name]}
              name={item.name}
              id={name + item.id}
              onChange={(e) =>
                setChecked((prevChecked) => ({
                  ...prevChecked,
                  [e.target.name]: e.target.checked,
                }))
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
