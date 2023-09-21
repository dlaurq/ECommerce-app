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
  const [width, setWidth] = useState(0);
  const [toggle, setToggle] = useState(width < 768 ? true : false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) setWidth(innerWidth);

    const updateWindowDimensions = () => {
      if (isClient) setWidth(innerWidth);
    };

    window.addEventListener("resize", updateWindowDimensions);

    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, [isClient]);

  useEffect(() => {
    setToggle(width < 768 ? true : false);
  }, [width]);

  return (
    <section className="p-5 border-r-2 md:border-gray-300">
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
