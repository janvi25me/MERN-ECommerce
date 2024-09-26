import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RelatedProduct from "./RelatedProduct";

const ProductDetail = () => {
  const [product, setProduct] = useState();

  const { id } = useParams();

  const url = "http://localhost:1000/api";

  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/${id}`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
      // console.log(api.data.product);
      setProduct(api.data.product);
    };
    fetchProduct();
  }, [id]);

  return (
    <>
      <div
        className="container text-center"
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div className="left my-5">
          <img
            src={product?.imgSrc}
            style={{
              height: "200px",
              width: "200px",
              border: "2px solid yellow",
              borderRadius: "10px",
            }}
          />
        </div>
        <div className="right">
          <h1>{product?.title}</h1>
          <p>{product?.description}</p>
          <h1>
            {product?.price} {"₹"}
          </h1>
        

        <div className="my-5">
          <button className="btn btn-danger mx-3 " style={{fontWeight:'bold'}}>Buy Now</button>
          <button className="btn btn-warning" style={{fontWeight:'bold'}}>Add To Cart</button>
        </div>

        </div>
      </div>

      <RelatedProduct category={product?.category} />
    </>
  );
};

export default ProductDetail;
