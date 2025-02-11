import Pagination from "./components/Pagination";

export default function Home({ searchParams: { page } }) {
  return <Pagination itemCount={100} pageSize={10} currentPage={page} />;
}
