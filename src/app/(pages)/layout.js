"use client";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useFetch from '../../customHooks/useFetch';
import { setPhotographers, setLoading, setError } from '../../redux/slice/photographerSlice';
import Header from '../../components/Header';

export default function PagesLayout({ children }) {
  const dispatch = useDispatch();
  const { data, loading, error } = useFetch('http://localhost:3002/photographers');

  useEffect(() => {
    if (data) {
      console.log('Fetched photographer data:', data);
      console.log('First photographer in fetched data:', data[0]);
      console.log('Photographer IDs in fetched data:', data.map(p => p.id));
      dispatch(setPhotographers(data));
    }
    dispatch(setLoading(loading));
    if (error) {
      console.error('Error fetching photographers:', error);
      dispatch(setError(error));
    }
  }, [data, loading, error, dispatch]);
    
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gray-50 mt-14">
        {children}
      </main>
    </div>
  );
}
