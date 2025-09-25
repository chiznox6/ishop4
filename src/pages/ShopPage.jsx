import React from 'react';
import { Search, ShoppingCart } from 'lucide-react';

function ShopPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="md:hidden px-4">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Search size={20} /></span>
          <input className="form-input w-full rounded-full border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 py-3 pl-10 pr-4 text-base focus:border-primary focus:ring-primary" placeholder="Search for products" type="text"/>
        </div>
      </div>
      <div className="flex items-center gap-2 overflow-x-auto pb-4 px-4 sm:px-0">
        <button className="flex-shrink-0 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm">All</button>
        <button className="flex-shrink-0 rounded-full bg-white dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm">Electronics</button>
        <button className="flex-shrink-0 rounded-full bg-white dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm">Fashion</button>
        <button className="flex-shrink-0 rounded-full bg-white dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm">Home &amp; Kitchen</button>
        <button className="flex-shrink-0 rounded-full bg-white dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm">Sports</button>
        <button className="flex-shrink-0 rounded-full bg-white dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm">Books</button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <div className="group relative flex flex-col overflow-hidden rounded-lg bg-white dark:bg-slate-800/50 shadow-sm">
          <div className="aspect-square bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAZMz_y-ZGqQonvAgdpq7HsOIIBIBQLGz_QiIvhQCNDkMnIQxFkhXuwc0rEGeL7KCi670nYeDKCuNSD79PATDFBTzvjWMjP_cNwf5FgLo3FTfLpSgLzleOz_U_rZl8eAQVeWkGI1cqCYkMcqiP0uMy0uyrbTi4iIkd3hBVWQphiP-H5T2btjQV4S7Dvdt8kOeW_4R8eGzAhQxOVTU-Uv9bjROz0eD52IVwvz5kz3doOasLuZLvl3wKzFNODTl96SbI9Knn4uwyY5Lk")' }}></div>
          <div className="flex flex-1 flex-col p-4">
            <h3 className="font-medium text-slate-800 dark:text-slate-200">Wireless Headphones</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">$49.99</p>
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="rounded-full bg-primary p-3 text-white shadow-lg">
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>
        <div className="group relative flex flex-col overflow-hidden rounded-lg bg-white dark:bg-slate-800/50 shadow-sm">
          <div className="aspect-square bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCgnYhxcDoK9axg2F9La-9uigaPFg-FyAT11X6rWQ-RvUdWtCwBj5-CKI1iG90pxEYzfEDYbJs0c2sAXC9mvhHO2_NYQ7XFGyljWh9QAs093ExeUqJhGHDHTAZwKQWcJzKhBlnGdEL9PclIzSD8-0tRENuwZasBlpsRIv5qNoe2z9WIOmzhpgYGCxain5NefVmRGmm6cXvl-XSxO8TbDZNoh2H-6qwDfjgTNP8bNIsRPM_NeKcNVrxmP4cEAZIO8vWtdb11u799JZI")' }}></div>
          <div className="flex flex-1 flex-col p-4">
            <h3 className="font-medium text-slate-800 dark:text-slate-200">Summer Dress</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">$29.99</p>
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="rounded-full bg-primary p-3 text-white shadow-lg">
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>
        <div className="group relative flex flex-col overflow-hidden rounded-lg bg-white dark:bg-slate-800/50 shadow-sm">
          <div className="aspect-square bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBGvYdC1JyXrCAZPp6T-kthYgPPwVriPdtxGV4CwC3oR8-Tvt9X35gX6vsmvF1GSBFMDsfbpbFsDi4WjWEEyls9HLkYQUR2cOyOnTe4AXfcQ4OGDfr6QrNkH3WY1_V2VBq6hHweu2v2tPOh3YhD7vNcXF0zJQe5qXkl5vtiU1hwNph8wPnCcPiC7uWmAcSoCYC8is0S0OhLTFT_HEQ-MQJS6HA35tj2fwl5jJ7wpDO-_Ju2gfZOfQgTyRyObwmrEoDG8nOewYNhlE")' }}></div>
          <div className="flex flex-1 flex-col p-4">
            <h3 className="font-medium text-slate-800 dark:text-slate-200">Smart Blender</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">$79.99</p>
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="rounded-full bg-primary p-3 text-white shadow-lg">
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>
        <div className="group relative flex flex-col overflow-hidden rounded-lg bg-white dark:bg-slate-800/50 shadow-sm">
          <div className="aspect-square bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCdh5Yh7XoKb37utFJtn1JqFUfTTQ4XZjDaJsZAXrj4lQwF6LL-cR2oqEDtlstlpFLS2uNTloaFNek-moNwrgFO0FQ0CX457LP8qNwfB4HjvBgP7GUofut0WUXdsUv5jxDywV4-yvvzasdi2aTAtIaISw_nluh6AnYN0-XmIgdu1dSPeI4oYFGPC5LuT1v2bREE3GyR-ai3t4cxmNCMyAleqoGQDeSu_kJfR4nDXHHb72smSQzap06yx4P-ay7USclbDWzGYappI-o")' }}></div>
          <div className="flex flex-1 flex-col p-4">
            <h3 className="font-medium text-slate-800 dark:text-slate-200">Leather Wallet</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">$19.99</p>
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="rounded-full bg-primary p-3 text-white shadow-lg">
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>
        <div className="group relative flex flex-col overflow-hidden rounded-lg bg-white dark:bg-slate-800/50 shadow-sm">
          <div className="aspect-square bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB8HaElcX_yvKtmp0EqWI4n1FE1Fqp8AFtUrpngB4dF3lKQ0i16I18OyVybsTwsCXl6K-iNnYrNfHHctFiEygdEXtbqe7mLVpLW6CCFZfVCzMQs8Zk9C0qWiK97oU5kMMWIvDTij0zkmIP7Rm0AXEjHh2giwvDSi1re1pgFEjy0sWqtt-WeG9FLFbObKFbTGPMG49tBvEGzDhJpmZHDQI-aaZoc7SRrANzEGphWbpAILqqTgFPeRPh73gfflppLQJtbARZl2Sn-zxc")' }}></div>
          <div className="flex flex-1 flex-col p-4">
            <h3 className="font-medium text-slate-800 dark:text-slate-200">Running Shoes</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">$59.99</p>
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="rounded-full bg-primary p-3 text-white shadow-lg">
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>
        <div className="group relative flex flex-col overflow-hidden rounded-lg bg-white dark:bg-slate-800/50 shadow-sm">
          <div className="aspect-square bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDn_kl3ZmmtPNAJm2wz_Py6ur-NGTQyM2f7Q6uYXbkOrmWqwKZ_MntK0fjvWJsMKfek8LBjQq_Rsrj2TKmbM2Ci3L9uVqPoj6MVZ2h_1DVtIslKioHNDvdjOHXvL3zhvO06-E4DUFLBFH1u6Wu7LTXsnSCQWlGlgQteX2waaF2CH8t21R41q-n7biaG4qXY9Q5s6jI48iD-6XYugTO8J3hwQKyGk5BzCX2Dv_aDTfjec5aXXUYJ5ecLUVeOktEZJ2MD5ogwkgGeLhU")' }}></div>
          <div className="flex flex-1 flex-col p-4">
            <h3 className="font-medium text-slate-800 dark:text-slate-200">Coffee Maker</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">$39.99</p>
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="rounded-full bg-primary p-3 text-white shadow-lg">
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>
        <div className="group relative flex flex-col overflow-hidden rounded-lg bg-white dark:bg-slate-800/50 shadow-sm">
          <div className="aspect-square bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBWjGzMQHgiuvuGsrOb6C4MP2SqHs479LDdYH_iwl3CIYyTcjBGNl-hdtEUxCW_DqilXFyVy3xR5MKfeSNaoqe0pyLBHRAzQfKmylp4ypOiGbwoIpwZu16ljhypS4anYQhE34d49FRzASOCX4qhvafHbAKaaZoc7SRrANzEGphWbpAILqqTgFPeRPh73gfflppLQJtbARZl2Sn-zxc")' }}></div>
          <div className="flex flex-1 flex-col p-4">
            <h3 className="font-medium text-slate-800 dark:text-slate-200">Backpack</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">$24.99</p>
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="rounded-full bg-primary p-3 text-white shadow-lg">
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>
        <div className="group relative flex flex-col overflow-hidden rounded-lg bg-white dark:bg-slate-800/50 shadow-sm">
          <div className="aspect-square bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBIxjq5O9U8vlM0hpKyKJ3vhLEqIMjWhGJ5EomqSUZ3i8WQx1xqszpW-GcizBJgeqxz0PCnXcXk47oEbLnPLRQc_rpgzfSyZ38SoRBUff9j3FffQ-50R5mtNXUW9n4eZBkv-thHZ5Hy0MYMzI3OfPvIOoJZyGn07pqb6WtE84GykUZ5-0Dr37W57Ud6wFX48Znc5B1skTLDS6FnbsLNLE2d939hq0jGyeqlHBHgg2rsNoSpJFcVzxBOL7NT34fEVyF_pGepRSRiUP0")' }}></div>
          <div className="flex flex-1 flex-col p-4">
            <h3 className="font-medium text-slate-800 dark:text-slate-200">Sunglasses</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">$14.99</p>
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="rounded-full bg-primary p-3 text-white shadow-lg">
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopPage;
