import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useEffect } from "react";

const ViewAllProducts = () => {
  const [singleProd, setSingleProd] = React.useState();
  const [loading, setLoading] = React.useState(true);

  let { id } = useParams();
  const { product } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    const sss = product.find((x) => x._id === id);
    setSingleProd(sss);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {singleProd && (
        <div>
          <h2>{singleProd.prodTitle}</h2>
          <img src={`http://localhost:5000/${singleProd?.prodImg1}`} alt="" />
          <p>{singleProd.prodDesc}</p>
          {/* Display other product details */}
        </div>
      )}
    </div>
  );
};

export default ViewAllProducts;
