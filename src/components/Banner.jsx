import Link from "next/link";

export default function Banner() {
  return (
    <section className="max-w-7xl mx-auto px-4 my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Main Banner */}
        <div className="relative h-[40vh] md:h-[50vh] overflow-hidden rounded-2xl group cursor-pointer">
          <img
            loading="lazy"
            decoding="async"
            src="/images/SS Wesst Luxury Kaftan.jpg"
            alt="Collection"
            className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <p className="text-xs uppercase tracking-widest text-neutral-300">New Drop</p>
            <h3 className="text-2xl md:text-3xl font-bold mt-1">Premium Collection</h3>
            <Link href="/new-arrivals" className="inline-block mt-3 text-sm font-semibold underline underline-offset-4 hover:text-neutral-300 transition">
              Shop Now
            </Link>
          </div>
        </div>

        {/* Side Banners */}
        <div className="grid grid-rows-2 gap-4">
          <div className="relative h-[19vh] md:h-[24vh] overflow-hidden rounded-2xl group cursor-pointer">
            <img
              loading="lazy"
              decoding="async"
              src="/images/banner2.png"
              alt="Summer"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-5 text-white">
              <h4 className="font-bold text-lg">Summer Edit</h4>
              <Link href="/sale" className="text-xs underline underline-offset-4 hover:text-neutral-300 transition">Explore</Link>
            </div>
          </div>

          <div className="relative h-[19vh] md:h-[24vh] overflow-hidden rounded-2xl group cursor-pointer">
            <img
              loading="lazy"
              decoding="async"
              src="/images/Luxury Net Couture Dress.jpg"
              alt="Accessories"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent" />
            <div className="absolute bottom-4 right-5 text-white text-right">
              <h4 className="font-bold text-lg">Accessories</h4>
              <Link href="/accessories" className="text-xs underline underline-offset-4 hover:text-neutral-300 transition">Shop</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
