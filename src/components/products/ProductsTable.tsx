import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import Tile from '~/core/ui/Tile';

interface Ebook {
  id: number;
  title: string;
  description: string;
  niche: string;
  type: string;
}

interface ProductsTableProps {
  ebooks: Ebook[];
}

export function ProductsTable({ ebooks }: ProductsTableProps) {
  return (
    <table className={'Table'}>
      <thead>
        <tr>
          <th style={{ width: '25%' }}>Title</th>
          <th>Niche</th>
          <th>Potential Profit</th>
          <th>Created at</th>
          <th>Status</th>
          <th style={{ width: '15%' }}>Actions</th>
        </tr>
      </thead>

      <tbody>
        {ebooks.map((ebook: Ebook) => (
          <tr key={ebook.id}>
            <td className="text-bold">{ebook.title}</td>
            <td>Investing</td>
            <td>$100.2</td>
            <td>
              {new Date('2023-02-25 19:47:32').toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </td>

            <td>
              <Tile.Badge trend={'up'}>Running</Tile.Badge>
            </td>
            <td>
              <button
                className="mr-4 text-gray-500 hover:text-gray-600 focus:outline-none"
                aria-label="View"
                title="View"
              >
                <FontAwesomeIcon icon={faEye} />
              </button>
              <button
                className="text-indigo-500 hover:text-indigo-600 focus:outline-none"
                aria-label="Edit"
                title="Edit"
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
