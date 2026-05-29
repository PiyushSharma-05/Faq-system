import QueryCard from "./QueryCard";

function CategoryCard({ category }) {

  // SAFETY CHECK
  if (!category) return null;

  return (

    <div className="category-card">

      {/* HEADER */}
      {category.categoryTitle && (

        <div className="category-header">

          <h3>
            {category.categoryTitle}
          </h3>

          <span className="faq-count-badge">
            {category.faqs?.length || 0}
          </span>

        </div>

      )}

      {/* SUBTITLE */}
      {category.subTitle && (

        <div className="category-subtitle">

          {category.subTitle}

        </div>

      )}

      {/* FAQ LIST */}
      <div className="category-body">

        {category.faqs &&
          category.faqs.map((faqItem, index) => (

            <div
              key={faqItem.id || index}
              id={`faq-${faqItem.id}`}
              className="faq-scroll-target"
            >

              <QueryCard
                faq={faqItem}
                index={index}
              />

            </div>

          ))}

      </div>

    </div>
  );
}

export default CategoryCard;