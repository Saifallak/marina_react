import { navState } from "@/atoms";
import { Burger } from "@mantine/core";
import React from "react";
import { useRecoilState } from "recoil";

const Hamburger = () => {
  const [opened, setOpened] = useRecoilState(navState);
  const title = opened ? "Close navigation" : "Open navigation";
  return (
    <Burger
      style={{ position: "relative", zIndex: "2" }}
      size={"md"}
      color="#fff"
      opened={opened}
      onClick={() => setOpened((o) => !o)}
      title={title}
    />
  );
};

export default Hamburger;
