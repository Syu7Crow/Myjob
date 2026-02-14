'use client';

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="p-8 bg-white rounded-3xl shadow-xl">
                <h1 className="text-2xl font-black text-gray-800 mb-4">ログイン</h1>
                <p className="text-gray-500 mb-6">現在、ログイン機能は準備中です。</p>
                <button
                    onClick={() => window.location.href = '/refrigerator'}
                    className="w-full bg-emerald-500 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-emerald-600 transition-all"
                >
                    冷蔵庫へ進む
                </button>
            </div>
        </div>
    );
}