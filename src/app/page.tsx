import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>MyJob キッチンアシスタント</h1>
      <p>管理したい項目を選択してください</p>

      <div style={{
        display: 'flex',
        gap: '20px',
        justifyContent: 'center',
        marginTop: '30px'
      }}>
        {/* 冷蔵庫ページへのボタン */}
        <Link href="/refrigerator">
          <button style={buttonStyle}>
            📦 冷蔵庫の中身を見る
          </button>
        </Link>

        {/* スキャンページへのボタン */}
        <Link href="/scan">
          <button style={{ ...buttonStyle, backgroundColor: '#28a745' }}>
            📷 食材をスキャンする
          </button>
        </Link>
      </div>
    </main>
  );
}

// 共通のボタンデザイン
const buttonStyle = {
  padding: '15px 25px',
  fontSize: '18px',
  color: 'white',
  backgroundColor: '#0070f3',
  border: 'none',
  borderRadius: '10px',
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: 'opacity 0.2s',
};