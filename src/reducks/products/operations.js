import { push } from "connected-react-router";
import { db, FirebaseTimestamp } from "../../firebase";

const productRef = db.collection("products");

export const saveProduct = (
  name,
  description,
  category,
  gender,
  price,
  images
) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();
    const data = {
      category: category,
      description: description,
      gender: gender,
      images: images,
      name: name,
      price: parseInt(price, 10),
      updated_at: timestamp,
    };

    const ref = productRef.doc();
    const id = ref.id;
    data.id = id;
    data.created_at = timestamp;

    return productRef
      .doc(id)
      .set(data)
      .then(() => {
        dispatch(push("/"));
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};
