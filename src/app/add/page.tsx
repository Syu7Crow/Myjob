'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { addFood } from "@/lib/actions";
import Link from 'next/link';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { type Dayjs } from 'dayjs';

// --- 型定義 ---
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
    const [hierarchy, setHierarchy] = useState<Record<string, FoodCategory>>({
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
                '牛乳': { icon: '🥛', parts: ['1000ml', '500ml', '低脂肪'] },
                'お茶': { icon: '🍵', parts: ['500ml', '2L', '茶葉'] },
            }
        },
        'その他': {
            icon: '📦', days: 7, qty: 1, unit: '個',
            subs: {
                'たまご': { icon: '🥚', parts: ['10個パック', '6個パック'] },
                '納豆': { icon: '📦', parts: ['3パック', '2パック'] },
            }
        }
    });

    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [unit, setUnit] = useState("個");
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);

    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const [selYear, setSelYear] = useState(today.getFullYear());
    const [selMonth, setSelMonth] = useState(today.getMonth() + 1);
    const [selDay, setSelDay] = useState(today.getDate());
    const [date, setDate] = useState(dayjs());

    const monthScrollRef = useRef<HTMLDivElement>(null);
    const dayScrollRef = useRef<HTMLDivElement>(null);

    const mainCategories = [
        { label: '肉', icon: '🥩' },
        { label: '野菜', icon: '🥬' },
        { label: '飲料', icon: '🥤' },
        { label: 'その他', icon: '📦' },
    ];

    const updateExpiration = (daysToAdd: number) => {
        const d = new Date();
        d.setDate(d.getDate() + daysToAdd);
        setSelYear(d.getFullYear()); setSelMonth(d.getMonth() + 1); setSelDay(d.getDate());
    };

    const handleMainSelect = (label: string) => {
        setActiveCategory(label);
        setActiveSubCategory(null);
        setName(label);
        const config = hierarchy[label];
        if (config) {
            setQuantity(config.qty);
            setUnit(config.unit);
            updateExpiration(config.days);
        }
    };

    // --- 2段目（鶏肉など）を追加する関数 ---
    const addNewSubCategory = () => {
        if (!activeCategory) return;
        const newSubName = prompt(`${activeCategory}に新しく追加する項目名を入力してください`);
        if (!newSubName) return;

        setHierarchy(prev => ({
            ...prev,
            [activeCategory]: {
                ...prev[activeCategory],
                subs: {
                    ...prev[activeCategory].subs,
                    [newSubName]: { icon: '✨', parts: ['通常'] }
                }
            }
        }));
        setActiveSubCategory(newSubName);
        setName(newSubName);
    };

    // --- 3段目（ささみなど）を追加する関数 ---
    const addNewPart = () => {
        if (!activeCategory || !activeSubCategory) return;
        const newPartName = prompt(`${activeSubCategory}の新しい部位・種類を入力してください`);
        if (!newPartName) return;

        setHierarchy(prev => {
            const currentParts = prev[activeCategory].subs[activeSubCategory].parts;
            return {
                ...prev,
                [activeCategory]: {
                    ...prev[activeCategory],
                    subs: {
                        ...prev[activeCategory].subs,
                        [activeSubCategory]: {
                            ...prev[activeCategory].subs[activeSubCategory],
                            parts: [...currentParts, newPartName]
                        }
                    }
                }
            };
        });
        setName(`${activeSubCategory} ${newPartName}`);
    };

    useEffect(() => {
        const sync = (ref: React.RefObject<HTMLDivElement | null>, val: number, offset: number = 1) => {
            if (ref.current) ref.current.scrollTo({ top: (val - offset) * 40, behavior: 'smooth' });
        };
        sync(monthScrollRef, selMonth);
        sync(dayScrollRef, selDay);
    }, [selMonth, selDay]);

    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const daysInMonth = new Date(selYear, selMonth, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const dateStr = `${selYear}-${String(selMonth).padStart(2, '0')}-${String(selDay).padStart(2, '0')}`;

    return (
        <div className="min-h-screen bg-[#F8FAFA] p-4 flex flex-col items-center">
            <div className="w-full max-w-md bg-white rounded-[3.5rem] shadow-2xl border border-emerald-50 p-8 pb-12">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-black text-gray-800 tracking-tight">食材を追加</h1>
                    <Link href="/refrigerator" className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">✕</Link>
                </div>

                {/* 1段目 */}
                <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                    {mainCategories.map((cat) => (
                        <button key={cat.label} type="button" onClick={() => handleMainSelect(cat.label)}
                            className={`flex-shrink-0 flex flex-col items-center gap-1 p-4 w-20 rounded-[2rem] transition-all border-2 ${activeCategory === cat.label ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg' : 'bg-white border-gray-100 text-gray-400'}`}>
                            <span className="text-2xl">{cat.icon}</span>
                            <span className="text-[10px] font-black">{cat.label}</span>
                        </button>
                    ))}
                </div>

                {/* 2段目 */}
                {activeCategory && (
                    <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
                        {Object.entries(hierarchy[activeCategory].subs).map(([subKey, subVal]) => (
                            <button key={subKey} type="button"
                                onClick={() => { setActiveSubCategory(subKey); setName(subKey); }}
                                className={`flex-shrink-0 px-5 py-2.5 rounded-2xl font-bold text-xs border-2 transition-all ${activeSubCategory === subKey ? 'bg-emerald-100 border-emerald-500 text-emerald-700' : 'bg-gray-50 border-transparent text-gray-400'}`}>
                                {subVal.icon} {subKey}
                            </button>
                        ))}
                        <button type="button" onClick={addNewSubCategory} className="flex-shrink-0 px-5 py-2.5 rounded-2xl font-bold text-xs border-2 border-dashed border-emerald-200 text-emerald-500 bg-emerald-50/30">＋ 追加</button>
                    </div>
                )}

                {/* 3段目: ここに ＋追加 ボタンを組み込み */}
                {activeCategory && activeSubCategory && (
                    <div className="flex flex-wrap gap-2 py-3">
                        {hierarchy[activeCategory].subs[activeSubCategory].parts.map((part) => (
                            <button key={part} type="button" onClick={() => setName(`${activeSubCategory} ${part}`)}
                                className={`px-4 py-2 rounded-xl text-[11px] font-black border transition-all ${name === `${activeSubCategory} ${part}` ? 'bg-gray-800 text-white' : 'bg-white border-gray-200 text-gray-500'}`}>
                                {part}
                            </button>
                        ))}
                        {/* 3段目の追加ボタン */}
                        <button type="button" onClick={addNewPart} className="px-4 py-2 rounded-xl text-[11px] font-black border-2 border-dashed border-gray-300 text-gray-400 bg-gray-50/50">＋ 部位を追加</button>
                    </div>
                )}

                <form action={addFood} className="space-y-6 mt-6">
                    <input name="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="食材の名前" className="w-full px-7 py-5 bg-gray-50 rounded-[2rem] font-bold text-gray-700 outline-none border-2 border-transparent focus:border-emerald-200 transition-all" />

                    <div className="flex gap-3">
                        <div className="flex-[1.8] flex items-center bg-gray-50 rounded-[2rem] px-2">
                            <button type="button" onClick={() => setQuantity(q => Math.max(0, q - (unit === 'g' ? 50 : 1)))} className="w-12 h-12 text-emerald-500 font-black text-2xl">−</button>
                            <input type="hidden" name="quantity" value={`${quantity}${unit}`} />
                            <input type="text" value={quantity} onChange={(e) => setQuantity(Number(e.target.value.replace(/[^0-9]/g, '')))} className="flex-1 bg-transparent text-center font-bold text-gray-700 outline-none min-w-0" />
                            <button type="button" onClick={() => setQuantity(q => q + (unit === 'g' ? 50 : 1))} className="w-12 h-12 text-emerald-500 font-black text-2xl">+</button>
                        </div>
                        <select value={unit} onChange={(e) => setUnit(e.target.value)} className="flex-[1.2] bg-gray-50 rounded-[2rem] font-black text-gray-500 text-center outline-none cursor-pointer">
                            {['個', 'パック', '本', 'g', 'ml', 'L', '袋'].map(u => <option key={u} value={u}>{u}</option>)}
                        </select>
                    </div>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="賞味期限/消費期限"
                        value={date}
                        onChange={(newDate: Dayjs | null) => setDate(newDate || dayjs())}
                        minDate={dayjs().startOf('day')}
                        format="YYYY/MM/DD"
                        slotProps={{ textField: { fullWidth: true, size: 'small' } }}
                      />
                    </LocalizationProvider>

                    <input type="hidden" name="trashDate" value={date.format('YYYY-MM-DD')} />
                    <input type="hidden" name="buyDate" value={today.toISOString().split('T')[0]} />
                    <button type="submit" className="w-full bg-gray-900 text-white py-6 rounded-[2.5rem] font-black text-xl shadow-2xl active:scale-[0.97] transition-all">冷蔵庫に追加 📥</button>
                </form>
            </div>
        </div>
    );
}