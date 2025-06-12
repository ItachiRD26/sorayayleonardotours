// components/ui/loader.tsx
export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
        <p className="text-gray-600 text-sm">Cargando...</p>
      </div>
    </div>
  );
}
