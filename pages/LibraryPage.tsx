import React, { useState, useMemo, useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { apiFetch } from '../lib/api';
import type { Book, BorrowRecord } from '../types';
import { Search, Filter, Library, BookOpen, BookMarked, Loader2 } from 'lucide-react';

type Tab = 'books' | 'borrows';

const LibraryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('books');
  const [books, setBooks] = useState<Book[]>([]);
  const [borrowRecords, setBorrowRecords] = useState<BorrowRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [borrowFilter, setBorrowFilter] = useState('All');

  useEffect(() => {
    Promise.all([
      apiFetch<{ data: { books: Book[] } }>('/library/books'),
      apiFetch<{ data: { borrowRecords: BorrowRecord[] } }>('/library/borrows'),
    ])
      .then(([booksRes, borrowsRes]) => {
        setBooks(booksRes.data.books);
        setBorrowRecords(borrowsRes.data.borrowRecords);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const totalBooks = books.reduce((s, b) => s + b.copies, 0);
  const availableBooks = books.reduce((s, b) => s + b.available, 0);
  const overdueCount = borrowRecords.filter(r => r.status === 'Overdue').length;

  const categories = ['All', ...Array.from(new Set(books.map(b => b.category))).sort()];

  const filteredBooks = useMemo(() =>
    books
      .filter(b =>
        b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.author.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(b => categoryFilter === 'All' || b.category === categoryFilter),
    [books, searchTerm, categoryFilter]
  );

  const filteredBorrows = useMemo(() =>
    borrowRecords
      .filter(r =>
        r.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.studentName.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(r => borrowFilter === 'All' || r.status === borrowFilter),
    [borrowRecords, searchTerm, borrowFilter]
  );

  const BorrowBadge: React.FC<{ status: 'Borrowed' | 'Returned' | 'Overdue' }> = ({ status }) => {
    const styles = {
      Borrowed: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      Returned: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      Overdue: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    };
    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${styles[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Library Management</h1>
        <Button>
          <BookOpen className="h-4 w-4 mr-2" />
          {activeTab === 'books' ? 'Add Book' : 'Issue Book'}
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="flex items-center">
          <div className="p-3 rounded-full bg-blue-500 mr-4">
            <Library className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-dark-text-secondary">Total Books</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{totalBooks}</p>
          </div>
        </Card>
        <Card className="flex items-center">
          <div className="p-3 rounded-full bg-green-500 mr-4">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-dark-text-secondary">Available</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{availableBooks}</p>
          </div>
        </Card>
        <Card className="flex items-center">
          <div className="p-3 rounded-full bg-red-500 mr-4">
            <BookMarked className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-dark-text-secondary">Overdue</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{overdueCount}</p>
          </div>
        </Card>
      </div>

      <Card>
        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-dark-border mb-4">
          <button
            onClick={() => { setActiveTab('books'); setSearchTerm(''); }}
            className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === 'books'
                ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-dark-text-secondary'
            }`}
          >
            Book Catalog
          </button>
          <button
            onClick={() => { setActiveTab('borrows'); setSearchTerm(''); }}
            className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors ml-4 ${
              activeTab === 'borrows'
                ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-dark-text-secondary'
            }`}
          >
            Borrow Records
          </button>
        </div>

        {/* Search + filter */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
          <div className="relative w-full sm:w-72">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="text"
              placeholder={activeTab === 'books' ? 'Search title or author...' : 'Search book or student...'}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-500" />
            {activeTab === 'books' ? (
              <select
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                className="py-2 px-3 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            ) : (
              <select
                value={borrowFilter}
                onChange={e => setBorrowFilter(e.target.value)}
                className="py-2 px-3 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="All">All</option>
                <option value="Borrowed">Borrowed</option>
                <option value="Returned">Returned</option>
                <option value="Overdue">Overdue</option>
              </select>
            )}
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12 text-gray-500 dark:text-dark-text-secondary">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            Loading library data…
          </div>
        )}
        {error && (
          <div className="text-center py-8 text-red-500">
            Failed to load library data: {error}
          </div>
        )}

        {/* Books table */}
        {!loading && !error && activeTab === 'books' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-dark-border">
                <tr>
                  <th className="p-4 text-sm font-semibold text-gray-600 dark:text-dark-text-secondary">Title</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 dark:text-dark-text-secondary hidden md:table-cell">Author</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 dark:text-dark-text-secondary hidden sm:table-cell">Category</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 dark:text-dark-text-secondary hidden lg:table-cell">Copies</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 dark:text-dark-text-secondary">Available</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map(book => (
                  <tr key={book.id} className="border-b border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="p-4 font-semibold text-gray-800 dark:text-white">{book.title}</td>
                    <td className="p-4 hidden md:table-cell text-gray-700 dark:text-dark-text">{book.author}</td>
                    <td className="p-4 hidden sm:table-cell">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200">
                        {book.category}
                      </span>
                    </td>
                    <td className="p-4 hidden lg:table-cell text-gray-700 dark:text-dark-text">{book.copies}</td>
                    <td className="p-4">
                      <span className={`font-semibold ${book.available > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}>
                        {book.available}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Button variant="secondary" className="text-xs">Issue</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredBooks.length === 0 && (
              <p className="text-center py-8 text-gray-500 dark:text-dark-text-secondary">No books found.</p>
            )}
          </div>
        )}

        {/* Borrow records table */}
        {!loading && !error && activeTab === 'borrows' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-dark-border">
                <tr>
                  <th className="p-4 text-sm font-semibold text-gray-600 dark:text-dark-text-secondary">Book</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 dark:text-dark-text-secondary">Student</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 dark:text-dark-text-secondary hidden sm:table-cell">Issue Date</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 dark:text-dark-text-secondary hidden md:table-cell">Due Date</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 dark:text-dark-text-secondary hidden lg:table-cell">Return Date</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 dark:text-dark-text-secondary">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredBorrows.map(record => (
                  <tr key={record.id} className="border-b border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="p-4 font-semibold text-gray-800 dark:text-white">{record.bookTitle}</td>
                    <td className="p-4 text-gray-700 dark:text-dark-text">{record.studentName}</td>
                    <td className="p-4 hidden sm:table-cell text-gray-700 dark:text-dark-text">{record.issueDate}</td>
                    <td className="p-4 hidden md:table-cell text-gray-700 dark:text-dark-text">{record.dueDate}</td>
                    <td className="p-4 hidden lg:table-cell text-gray-500 dark:text-dark-text-secondary">{record.returnDate ?? '—'}</td>
                    <td className="p-4"><BorrowBadge status={record.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredBorrows.length === 0 && (
              <p className="text-center py-8 text-gray-500 dark:text-dark-text-secondary">No borrow records found.</p>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default LibraryPage;

