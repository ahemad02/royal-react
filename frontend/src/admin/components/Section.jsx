const Section = ({ title, children }) => (
  <div className="bg-white border rounded p-6">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    {children}
  </div>
);

export default Section;
