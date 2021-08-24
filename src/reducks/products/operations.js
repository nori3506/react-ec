import { push } from "connected-react-router";
import { db, FirebaseTimestamp } from "../../firebase";
import { deleteProductAction, fetchProductsAction } from "./actions";

const productRef = db.collection("products");

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    productRef
      .doc(id)
      .delete()
      .then(() => {
        const prevProducts = getState().products.list;
        const nextProducts = prevProducts.filter(
          (product) => product.id !== id
        );
        dispatch(deleteProductAction(nextProducts));
      });
  };
};

export const fetchProducts = (gender, category) => {
  return async (dispatch) => {
    let query = productRef.orderBy("updated_at", "desc");
    query = gender !== "" ? query.where("gender", "==", gender) : query;
    query = category !== "" ? query.where("category", "==", category) : query;
    query.get().then((snapshots) => {
      const productList = [];
      snapshots.forEach((snapshot) => {
        const product = snapshot.data();
        productList.push(product);
      });
      dispatch(fetchProductsAction(productList));
    });
  };
};

export const orderProduct = (productsInCart, amount) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const userRef = db.collection("users").doc(uid);
    const timestamp = FirebaseTimestamp.now();

    let products = [];
    let soldOutProducts = [];
    const batch = db.batch();

    for (const product of productsInCart) {
      const snapshot = await productRef.doc(product.productId).get();
      const sizes = snapshot.data().sizes;

      const updatedSizes = sizes.map((size) => {
        if (size.size === product.size) {
          if (size.amount === 0) {
            soldOutProducts.push(product.name);
            return size;
          }
          return {
            size: size.size,
            amount: size.amount - 1,
          };
        } else {
          return size;
        }
      });

      products.push({
        id: product.productId,
        images: product.images,
        name: product.name,
        price: product.price,
        size: product.size,
      });

      batch.update(productRef.doc(product.productId), { sizes: updatedSizes });
      batch.delete(userRef.collection("cart").doc(product.cartId));
    }
    if (soldOutProducts.length > 0) {
      const errorMessage =
        soldOutProducts.length > 1
          ? soldOutProducts.join(" and ")
          : soldOutProducts[0];
      alert("Sorry," + errorMessage + "is not available now");
      return false;
    } else {
      batch
        .commit()
        .then(() => {
          const orderRef = userRef.collection("orders").doc();
          const date = timestamp.toDate();
          const shippingDate = FirebaseTimestamp.fromDate(
            new Date(date.setDate(date.getDate() + 3))
          );
          const history = {
            amount: amount,
            created_at: timestamp,
            id: orderRef.id,
            products: products,
            shipping_date: shippingDate,
            updated_at: timestamp,
          };

          orderRef.set(history);
          dispatch(push("/order/complete"));
        })
        .catch(() => {
          alert("Sorry, your order was not successfully done.");
          return false;
        });
    }
  };
};

export const saveProduct = (
  id,
  name,
  description,
  category,
  gender,
  price,
  images,
  sizes
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
      sizes: sizes,
      updated_at: timestamp,
    };

    if (id === "") {
      const ref = productRef.doc();
      id = ref.id;
      data.id = id;
      data.created_at = timestamp;
    }

    return productRef
      .doc(id)
      .set(data, { merge: true })
      .then(() => {
        dispatch(push("/"));
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};
