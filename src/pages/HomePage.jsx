import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="h-screen min-h-[480px] bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCtkDi_YsMOPDultL04-TdbTrDnq6sS1FQzXJwRP7ViYiH61J9EHag825md2dHHvCVueZ0byXVbMqe4pL9oX31Sgje13qr7a0DoVfmTgWIIEumTyLOLMma4QqHDiVKb9EBs0_cu4Yx6ZF5-0Nxtev2X9RbeTZjxlLl70CLNwn_RtUKmhTQqmrMSKzE3JNcAYcejJQP0kczUcEr9y6uGghdR6gmC2PFzZD2iPbtRmIaZATx2zW2iFIRw49OJt7Oekw6vUBh7onKsVU4")' }}></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight">
              Shop smarter. One cart across all stores.
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl">
              Discover a new way to shop online. iShop4U lets you browse multiple stores and checkout with a single cart.
            </p>
            <Link to="/shop" className="bg-primary text-white font-bold py-3 px-8 rounded-lg text-lg hover:opacity-90 transition-opacity">
              Browse
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;