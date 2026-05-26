function FAQTable() {

  const pendingFaqs = [
    {
      id: 1,
      question: "Login issue",
      category: "Tech Support",
      status: "Pending"
    },
    {
      id: 2,
      question: "SP points query",
      category: "Internship",
      status: "Pending"
    }
  ];

  return (
    <div className="table-wrapper">

      <table className="faq-table">

        <thead>
          <tr>
            <th>Question</th>
            <th>Category</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {pendingFaqs.map((faq) => (
            <tr key={faq.id}>
              <td>{faq.question}</td>
              <td>{faq.category}</td>
              <td>{faq.status}</td>

              <td>
                <button className="approve-btn">
                  Approve
                </button>

                <button className="reject-btn">
                  Reject
                </button>
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default FAQTable;