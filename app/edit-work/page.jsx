"use client";

import React, { useState } from "react";
import Form from "@components/Form";
import Navbar from "@components/Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const EditWork = () => {
  const { data: session } = useSession();

  const router = useRouter();

  const [work, setWork] = useState({
    creator: "",
    category: "",
    title: "",
    description: "",
    price: "",
    photos: [],
  });

  return (
    <>
      <Navbar />
      <Form type="Edit" work={work} setWork={setWork} />
    </>
  );
};

export default EditWork;
