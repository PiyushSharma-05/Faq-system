import Fuse from "fuse.js";

export const createFuse = (
  structuredCategories
) => {

  const allFaqs =
    structuredCategories.flatMap((cat) =>

      cat.faqs.map((faq) => ({

        id: faq.id,

        question:
          faq.question || "",

        answer:
          faq.answer || "",

        categoryTitle:
          cat.categoryTitle || "",

        subTitle:
          cat.subTitle || "",

      }))
    );

  return new Fuse(allFaqs, {

    keys: [
      "question",
      "answer",
      "categoryTitle",
      "subTitle",
    ],

    threshold: 0.4,

    includeScore: true,

  });
};