interface ProductCardProps {
  id: number;
  nameKo: string;
  nameEn: string;
  price: number;
  color: string;
  onClick: (product: any) => void;
}

function ProductCard({ id, nameKo, nameEn, price, color, onClick }: ProductCardProps) {
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

export default ProductCard;