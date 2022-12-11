import React, { Fragment, useState,useEffect } from 'react';
import { shoeAPI } from './shoeAPI';
import { MOCK_SHOES } from "./MockShoes";
import ShoeList from "./ShoeList";
import { Shoe } from './Shoe';

function ShoesPage() {
    const [shoes, setShoes] = useState<Shoe[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState(1);
    const handleMoreClick = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };
    useEffect(() => {
    async function loadShoes() {
      setLoading(true);
      try {
        const data = await shoeAPI.get(currentPage);
        setError('');
        if (currentPage === 1) {
          setShoes(data);
        } else {
          setShoes((shoes) => [...shoes, ...data]);
        }
      }
       catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
        } finally {
        setLoading(false);
      }
    }
    loadShoes();
  }, [currentPage]);

    const saveShoe = (shoe: Shoe) => {
     shoeAPI
     .put(shoe)
     .then((updatedShoe) => {
       let updatedShoes = shoes.map((p: Shoe) => {
         return p.id === shoe.id ? new Shoe(updatedShoe) : p;
       });
       setShoes(updatedShoes);
     })
     .catch((e) => {
        if (e instanceof Error) {
         setError(e.message);
       }
    });
  };
  return (
    <>
      <h1>Shoes</h1>
           {error && (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse "></span>
                {error}
              </p>
            </section>
          </div>
        </div>
      )}
        <ShoeList onSave={saveShoe} shoes={shoes} />
        {!loading && !error }
        {loading && (
        <div className="center-page">
            <span className="spinner primary"></span>
          <p>Loading...</p>
        </div>
      )}
    </>
  );
}

export default ShoesPage;
