export default function LoadingSpinner() {
  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center h-20">
      <div className="animate-spin rounded-full w-10 h-10 lg:w-12 lg:h-12 border-y-2 border-site-main"></div>
    </div>
  );
}
