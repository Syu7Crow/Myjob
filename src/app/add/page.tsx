'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { addFood } from "@/lib/actions";
import Link from 'next/link';

// 型の定義（ビルドエラー防止）
type FoodSub = {
    icon: string;
    parts: string[];
};

type FoodCategory = {
    icon: string;
    days: number;
    qty: number;
    unit: string;
    subs: Record<string, FoodSub>;
};

export default function AddFoodPage() {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [unit, setUnit] = useState("個");

    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);

    const today = new Date();
    const [selYear, setSelYear] = useState(today.getFullYear());
    const [selMonth, setSelMonth] = useState(today.getMonth() + 1);
    const [selDay, setSelDay] = useState(today.getDate());

    const monthScrollRef = useRef<HTMLDivElement>(null);
    const dayScrollRef = useRef<HTMLDivElement>(null);

    const foodHierarchy: Record<string, FoodCategory> = {
        '肉': {
            icon: '🥩', days: 2, qty: 300, unit: 'g',
            subs: {
                '鶏肉': { icon: '🍗', parts: ['もも', 'むね', 'ささみ', '手羽元'] },
                '豚肉': { icon: '🥓', parts: ['バラ', 'ロース', 'こま切れ', 'ひき肉'] },
                '牛肉': { icon: '🥩', parts: ['肩ロース', 'バラ', 'サーロイン', 'もも'] },
            }
        },
        '野菜': {
            icon: '🥬', days: 5, qty: 1, unit: '袋',
            subs: {
                'キャベツ': { icon: '🥬', parts: ['一玉', '半分', '千切り'] },
                'トマト': { icon: '🍅', parts: ['大玉', 'ミニ'] },
                'レタス': { icon: '🥬', parts: ['一玉', 'サラダ用'] },
                '人参': { icon: '🥕', parts: ['1本', '3本セット'] },
            }
        },
        '飲料': {
            icon: '🥤', days: 14, qty: 1, unit: '本',
            subs: {
                'コーラ': { icon: '🥤', parts: ['500ml', '1.5L', '缶'] },
                '牛乳': { icon: '🥛', parts: ['1000ml', '500ml', '低脂肪'] },
                'お茶': { icon: '🍵', parts: ['500ml', '2L', '茶葉'] },
            }
        },
        'その他': {
            icon: '📦', days: 7, qty: 1, unit: '個',
            subs: {
                'たまご': { icon: '🥚', parts: ['10個パック', '6個パック', 'バラ'] },
                '納豆': { icon: '📦', parts: ['3パック', '2パック'] },
                '豆腐': { icon: '⬜', parts: ['絹', '木綿', '3個パック'] },
            }
        }
    };

    const mainQuickItems = [
        { label: '肉', icon: '🥩' },
        { label: '野菜', icon: '🥬' },
        { label: '飲料', icon: '🥤' },
        { label: 'その他', icon: '📦' },
    ];

    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const daysInMonth = useMemo(() => new Date(selYear, selMonth, 0).getDate(), [selYear, selMonth]);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const dateStr = useMemo(() => `${selYear}-${String(selMonth).padStart(2, '0')}-${String(selDay).padStart(2, '0')}`, [selYear, selMonth, selDay]);

    const updateExpiration = (daysToAdd: number) => {
        const d = new Date();
        d.setDate(d.getDate() + daysToAdd);
        setSelYear(d.getFullYear()); setSelMonth(d.getMonth() + 1); setSelDay(d.getDate());
    };

    const handleMainSelect = (label: string) => {
        setActiveCategory(label);
        setActiveSubCategory(null);
        setName(label);
        const config = foodHierarchy[label];
        if (config) {
            setQuantity(config.qty);
            setUnit(config.unit);
            updateExpiration(config.days);
        }
    };

    const syncScroll = (ref: React.RefObject<HTMLDivElement | null>, value: number, offset: number = 1) => {
        if (ref.current) ref.current.scrollTo({ top: (value - offset) * 40, behavior: 'smooth' });
    };

    useEffect(() => {
        syncScroll(monthScrollRef, selMonth);
        syncScroll(dayScrollRef, selDay);
    }, [selMonth, selDay]);

    return (
        <div className="min-h-screen bg-[#F8FAFA] p-4 flex flex-col items-center">
            <div className="w-full max-w-md bg-white rounded-[3rem] shadow-2xl border border-emerald-50 p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-black text-gray-800 tracking-tight">食材登録</h1>
                    <Link href="/refrigerator" className="text-gray-400">✕</Link>
                </div>

                {/* 1段目 */}
                <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                    {mainQuickItems.map((item) => (
                        <button key={item.label} type="button" onClick={() => handleMainSelect(item.label)}
                            className={`flex-shrink-0 flex flex-col items-center gap-1 p-3 w-20 rounded-2xl transition-all border ${activeCategory === item.label ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white border-gray-100 text-gray-500'}`}>
                            <span className="text-2xl">{item.icon}</span>
                            <span className="text-[10px] font-bold">{item.label}</span>
                        </button>
                    ))}
                </div>

                {/* 2段目 */}
                {activeCategory && foodHierarchy[activeCategory]?.subs && (
                    <div className="flex gap-2 overflow-x-auto py-2 scrollbar-hide">
                        {Object.entries(foodHierarchy[activeCategory].subs).map(([subKey, subVal]) => (
                            <button key={subKey} type="button" onClick={() => { setActiveSubCategory(subKey); setName(subKey); }}
                                className={`flex-shrink-0 px-4 py-2 rounded-xl font-bold text-xs border-2 transition-all ${activeSubCategory === subKey ? 'bg-emerald-100 border-emerald-500 text-emerald-700' : 'bg-gray-50 border-transparent text-gray-400'}`}>
                                {subVal.icon} {subKey}
                            </button>
                        ))}
                    </div>
                )}

                {/* 3段目 */}
                {activeCategory && activeSubCategory && foodHierarchy[activeCategory]?.subs?.[activeSubCategory] && (
                    <div className="flex flex-wrap gap-2 py-3">
                        {foodHierarchy[activeCategory].subs[activeSubCategory].parts.map((part) => (
                            <button key={part} type="button" onClick={() => setName(`${activeSubCategory} ${part}`)}
                                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-all ${name === `${activeSubCategory} ${part}` ? 'bg-gray-800 text-white' : 'bg-white border-gray-200 text-gray-500'}`}>
                                {part}
                            </button>
                        ))}
                    </div>
                )}

                <form action={addFood} className="space-y-6 mt-4">
                    <input name="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="食材名" className="w-full px-6 py-4 bg-gray-50 rounded-2xl font-bold outline-none" />

                    <div className="flex gap-2">
                        <div className="flex-[2] flex items-center bg-gray-50 rounded-2xl px-2">
                            <button type="button" onClick={() => setQuantity(q => Math.max(0, q - (unit === 'g' ? 50 : 1)))} className="w-10 h-10 text-emerald-500 font-black text-xl">−</button>
                            <input type="hidden" name="quantity" value={`${quantity}${unit}`} />
                            <input type="text" value={quantity} onChange={(e) => setQuantity(Number(e.target.value.replace(/[^0-9]/g, '')))} className="flex-1 bg-transparent text-center font-bold" />
                            <button type="button" onClick={() => setQuantity(q => q + (unit === 'g' ? 50 : 1))} className="w-10 h-10 text-emerald-500 font-black text-xl">+</button>
                        </div>
                        <select value={unit} onChange={(e) => setUnit(e.target.value)} className="flex-[1] bg-gray-50 rounded-2xl font-bold text-gray-500 text-center outline-none">
                            {['個', 'パック', '本', 'g', 'ml', 'L', '袋'].map(u => <option key={u} value={u}>{u}</option>)}
                        </select>
                    </div>

                    <div className="relative h-20">
                        <input type="date" name="trashDate" value={dateStr} onChange={(e) => { const d = new Date(e.target.value); if (!isNaN(d.getTime())) { setSelYear(d.getFullYear()); setSelMonth(d.getMonth() + 1); setSelDay(d.getDate()); } }} className="absolute inset-0 opacity-0 z-30 cursor-pointer" />
                        <div className="absolute inset-0 bg-emerald-50 border-2 border-emerald-100 rounded-3xl flex flex-col items-center justify-center">
                            <span className="text-[10px] font-bold text-emerald-400">賞味期限</span>
                            <span className="font-black text-emerald-600 text-xl">{selYear}年 {selMonth}月 {selDay}日</span>
                        </div>
                    </div>

                    <div className="h-[120px] bg-gray-50 rounded-[2rem] overflow-hidden flex border border-gray-100 relative">
                        <div className="absolute top-1/2 left-4 right-4 h-[40px] -translate-y-1/2 bg-white shadow-sm pointer-events-none border-y border-emerald-100 z-0" />
                        <div ref={monthScrollRef} onScroll={(e) => { const index = Math.round(e.currentTarget.scrollTop / 40); if (months[index] && months[index] !== selMonth) setSelMonth(months[index]); }} className="flex-1 overflow-y-scroll snap-y snap-mandatory scrollbar-hide py-[40px] z-10 text-center">
                            {months.map(m => <div key={m} className={`h-[40px] flex items-center justify-center snap-center font-bold ${selMonth === m ? 'text-emerald-600 text-xl' : 'text-gray-300 text-sm'}`}>{m}月</div>)}
                        </div>
                        <div ref={dayScrollRef} onScroll={(e) => { const index = Math.round(e.currentTarget.scrollTop / 40); if (days[index] && days[index] !== selDay) setSelDay(days[index]); }} className="flex-1 overflow-y-scroll snap-y snap-mandatory scrollbar-hide py-[40px] z-10 text-center">
                            {days.map(d => <div key={d} className={`h-[40px] flex items-center justify-center snap-center font-bold ${selDay === d ? 'text-emerald-600 text-xl' : 'text-gray-300 text-sm'}`}>{d}日</div>)}
                        </div>
                    </div>

                    <input type="hidden" name="buyDate" value={today.toISOString().split('T')[0]} />
                    <button type="submit" className="w-full bg-gray-900 text-white py-5 rounded-[2rem] font-black text-lg shadow-xl active:scale-95 transition-all">冷蔵庫に追加 📥</button>
                </form>
            </div>
        </div>
    );
}