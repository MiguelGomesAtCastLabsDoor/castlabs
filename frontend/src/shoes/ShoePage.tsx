import React, { useEffect, useState } from 'react';
import { shoeAPI } from './shoeAPI';
import ShoeDetail from './ShoeDetail';
import { Shoe } from './Shoe';
import { useParams } from 'react-router-dom';

function ShoePage(props: any) {
  const [loading, setLoading] = useState(false);
  const [shoe, setShoe] = useState<Shoe | null>(null);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const id = Number(params.id);

  useEffect(() => {
    setLoading(true);
    shoeAPI
      .find(id)
      .then((data) => {
        setShoe(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      <>
        <h1>Shoe Detail</h1>

        {loading && (
          <div className="center-page">
            <span className="spinner primary"></span>
            <p>Loading...</p>
          </div>
        )}

        {error && (
          <div className="row">
            <div className="card large error">
              <section>
                <p>
                  <span className="icon-alert inverse "></span> {error}
                </p>
              </section>
            </div>
          </div>
        )}

        {shoe && <ShoeDetail shoe={shoe} />}
      </>
    </div>
  );
}

export default ShoePage;