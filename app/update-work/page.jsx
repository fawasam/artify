"use client";
import Navbar from "@components/Navbar";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "@components/Loader";
import Form from "@components/Form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

const UpdateWork = () => {
  const { data: session } = useSession();

  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const workId = searchParams.get("id");

  const [work, setWork] = useState({
    category: "",
    title: "",
    description: "",
    price: "",
    photos: [],
  });

  const getWorkDetails = async () => {
    const response = await fetch(`api/work/${workId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    setWork({
      category: data.category,
      title: data.title,
      description: data.description,
      price: data.price,
      photos: data.workPhotoPaths,
    });

    setLoading(false);
  };

  useEffect(() => {
    if (workId) {
      getWorkDetails();
    }
  }, [workId]);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    var loadingToast = toast.loading("Updating....");
    try {
      const updateFormWork = new FormData();

      for (var key in work) {
        updateFormWork.append(key, work[key]);
      }

      work.photos.forEach((photo) => {
        updateFormWork.append("workPhotoPaths", photo);
      });

      const response = await fetch(`/api/work/${workId}`, {
        method: "PATCH",
        body: updateFormWork,
      });

      if (response.ok) {
        toast.success("Successfully Updated!");
        router.push(`/shop?id=${session?.user?._id}`);
      }
      toast.remove(loadingToast);
    } catch (err) {
      console.log("Publish Work failed", err.message);
      toast.error("Publish Work failed", err.message);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <Form
        type="Edit"
        work={work}
        setWork={setWork}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default UpdateWork;
