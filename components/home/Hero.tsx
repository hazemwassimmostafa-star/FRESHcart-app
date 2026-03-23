export default function Hero() {
  return (
    <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="overflow-hidden rounded-2xl md:col-span-2">
        <img
          src="https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1200&q=80"
          alt="Main banner"
          className="h-64 w-full object-cover md:h-80"
        />
      </div>

      <div className="flex flex-col gap-4">
        <img
          src="https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80"
          alt="Side banner 1"
          className="h-32 w-full rounded-2xl object-cover md:h-[152px]"
        />

        <img
          src="https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80"
          alt="Side banner 2"
          className="h-32 w-full rounded-2xl object-cover md:h-[152px]"
        />
      </div>
    </div>
  );
}