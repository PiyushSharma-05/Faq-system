import QueryCard from "./QueryCard";

function CategoryCard({ category }) {
  return (
    <div className="category-card">

      <div className="category-header">
        {category.category}
      </div>

      <div className="category-body">

        {category.faqs.map((faq, index) => (
          <QueryCard
            key={index}
            faq={faq}
            index={index}
          />
        ))}

      </div>

    </div>
  );
}

export default CategoryCard;