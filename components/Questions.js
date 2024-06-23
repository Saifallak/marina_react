import { Accordion } from "@mantine/core";
import styles from "@/styles/question.module.scss";
import React from "react";
const groceries = [
  {
    value: "Apples",
    description:
      "Crisp and refreshing fruit. Apples are known for their versatility and nutritional benefits. They come in a variety of flavors and are great for snacking, baking, or adding to salads.",
  },
  {
    value: "Bananas",
    description:
      "Naturally sweet and potassium-rich fruit. Bananas are a popular choice for their energy-boosting properties and can be enjoyed as a quick snack, added to smoothies, or used in baking.",
  },
  {
    value: "Broccoli",
    description:
      "Nutrient-packed green vegetable. Broccoli is packed with vitamins, minerals, and fiber. It has a distinct flavor and can be enjoyed steamed, roasted, or added to stir-fries.",
  },
];

function Questions() {
  const items = groceries.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control>{item.value}</Accordion.Control>
      <Accordion.Panel>{item.description}</Accordion.Panel>
    </Accordion.Item>
  ));
  return (
    <section className={styles.questions}>
    <div  className={`container questionsDiv mx-auto max-w-[2000px]  md:mt-[170px] mt-[90px]`}  >

      <h2 className="text-2xl sm:text-5xl font-extrabold mb-6">Faq

</h2>
      <Accordion className={styles.Accordion5} defaultValue="Apples">{items}</Accordion>
  
    </div>
  </section>
  );
}

export default Questions;
