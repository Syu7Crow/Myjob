// src/app/scan/page.tsx
'use client'; // ボタンなどの動きを付けるために必要

export default function ScanPage() {
    const handleScan = () => {
        alert('カメラを起動します（ここにスキャン機能を実装予定）');
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>食材スキャン</h1>
            <p>冷蔵庫の中身をスキャンして登録しましょう。</p>

            <button
                onClick={handleScan}
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#0070f3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                スキャンを開始する
            </button>
        </div>
    );
}