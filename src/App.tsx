import { useState } from 'react';

interface Product {
  id: number;
  nameKo: string;
  nameEn: string;
  price: number;
  color: string;
}

interface OrderItem extends Product {
  quantity: number;
}

// 더미 데이터 (나중에 백엔드 API로 대체)
const sampleProducts: Product[] = [
  { id: 1, nameKo: 'sample 약', nameEn: 'Sample Medicine', price: 14.00, color: '#6B7280' },
  { id: 2, nameKo: 'sample 티셔츠', nameEn: 'Sample T-Shirt', price: 52.00, color: '#10B981' },
  { id: 3, nameKo: 'sample 딸기잼', nameEn: 'Sample Strawberry Jam', price: 12.90, color: '#F59E0B' },
  { id: 4, nameKo: 'sample 칩', nameEn: 'Sample Chips', price: 4.50, color: '#EAB308' },
  { id: 5, nameKo: 'sample 우유', nameEn: 'Sample Milk', price: 3.50, color: '#3B82F6' },
  { id: 6, nameKo: 'sample 사과', nameEn: 'Sample Apple', price: 2.00, color: '#EF4444' },
  { id: 7, nameKo: 'sample `바나나', nameEn: 'Sample Banana', price: 1.50, color: '#F59E0B' },
  { id: 8, nameKo: 'sample 빵', nameEn: 'Sample Bread', price: 4.00, color: '#92400E' },
];

// ProductCard 컴포넌트
function ProductCard({ id, nameKo, nameEn, price, color, onClick }: {
  id: number;
  nameKo: string;
  nameEn: string;
  price: number;
  color: string;
  onClick: (product: Product) => void;
}) {
  const product = { id, nameKo, nameEn, price, color };
  
  return (
    <div
      onClick={() => onClick(product)}
      style={{
        backgroundColor: color,
        padding: '20px',
        borderRadius: '12px',
        cursor: 'pointer',
        minHeight: '120px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.02)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <div>
        <h3 style={{ margin: '0 0 8px 0', color: 'white', fontSize: '18px' }}>
          {nameKo}
        </h3>
        <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>
          {nameEn}
        </p>
      </div>
      <p style={{ 
        margin: '12px 0 0 0', 
        color: 'white', 
        fontSize: '20px', 
        fontWeight: 'bold' 
      }}>
        ${price.toFixed(2)}
      </p>
    </div>
  );
}

// OrderList 컴포넌트
function OrderList({ items, onRemove }: {
  items: OrderItem[];
  onRemove: (id: number) => void;
}) {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}>
      <h2 style={{ margin: '0 0 20px 0', fontSize: '20px' }}>Order List</h2>
      
      <div style={{
        flex: 1,
        overflowY: 'auto',
        marginBottom: '20px',
      }}>
        {items.length === 0 ? (
          <p style={{ color: '#999', textAlign: 'center', marginTop: '40px' }}>
            Select items to order
          </p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              style={{
                padding: '12px',
                marginBottom: '10px',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
              }}
            >
              <p style={{ margin: '0 0 8px 0', fontWeight: 'normal', fontSize: '18px' }}>
                {item.nameKo}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ 
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#374151',
                    minWidth: '60px'
                  }}>
                    ${item.price.toFixed(2)}
                  </span>
                  <span style={{ 
                    backgroundColor: '#FCD34D', 
                    color: '#000',
                    padding: '2px 10px',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    fontSize: '16px'
                  }}>
                    x {item.quantity}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <p style={{ margin: 0, fontWeight: 'bold', fontSize: '20px' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => onRemove(item.id)}
                    style={{
                      backgroundColor: '#ff4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      cursor: 'pointer',
                      fontSize: '12px',
                    }}
                  >
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div style={{
        borderTop: '2px solid #ddd',
        paddingTop: '16px',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '16px',
          fontSize: '24px',
          fontWeight: 'bold',
        }}>
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}>
          <button
            style={{
              padding: '16px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            CHECKOUT
          </button>
          
          <div style={{
            display: 'flex',
            gap: '8px',
          }}>
            <button
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: '#e0e0e0',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '13px',
              }}
            >
              ZERO PAY
            </button>
            <button
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: '#e0e0e0',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '13px',
              }}
            >
              DISCOUNT
            </button>
            <button
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: '#e0e0e0',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '13px',
              }}
            >
              SPLIT PAY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 메인 App 컴포넌트
function App() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const handleProductClick = (product: Product) => {
    setOrderItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const handleRemoveItem = (id: number) => {
    setOrderItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      backgroundColor: '#f0f0f0',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      {/* 왼쪽: 상품 목록 */}
      <div style={{
        flex: 1,
        padding: '20px',
        overflowY: 'auto',
      }}>
        <h1 style={{ margin: '0 0 20px 0', fontSize: '24px' }}>
          UNIMART POS
        </h1>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '16px',
        }}>
          {sampleProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onClick={handleProductClick}
            />
          ))}
        </div>
      </div>

      {/* 오른쪽: 주문/결제 */}
      <div style={{
        width: '400px',
        backgroundColor: 'white',
        padding: '20px',
        boxShadow: '-2px 0 8px rgba(0,0,0,0.1)',
      }}>
        <OrderList items={orderItems} onRemove={handleRemoveItem} />
      </div>
    </div>
  );
}

export default App;