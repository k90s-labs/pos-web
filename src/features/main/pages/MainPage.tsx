import { useState } from "react";
import { Menu, EllipsisVertical, ChevronLeft, ChevronRight, Search, CircleUserRound, ArrowRightLeft, Minus, Plus, Printer, Pause, PercentCircle, Trash2 } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  color: "gray" | "green" | "orange" | "yellow" | "teal" | "blue";
}

interface CartItem {
  product: Product;
  quantity: number;
}

const products: Product[] = [
  { id: 1, name: "sample 치약", price: 14, color: "gray" },
  { id: 2, name: "sample 치약", price: 14, color: "green" },
  { id: 3, name: "sample 치약", price: 14, color: "orange" },
  { id: 4, name: "sample 치약", price: 14, color: "yellow" },
  { id: 5, name: "sample 치약", price: 14, color: "teal" },
  { id: 6, name: "sample 치약", price: 14, color: "blue" },
  { id: 7, name: "sample 치약", price: 14, color: "gray" },
  { id: 8, name: "sample 치약", price: 14, color: "gray" },
  { id: 9, name: "sample 치약", price: 14, color: "gray" },
  { id: 10, name: "sample 치약", price: 14, color: "gray" },
  { id: 11, name: "sample 치약", price: 14, color: "gray" },
  { id: 12, name: "sample 치약", price: 14, color: "gray" },
  { id: 13, name: "sample 치약", price: 14, color: "gray" },
  { id: 14, name: "sample 치약", price: 14, color: "gray" },
  { id: 15, name: "sample 치약", price: 14, color: "gray" },
  { id: 16, name: "sample 치약", price: 14, color: "gray" },
  { id: 17, name: "sample 치약", price: 14, color: "gray" },
  { id: 18, name: "sample 치약", price: 14, color: "gray" },
  { id: 19, name: "sample 치약", price: 14, color: "gray" },
  { id: 20, name: "sample 치약", price: 14, color: "gray" },
];

const categories = ["Vegetable 1", "Vegetable 2", "Meat", "Bread", "+ Edit Tabs"];

export default function Index() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [cart, setCart] = useState<CartItem[]>([
    { product: { id: 101, name: "Green Onion", price: 15.0, color: "green" }, quantity: 1 },
    { product: { id: 102, name: "Korean Noodle", price: 30.0, color: "orange" }, quantity: 1 },
    { product: { id: 103, name: "Snack", price: 5.0, color: "yellow" }, quantity: 1 },
  ]);
  const [selectedCartIndex, setSelectedCartIndex] = useState(0);
  const [discount, setDiscount] = useState(5.0);

  const getProductColorClasses = (color: string) => {
    const colorMap = {
      gray: "bg-pos-gray border-pos-gray-border",
      green: "bg-pos-green border-pos-green-dark",
      orange: "bg-pos-orange border-pos-orange-dark",
      yellow: "bg-pos-yellow border-pos-yellow-dark",
      teal: "bg-pos-teal border-pos-teal-dark",
      blue: "bg-pos-blue border-pos-blue-dark",
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.gray;
  };

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const total = subtotal - discount;

  const updateQuantity = (index: number, delta: number) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      const newQuantity = newCart[index].quantity + delta;
      if (newQuantity > 0) {
        newCart[index].quantity = newQuantity;
      }
      return newCart;
    });
  };

  const deleteCartItem = () => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== selectedCartIndex));
    if (selectedCartIndex >= cart.length - 1) {
      setSelectedCartIndex(Math.max(0, cart.length - 2));
    }
  };

  const addProductToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingIndex >= 0) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += 1;
        return newCart;
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const clearCart = () => {
    setCart([]);
    setDiscount(0);
  };

  // Compute date/time values - displaying current date and time in header
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayName = dayNames[now.getDay()];
  const hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = String(hours % 12 || 12);
  const dateStr = `${month}/${day} (${dayName})`;
  const timeStr = `${displayHours}:${minutes} ${ampm}`;

  return (
    <div className="flex flex-col h-screen w-full bg-background overflow-hidden">
      {/* Global Header - Spans Full Width */}
      <header className="flex justify-between items-center px-4 py-2 border-b bg-white flex-shrink-0">
        <div className="flex items-center gap-3">
          <Menu className="w-6 h-6 text-foreground" />
          <div className="flex items-center">
            <span className="text-xl font-black text-pos-green leading-[30px]">UNI</span>
            <span className="text-xl font-black text-pos-orange leading-[30px]">MART</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-base font-medium text-foreground text-center">
            <div className="leading-6">{dateStr}</div>
            <div className="leading-6">{timeStr}</div>
          </div>
          <EllipsisVertical className="w-6 h-6 text-foreground" />
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Content - Products */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Category Tabs */}
          <div className="flex justify-between items-center px-4 h-[84px] border-b flex-shrink-0">
            <div className="flex-1 flex items-center border-b border-border">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCategory(index)}
                  className={`flex-1 h-[84px] flex items-center justify-center text-xl font-medium transition-colors ${
                    activeCategory === index
                      ? "text-foreground border-b-2 border-pos-gray-dark"
                      : "text-muted-foreground"
                  } ${index === categories.length - 1 ? "text-lg" : ""}`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="flex items-center">
              <button className="p-4 h-14">
                <ChevronLeft className="w-6 h-6 text-gray-400" />
              </button>
              <button className="p-4 h-14">
                <ChevronRight className="w-6 h-6 text-gray-400" />
              </button>
              <button className="p-4 h-14">
                <Search className="w-6 h-6 text-foreground" />
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1 overflow-auto p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {products.map((product) => (
                <button
                  key={product.id}
                  onClick={() => addProductToCart(product)}
                  className={`aspect-[13/10] rounded-[14px] border-[0.835px] p-4 flex flex-col justify-between items-start text-white transition-transform hover:scale-105 active:scale-95 ${getProductColorClasses(
                    product.color
                  )}`}
                >
                  <div className="text-lg font-semibold leading-7">{product.name}</div>
                  <div className="text-lg font-normal leading-7">{product.price}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Bar - Last Receipt */}
          <div className="h-20 bg-white border-t border-border flex items-center px-4 flex-shrink-0">
            <button className="flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 border-none transition-colors shadow-sm group">
              <Printer className="w-4 h-4 text-foreground" />
              <span className="font-bold text-xs text-foreground uppercase tracking-tight">LAST RECEIPT</span>
            </button>
          </div>
        </div>

        {/* Right Sidebar - Cart */}
        <div className="w-full max-w-[580px] lg:w-[580px] flex flex-col border-l bg-white">
          {/* Member Info */}
          <div className="px-5 py-3 border-b bg-gray-50 min-h-[84px] flex items-center">
            <div className="flex-1 flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <CircleUserRound className="w-6 h-6 text-pos-green" />
                <div className="flex items-center gap-1">
                  <span className="text-lg font-semibold">Minsoo Kim</span>
                  <span className="text-lg">(0412 345 678)</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-lg">
                <div className="flex items-center gap-0.5">
                  <span className="font-semibold">$1,111,250.00</span>
                  <span>spent</span>
                </div>
                <span className="text-gray-400">·</span>
                <div className="flex items-center gap-0.5">
                  <span className="font-semibold">112,800</span>
                  <span>pts</span>
                </div>
                <span className="text-gray-400">·</span>
                <span>Last: 01/02/2025</span>
              </div>
            </div>
            <button className="w-11 h-11 flex items-center justify-center rounded bg-pos-green shrink-0">
              <ArrowRightLeft className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-auto">
            {cart.map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedCartIndex(index)}
                className={`px-5 py-3 cursor-pointer transition-colors ${selectedCartIndex === index ? "bg-pos-green-light" : ""}`}
              >
                {selectedCartIndex === index && (
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-0 h-12 rounded-xl bg-white px-5">
                      <button onClick={() => updateQuantity(index, -1)}>
                        <Minus className="w-6 h-6" />
                      </button>
                      <div className="flex-1 text-center text-lg font-medium min-w-[60px]">
                        {item.quantity}
                      </div>
                      <button onClick={() => updateQuantity(index, 1)}>
                        <Plus className="w-6 h-6" />
                      </button>
                    </div>
                    <button
                      onClick={deleteCartItem}
                      className="h-12 px-5 rounded-xl bg-white font-medium text-sm transition-colors hover:bg-gray-50"
                    >
                      Delete
                    </button>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold">{item.product.name}</span>
                    <span className="text-lg font-semibold">x {item.quantity}</span>
                  </div>
                  <span className="text-lg font-semibold">
                    {(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 px-5 py-3 flex-shrink-0">
            <button className="flex-1 h-16 rounded-xl bg-pos-yellow-muted border border-pos-yellow-muted flex items-center justify-center gap-1.5 transition-transform hover:scale-105 active:scale-95">
              <Pause className="w-6 h-6 fill-pos-yellow-fg stroke-pos-yellow-fg" />
              <span className="text-xl font-bold text-pos-yellow-fg">HOLD</span>
            </button>
            <button className="flex-1 h-16 rounded-xl bg-pos-blue-muted border border-pos-blue-muted flex items-center justify-center gap-1.5 transition-transform hover:scale-105 active:scale-95">
              <PercentCircle className="w-6 h-6 text-pos-blue-fg" />
              <span className="text-xl font-bold text-pos-blue-fg">DISCOUNT</span>
            </button>
            <button
              onClick={clearCart}
              className="flex-1 h-16 rounded-xl bg-pos-red-muted flex items-center justify-center gap-1.5 transition-transform hover:scale-105 active:scale-95"
            >
              <Trash2 className="w-6 h-6 text-pos-red-fg" />
              <span className="text-xl font-bold text-pos-red-fg">CLEAR</span>
            </button>
          </div>

          {/* Checkout Section */}
          <div className="px-5 pt-4 pb-5 bg-pos-gray-dark flex flex-col gap-4 flex-shrink-0">
            <div className="px-6 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-xl text-gray-300">Subtotal</span>
                <span className="text-xl text-gray-300">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xl text-gray-300">Discount</span>
                <span className="text-xl text-gray-300">${discount.toFixed(2)}</span>
              </div>
            </div>
            <button className="h-16 rounded-xl bg-pos-green flex items-center justify-between px-6 transition-transform hover:scale-105 active:scale-95">
              <span className="text-2xl font-semibold text-white">CHECKOUT</span>
              <div className="flex items-center gap-4">
                <div className="h-8 px-3 rounded-xl bg-white flex items-center justify-center">
                  <span className="text-2xl font-semibold text-pos-green">{cart.length}</span>
                </div>
                <span className="text-2xl font-semibold text-white">${total.toFixed(2)}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
