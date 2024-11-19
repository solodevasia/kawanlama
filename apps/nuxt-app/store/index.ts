import { defineStore } from "pinia";
import { ref } from "vue";
import moment from "moment";

interface Product {
  id: string;
  title: string;
  description: string;
  created_at: number;
}

export const userProductStore = defineStore("products", () => {
  const products = ref<Product[]>([]);

  function initialProduct(values: Product[]) {
    products.value = values.map((item) => {
      let initialActiveNumber = "0000".split("");
      const lengthId = `${item.id}`.length;
      initialActiveNumber = initialActiveNumber.filter(
        (item, index) => index >= lengthId
      );
      return { ...item, id: `AC-${initialActiveNumber.join("")}${item.id}` };
    });
  }

  function generateActivityNumber(find?: Product) {
    let initialActiveNumber = `AC-0000` as string | number | undefined;

    initialActiveNumber = find?.id?.split("-")[1];
    initialActiveNumber = Number(initialActiveNumber) + 1;
    initialActiveNumber = `${initialActiveNumber}`.split("").join("");
    if (initialActiveNumber.length === 1) {
      initialActiveNumber = `000${initialActiveNumber}`;
    } else if (initialActiveNumber.length === 2) {
      initialActiveNumber = `00${initialActiveNumber}`;
    } else if (initialActiveNumber.length === 3) {
      initialActiveNumber = `0${initialActiveNumber}`;
    }
    initialActiveNumber = `AC-${initialActiveNumber}`;
    return initialActiveNumber;
  }

  function addProduct(product: Product) {
    const find = products.value.find(
      (item, index) => index === products.value.length - 1
    );
    if (find) {
    }
    products.value = products.value.concat({
      ...product,
      id: generateActivityNumber(find),
      created_at: new Date().getTime(),
    });
  }

  function removeProduct(id: string) {
    products.value = products.value.filter((item) => item.id !== id);
  }
  return { products, initialProduct, addProduct, removeProduct };
});
