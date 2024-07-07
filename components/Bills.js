"use client";
import React, { useEffect, useState } from "react";
import { getServices } from "./useApi/dataApi";

function bills() {
  const [Services, setServices] = useState([]);

  useEffect(() => {
    FetchDataServices();
  }, []);

  const FetchDataServices = async () => {

    const Services = await getServices();
    if (!Services) console.log(Services?.message);
    setServices(Services);
    console.log(Services);
    console.log('Services');
  };

  return <div>bills</div>;
}

export default bills;
