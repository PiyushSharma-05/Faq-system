import QueryCard from "./QueryCard";

function CategoryCard({ category }) {
  // Guard clause to prevent crashes if category data is missing
  if (!category) return null;

  return (
    <div className="category-card">
      {/* Category Header (e.g., Onboarding & Admin) */}
      {category.categoryTitle && (
        <div className="category-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>{category.categoryTitle}</h3>
          <span className="faq-count-badge" style={{ backgroundColor: '#3b82f6', color: '#fff', fontSize: '12px', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' }}>
            {category.faqs?.length || 0}
          </span>
        </div>
      )}

      {/* Sub-topic section heading (e.g., 1. About the internship) */}
      {category.subTitle && (
        <div className="category-subtitle" style={{ fontWeight: "bold", padding: "8px 12px" }}>
          {category.subTitle}
        </div>
      )}

      {/* Category Body mapping over all filtered FAQs matching this section */}
      <div className="category-body">
        {category.faqs && category.faqs.map((faqItem, index) => (
          <QueryCard
            key={faqItem.id || index}
            faq={faqItem}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoryCard;