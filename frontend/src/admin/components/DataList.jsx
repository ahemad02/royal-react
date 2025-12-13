const DataList = ({ title, data }) => (
  <div className="bg-white border rounded p-6">
    <h3 className="font-semibold mb-4">{title}</h3>
    <ul className="space-y-2">
      {data.map((item, i) => (
        <li
          key={i}
          className="flex justify-between border-b pb-1 text-sm"
        >
          <span>{item.name}</span>
          <span className="font-semibold">{item.count}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default DataList;
