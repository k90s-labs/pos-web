interface OrderItem {
  id: number;
  nameKo: string;
  nameEn: string;
  price: number;
  quantity: number;
}

interface OrderListProps {
  items: OrderItem[];
  onRemove: (id: number) => void;
}

function OrderList({ items, onRemove }: OrderListProps) {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}>
      <h2 style={{ margin: '0 0 20px 0', fontSize: '20px' }}>주문 목록</h2>
      
      <div style={{
        flex: 1,
        overflowY: 'auto',
        marginBottom: '20px',
      }}>
        {items.length === 0 ? (
          <p style={{ color: '#999', textAlign: 'center', marginTop: '40px' }}>
            상품을 선택해주세요
          </p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              style={{
                padding: '12px',
                marginBottom: '8px',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>
                  {item.nameKo}
                </p>
                <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                  ${item.price.toFixed(2)} x {item.quantity}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <p style={{ margin: 0, fontWeight: 'bold', fontSize: '16px' }}>
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
                  삭제
                </button>
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
            결제하기
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
              }}
            >
              0원 결제
            </button>
            <button
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: '#e0e0e0',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              할인
            </button>
            <button
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: '#e0e0e0',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              분할결제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderList;