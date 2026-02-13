'use client'; // 動き（クリック等）をつける場合に必要

export default function RefrigeratorPage() {
    // 1. 食材のダミーデータ（配列）
    const foods = [
        { id: 1, name: "たまご", quantity: "6個", date: "2026-02-20" },
        { id: 2, name: "牛乳", quantity: "1本", date: "2026-02-18" },
        { id: 3, name: "鶏もも肉", quantity: "300g", date: "2026-02-15" },
        { id: 4, name: "キャベツ", quantity: "1/2個", date: "2026-02-25" },
    ];

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>
                冷蔵庫の中身
            </h1>

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {foods.map((food) => (
                    <li
                        key={food.id}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '15px',
                            borderBottom: '1px solid #ddd',
                            backgroundColor: '#f9f9f9',
                            marginBottom: '5px',
                            borderRadius: '8px'
                        }}
                    >
                        <div>
                            <strong style={{ fontSize: '1.2rem' }}>{food.name}</strong>
                            <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                                消費期限: {food.date}
                            </p>
                        </div>
                        <div style={{ alignSelf: 'center', fontWeight: 'bold' }}>
                            数量: {food.quantity}
                        </div>
                    </li>
                ))}
            </ul>

            {/* トップに戻るボタン */}
            <div style={{ marginTop: '20px' }}>
                <button
                    onClick={() => window.location.href = '/'}
                    style={{ padding: '10px 20px', cursor: 'pointer' }}
                >
                    トップへ戻る
                </button>
            </div>
        </div>
    );
}