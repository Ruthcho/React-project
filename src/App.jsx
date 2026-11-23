import { useMemo, useState } from 'react'
import SetCard from './components/SetCard.jsx'
import './App.css'

// מערך "רשימת המארזים" ההתחלתית — placeholder, יוחלף בנתונים אמיתיים
const initialSets = [
  // מארז ראשון: בהרכבה עם שני פריטים
  {
    id: 1,
    destination: 'שם מלא 1',
    status: 'building',
    items: [
      { id: 1, name: 'פריט 1', price: 40 },
      { id: 2, name: 'פריט 2', price: 25 },
    ],
  },
  // מארז שני: ריק — ממתין להתחלת הרכבה
  { id: 2, destination: 'שם מלא 2', status: 'empty', items: [] },
  // מארז שלישי: בהרכבה עם פריט בודד
  {
    id: 3,
    destination: 'שם מלא 3',
    status: 'building',
    items: [{ id: 3, name: 'פריט 3', price: 60 }],
  },
  // מארז רביעי: ריק
  { id: 4, destination: 'שם מלא 4', status: 'empty', items: [] },
]

export default function App() {
  // מצב ראשי: רשימת המארזים — מקור האמת היחיד
  const [sets, setSets] = useState(initialSets)

  // פעולת "התחל" — מחליפה סטטוס של מארז מסוים ל-"building"
  function startSet(setId) {
    setSets((prev) =>
      prev.map((s) => (s.id === setId ? { ...s, status: 'building' } : s)),
    )
  }

  // פעולת "הסר פריט" — מסננת החוצה את הפריט מהמארז הרלוונטי
  function removeItem(setId, itemId) {
    setSets((prev) =>
      prev.map((s) =>
        s.id === setId
          ? { ...s, items: s.items.filter((i) => i.id !== itemId) }
          : s,
      ),
    )
  }

  // פעולת "הוסף פריט" — מוסיפה פריט חדש עם מזהה שאינו קיים
  function addItem(setId, { name, price }) {
    setSets((prev) =>
      prev.map((s) => {
        if (s.id !== setId) return s
        // מזהה חדש = המקסימום הקיים + 1 (מונע כפילויות אחרי מחיקה)
        const newId = s.items.length
          ? Math.max(...s.items.map((i) => i.id)) + 1
          : 1
        return { ...s, items: [...s.items, { id: newId, name, price }] }
      }),
    )
  }

  // פעולת "סגור ושלח" — מחזירה את המארז לריק ומוחקת את כל הפריטים
  function closeSet(setId) {
    setSets((prev) =>
      prev.map((s) =>
        s.id === setId ? { ...s, status: 'empty', items: [] } : s,
      ),
    )
  }

  // סיכום נגזר — מחושב מחדש רק כשמערך המארזים משתנה
  const summary = useMemo(
    () => ({
      total: sets.length,
      building: sets.filter((s) => s.status === 'building').length,
      empty: sets.filter((s) => s.status === 'empty').length,
    }),
    [sets],
  )

  return (
    <main className="page" dir="rtl">
      <header className="page__header">
        <h1 className="page__title">מארזים</h1>
        <p className="page__summary">
          סה״כ {summary.total} · בהרכבה {summary.building} · ריקים {summary.empty}
        </p>
      </header>

      {sets.length === 0 ? (
        <p className="page__empty">אין מארזים להצגה</p>
      ) : (
        <div className="grid">
          {sets.map((set) => (
            <SetCard
              key={set.id}
              set={set}
              onStart={startSet}
              onRemoveItem={removeItem}
              onAddItem={addItem}
              onClose={closeSet}
            />
          ))}
        </div>
      )}
    </main>
  )
}
