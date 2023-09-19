"use client";

import { useEffect, useState } from "react";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Colaps({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  useEffect(() => {
    const updateWindowDimensions = () => {
      setToggle(window.innerWidth < 768 ? true : false);
    };

    window.addEventListener("resize", updateWindowDimensions);

    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  const [toggle, setToggle] = useState(window.innerWidth < 768 ? true : false);

  return (
    <section className="p-5 md:min-w-[15rem] border-r-2 md:border-gray-300">
      <section
        className="flex flex-row justify-between items-center text-2xl cursor-pointer"
        onClick={() => setToggle(!toggle)}
      >
        <h4>{title}</h4>
        <FontAwesomeIcon icon={toggle ? faCaretUp : faCaretDown} />
      </section>
      {!toggle && children}

      {toggle && <hr className="border-b-2 border-black mt-5" />}
    </section>
  );
}
