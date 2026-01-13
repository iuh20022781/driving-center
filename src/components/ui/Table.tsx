import { ReactNode } from 'react';

type TableProps = {
  headers: string[];
  children: ReactNode;
};

export default function Table({ headers, children }: TableProps) {
  return (
    <div className="overflow-x-auto rounded border border-gray-200">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                className="px-4 py-2 font-medium text-gray-700"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y">{children}</tbody>
      </table>
    </div>
  );
}
