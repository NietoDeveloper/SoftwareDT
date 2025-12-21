import { useEffect, useState } from "react";

const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!url || url.includes("undefined")) return;
      setLoading(true);
      try {
        const res = await fetch(url);
        const result = await res.json();

        if (!res.ok) throw new Error(result.message || "Error al conectar");

        // Tu API devuelve { success: true, data: {...} }
        setData(result.data || result);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetchData;