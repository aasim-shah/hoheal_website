export default function Loading({ message }: { message?: string | boolean }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-primary/80">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-t-4 border-signature border-dashed rounded-full animate-spin" />
        {message && (
          <p className="text-primary">
            {typeof message === "string" ? message : "Loading..."}
          </p>
        )}
      </div>
    </div>
  );
}
