"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useFetch from "../../customHooks/useFetch";
import {
  setPhotographers,
  setLoading,
  setError,
} from "../../redux/slice/photographerSlice";
import Header from "../../components/Header";

export default function PagesLayout({ children }) {
  const dispatch = useDispatch();
  const { data, loading, error } = useFetch(
    "https://moccasin-petra-75.tiiny.site/db.json"
  );

  useEffect(() => {
    if (data) {
      dispatch(setPhotographers(data.photographers));
    }
    dispatch(setLoading(loading));
    if (error) {
      console.error("Error fetching photographers:", error);
      dispatch(setError(error));
    }
  }, [data, loading, error, dispatch]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50 mt-14">{children}</main>
    </div>
  );
}
