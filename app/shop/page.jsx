"use client";

import Loader from "@components/Loader";
import Navbar from "@components/Navbar";
import WorkList from "@components/WorkList";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import "@styles/Shop.scss";

const Shop = () => {
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();
  const loggedInUserId = session?.user?._id;

  const searchParams = useSearchParams();
  const profileId = searchParams.get("id");

  const [workList, setWorkList] = useState([]);
  const [profile, setProfile] = useState({});

  const getWorkList = async () => {
    const response = await fetch(`api/user/${profileId}/shop`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setWorkList(data.workList);
    setProfile(data.user);
    setLoading(false);
  };

  useEffect(() => {
    if (profileId) {
      getWorkList();
    }
  }, [profileId]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />

      {loggedInUserId === profileId && (
        <h1 className="title-list">Your Works</h1>
      )}

      {loggedInUserId !== profileId && (
        <h1 className="title-list">{profile.username}'s Works</h1>
      )}

      {workList.length == 0 ? (
        <h2 className="noDatashow">No Data to show !</h2>
      ) : (
        <WorkList data={workList} />
      )}
    </>
  );
};

export default Shop;
